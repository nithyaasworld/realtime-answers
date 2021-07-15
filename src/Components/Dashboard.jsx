import { databaseRef } from "../firebase-config";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import Loader from "./Loader";
export default function Dashboard({
  user,
  studentList,
  setStudentList,
  showLoader,
  setShowLoader,
}) {
  let [error, setError] = useState("");
  let [isSubmitting, setIsSubmitting] = useState(false);
  const studentListRef = useRef();
  const history = useHistory();
  useEffect(() => {
    setShowLoader(true);
  },[])

  useEffect(() => {
    if (user.uid && studentList.length === 0) {
      databaseRef
        .collection("answerfox")
        .doc(user.email)
        .get()
        .then((doc) => {
          console.log("doc is: ", doc.data());
          if (doc.exists) {
            setStudentList(doc.data().student_list.sort());
          }
          setShowLoader(false);
        })
        .catch(() => {
          setShowLoader(false);
        });
    }
  }, [user]);
  useEffect(() => {
    if (studentList.length > 0) {
      history.push({
        pathname: "./tutor-session-view",
        state: {studentList},
      });
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
      .filter(e => e !== "")
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
          setStudentList(currValuesInArr);
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
  useEffect(() => {
    console.log('show loader is: ', showLoader);
  },[showLoader])
  return (
    <div
      className="dashboard-wrapper"
      style={{ display: "flex", justifyContent: "center" }}
    >
      {showLoader && <Loader />}
      {!showLoader && (
        <div className="dashboard-container" style={{ maxWidth: "600px" }}>
          <h1>My Students</h1>
          <p style={{ marginTop: "1em", marginBottom: "1em" }}>
            Enter the names of each person who will answer your questions,
            separated by comma or new line
          </p>
          <TextField
            inputRef={studentListRef}
            id="outlined-textarea"
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
      )}
    </div>
  );
}
