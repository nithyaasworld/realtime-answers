import { useEffect, useRef, useState } from "react";
import { databaseRef, authRef } from "../../firebase-config";
import { Button, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader";

export default function SessionView() {
  let [showEndSessionText, setShowEndSessionText] = useState(false);
  let [showClearAnswerText, setShowClearAnswerText] = useState(false);
  let [answers, setAnswers] = useState({});
  const history = useHistory();
  let studentList = useSelector(
    (state) => state.answer_list.student_list.student_list
  );
  let user = useSelector((state) => state.user);
  let dispatch = useDispatch();
  let clearBtnRef = useRef();
  let [sessionID, setSessionID] = useState(0);
  const endSession = async () => {
    setShowEndSessionText(true);
    dispatch({ type: "DELETE_ALL_STUDENTS" });
    await databaseRef.collection("answerfox").doc(user.email).delete();
    history.push("./tutor-dashboard");
  };
  const clearAllAnswers = async () => {
    setShowClearAnswerText(true);
    setAnswers({});
    await databaseRef
      .collection("answerfox")
      .doc(user.email)
      .set({ student_list: studentList, session_id: sessionID })
      .then(() => setShowClearAnswerText(false));
  };
  useEffect(() => {
    console.log("student_list in line33: ", studentList);
  }, [studentList]);
  useEffect(() => {
    authRef.onAuthStateChanged((user) => {
      if (user) {
        databaseRef
          .collection("answerfox")
          .doc(user.email)
          .onSnapshot(
            (doc) => {
              if (doc.data()) {
                console.log(doc.data());
                setSessionID(doc.data().session_id);
                dispatch({
                  type: "ADD_ALL_STUDENTS",
                  payload: {
                    currValuesInArr: doc.data().student_list,
                    session_id: doc.data().session_id,
                  },
                });
                setAnswers(doc.data());
              }
            },
            (err) => {
              console.error(`Encountered error: ${err}`);
            }
          );
      } else {
        history.push("/");
      }
    });
  }, []);
  useEffect(() => {
    if (JSON.stringify(answers) === "{}") {
      clearBtnRef.current.disabled = true;
    } else {
      clearBtnRef.current.disabled = false;
    }
  }, [answers]);
  return (
    <div className="session-view-container">
      <div className="dashboard-first-row">
        <div style={{ display: "flex", gap: "1em" }}>
          <h1>Dashboard</h1>
          <Button
            ref={clearBtnRef}
            onClick={clearAllAnswers}
            variant="contained"
            color="primary"
          >
            Clear All Answers
          </Button>
        </div>
        <div className="ending-session-section">
          {showEndSessionText && <p>Ending session...</p>}
          {showClearAnswerText && <p>Clearing answers...</p>}
          <Button onClick={endSession} variant="contained">
            End Session
          </Button>
        </div>
      </div>
      {sessionID !== 0 && (
        <p style={{ marginTop: "1em", marginBottom: "1em" }}>
          Student Link:{" "}
          <a
            href={`https://epic-wiles-749f36.netlify.app/student-first-view/${user.email}/${sessionID}`}
          >
            {`https://epic-wiles-749f36.netlify.app/student-first-view/${user.email}/${sessionID}`}
          </a>
        </p>
      )}
      <div className="answer-box-container">
        {studentList && studentList.length > 0 ? (
          studentList.map((s) => (
            <div key={s} className="answer-box-single">
              <Typography color="primary">{s}</Typography>
              <div className="answer-box">{answers[s] || ""}</div>
            </div>
          ))
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
}
