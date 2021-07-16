import { useEffect, useRef, useState } from "react";
import { databaseRef } from "../../firebase-config";
import { Button, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader";

export default function SessionView() {
  let [showEndSessionText, setShowEndSessionText] = useState(false);
  let [showClearAnswerText, setShowClearAnswerText] = useState(false);
  let [answers, setAnswers] = useState({});
  const history = useHistory();
  let studentList = useSelector(state => state.answer_list.student_list);
  let user = useSelector(state => state.user);
  let dispatch = useDispatch();
  let clearBtnRef = useRef();
   const endSession = async () => {
    setShowEndSessionText(true);
    dispatch({ type: "DELETE_ALL_STUDENTS" });
    await databaseRef.collection("answerfox").doc(user.email).delete();
    history.push("./tutor-dashboard");
  };
  const clearAllAnswers = async () => {
    setShowClearAnswerText(true);
    setAnswers({});
    await databaseRef.collection("answerfox").doc(user.email).set({student_list: studentList}).then(()=> setShowClearAnswerText(false));
  }
  useEffect(() => {
    databaseRef.collection("answerfox").doc(user.email).onSnapshot(doc => {
      if (doc.data()) {
        dispatch({ type: "ADD_ALL_STUDENTS", payload: doc.data().student_list })
      setAnswers(doc.data());
      }
    }, err => {
      console.error(`Encountered error: ${err}`);
    });
  }, [])
  useEffect(() => {
    if (JSON.stringify(answers) === '{}') {
      clearBtnRef.current.disabled = true;
    } else {
      clearBtnRef.current.disabled = false;
    }
  },[answers])
  return (
    <div className="session-view-container">
      <div className="dashboard-first-row">
        <div style={{display: 'flex', gap: '1em'}}>
        <h1>Dashboard</h1>
        <Button ref={clearBtnRef} onClick={clearAllAnswers} variant="contained" color="primary">Clear All Answers</Button>
        </div>
        <div className="ending-session-section">
          {showEndSessionText && <p>Ending session...</p>}
          {showClearAnswerText && <p>Clearing answers...</p>}
          <Button onClick={endSession} variant="contained">
            End Session
          </Button>
        </div>
      </div>
      <p style={{ marginTop: "1em", marginBottom: "1em" }}>
        Student Link: <a href={`http://localhost:3000/student-first-view/${user.email}`}>http://localhost:3000/student-first-view/{user.email}</a>
      </p>
      <div className="answer-box-container">
        {studentList.length > 0 ?
          studentList.map((s) => (
            <div key={s} className="answer-box-single">
              <Typography color="primary">{s}</Typography>
              <div className="answer-box">{answers[s] || ""}</div>
            </div>
          )) : <Loader/>}
      </div>
    </div>
  );
}