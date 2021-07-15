import { useEffect, useState } from "react";
import { databaseRef } from "../firebase-config";
import { Button, Typography } from "@material-ui/core";
import { useHistory, useLocation } from "react-router-dom";

export default function SessionView({ user,  }) {
  let [showEndSessionText, setShowEndSessionText] = useState(false);
  let [answers, setAnswers] = useState({});
  const history = useHistory();
  let location = useLocation();
  let studentList = location.state.studentList;
  useEffect(() => {
    console.log(answers);
  },[answers])
  const endSession = async () => {
    setShowEndSessionText(true);
    // setStudentList([]);
    await databaseRef.collection("answerfox").doc(user.email).delete();
    history.push("./tutor-dashboard");
  };
  useEffect(() => {
     databaseRef.collection("answerfox").doc(user.email).onSnapshot(doc => {
      setAnswers(doc.data());
    }, err => {
      console.error(`Encountered error: ${err}`);
    });
  },[])
  return (
    <div className="session-view-container">
      <div className="dashboard-first-row">
        <h1>Dashboard</h1>
        <div className="ending-session-section">
          {showEndSessionText && <p>Ending session...</p>}
          <Button onClick={endSession} variant="contained">
            End Session
          </Button>
        </div>
      </div>
      <p style={{ marginTop: "1em", marginBottom: "1em" }}>
        Student Link: <a href={`http://localhost:3000/student-first-view/${user.email}`}>http://localhost:3000/student-first-view/{user.email}</a>
      </p>
      <div className="answer-box-container">
        {studentList.length > 0 &&
          studentList.map((s) => (
            <div key={s} className="answer-box-single">
              <Typography color="primary">{s}</Typography>
              <div className="answer-box">{answers[s] || ""}</div>
            </div>
          ))}
      </div>
    </div>
  );
}
