import { authRef, databaseRef } from "./firebase-config";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useRef, useState } from "react";

export default function Dashboard({ user, setUser, setShowSession }) {
  let [error, setError] = useState("");
  let [isSubmitting, setIsSubmitting] = useState(false);
  const studentListRef = useRef();

  const onStudentListSubmit = async () => {
    setError("");
    let errorSetup = false;
    let currStudentList = studentListRef.current.value;
    if (currStudentList.trim().length === 0) {
      errorSetup = true;
      setError("Blank values are not accepted. Please enter student names.");
    }
    let currValuesInArr = currStudentList.split(",").map((e) => e.trim());
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
        .then((data) => {
          console.log("added data is:", data);
          setIsSubmitting(false);
          setShowSession(true);
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
      style={{ display: "flex", justifyContent: "center" }}
    >
      <div className="dashboard-container" style={{ maxWidth: "450px" }}>
        <h1>My Students</h1>
        <p>
          Enter the names of each person who will answer your questions,
          separated by comma or new line
        </p>
        <TextField
          inputRef={studentListRef}
          id="outlined-textarea"
          label="Enter student names separated by comma"
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
        {error.length > 0 && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
}
