import { databaseRef } from "../../firebase-config";
import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import Loader from "../Loader";

export default function Dashboard() {
  let [error, setError] = useState("");
  let [isSubmitting, setIsSubmitting] = useState(false);
  let [showLoader, setShowLoader] = useState(false);
  const studentListRef = useRef();
  const history = useHistory();

  let user = useSelector((state) => state.user);
  let studentList = useSelector((state) => state.answer_list.student_list);
  let dispatch = useDispatch();

  useEffect(() => {
    if (user.uid && studentList.length === 0) {
      setShowLoader(true);
      databaseRef
        .collection("answerfox")
        .doc(user.email)
        .get()
        .then((doc) => {
          console.log("doc is: ", doc.data());
          if (doc.exists) {
            dispatch({
              type: "ADD_ALL_STUDENTS",
              payload: doc.data().student_list.sort(),
            }); 
          }
          setShowLoader(false);
        })
        .catch((err) => {
          setShowLoader(false);
          console.error(err);
        });
    }
  }, []);

  useEffect(() => {
    if (studentList.length > 0) {
      history.push("./tutor-session-view");
    }
  }, [studentList]);

  const onStudentListSubmit = async () => {
    setError("");
    let errorSetup = false;
    let currStudentList = studentListRef.current.value;
    if (currStudentList.trim().length === 0) {
      errorSetup = true;
      setError("Blank values are not accepted. Please enter student names.");
    }
    let currValuesInArr = currStudentList
      .split(/\s*[,\n]\s*/)
      .map((e) => e.trim())
      .filter((e) => e !== "")
      .sort();
    if (currValuesInArr.length !== new Set(currValuesInArr).size) {
      errorSetup = true;
      setError(
        "Student names should not be repeated. Please enter unique names"
      );
    }
    if (!errorSetup) {
      setIsSubmitting(true);
      await databaseRef
        .collection("answerfox")
        .doc(user.email)
        .set({ student_list: currValuesInArr })
        .then((doc) => {
          console.log("added doc is:", doc);
          dispatch({ type: "ADD_ALL_STUDENTS", payload: currValuesInArr });
          setIsSubmitting(false);
          history.push("./tutor-session-view");
        })
        .catch((err) => {
          console.error(err);
          setIsSubmitting(false);
          setError(err.message);
        });
    }
  };
  return (
    <div
      className="dashboard-wrapper"
      style={{ display: "flex", flexDirection: "column", justifyContent: "center", maxWidth:'600px' }}
    >
        <div className="dashboard-container" style={{ maxWidth: "600px" }}>
          <h1>My Students</h1>
          <p style={{ marginTop: "1em", marginBottom: "1em" }}>
            Enter the names of each person who will answer your questions,
            separated by comma or new line
          </p>
          <TextField
            inputRef={studentListRef}
            label="Enter student names separated by comma or new line"
            placeholder="Eg: David, Kim, Rajesh"
            multiline
            rows={10}
            variant="outlined"
            fullWidth
          />
          <div className="submit-btn-message">
            <Button
              onClick={onStudentListSubmit}
              variant="contained"
              color="primary"
            >
              Submit
            </Button>
            {isSubmitting && <p>Submitting...</p>}
          </div>
          {error.length > 0 && (
            <p style={{ color: "red", marginTop: "1em" }}>{error}</p>
          )}
        </div>
    </div>
  );
}
