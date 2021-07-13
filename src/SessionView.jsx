import { useEffect, useState } from "react";
import { databaseRef } from "./firebase-config";
import TextField from "@material-ui/core/TextField";

export default function SessionView({ user, setShowSession }) {
  let [studentList, setStudentList] = useState([]);
  const getData = async () => {
    databaseRef.collection("answerfox").doc(user.email).get().then((doc) => {
        console.log('doc is: ', doc.data());
        if (!doc.exists) {
            setShowSession(false);
        } else {
            setStudentList(doc.data())
        }
    })
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="session-view-container">
      <h1>Dashboard</h1>
      <p>
        Student Link: <a href="#">http://localhost:3000/#/s/3760757836</a>
      </p>
      <div className="answer-box-container">
        {studentList.length > 0 &&
          studentList.map((s) => (
            <TextField
              id="outlined-multiline-flexible"
              label={s}
              multiline
              maxRows={4}
              variant="outlined"
            ></TextField>
          ))}
      </div>
    </div>
  );
}
