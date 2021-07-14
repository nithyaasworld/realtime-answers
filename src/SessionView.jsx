import { useEffect, useState } from "react";
import { databaseRef } from "./firebase-config";
import { Button, Typography } from "@material-ui/core";
 
export default function SessionView({ user, setShowSession, studentList, setStudentList }) {
  let [showEndSessionText, setShowEndSessionText] = useState(false);
  const getData = async () => {
    databaseRef
      .collection("answerfox")
      .doc(user.email)
      .get()
      .then((doc) => {
        console.log("doc is: ", doc.data());
        if (!doc.exists) {
          setShowSession(false);
        } else {
          setStudentList(doc.data().student_list.sort());
        }
      });
  };
  const endSession = async() => {
    setShowEndSessionText(true);
    setStudentList([]);
    await databaseRef.collection("answerfox").doc(user.email).delete();
  }
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="session-view-container">
      <div className="dashboard-first-row">
        <h1>Dashboard</h1>
        <div className="ending-session-section">
          {showEndSessionText && <p>Ending session...</p>}
        <Button onClick={endSession} variant="contained">End Session</Button>
        </div>
      </div>
      <p>
        Student Link: <a href="#">http://localhost:3000/#/s/3760757836</a>
      </p>
      <div className="answer-box-container">
              {studentList.length > 0 &&
                  studentList.map((s) => (
                      <div key={s} className="answer-box-single">
                          <Typography color="primary">{s}</Typography>
                          <div className="answer-box"></div>
                      </div>
                  ))}
      </div>
    </div>
  );
}
