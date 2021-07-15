import { Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom"
import { databaseRef } from "../../firebase-config";

export default function StudentSessionView() {
    let location = useLocation();
    let { tutorID } = useParams();
    let [syncStatus, setSyncStatus] = useState("");
    let [answer, setAnswer] = useState("");

    const inputHandler = async (event) => {
        setSyncStatus("Synching...");
        setAnswer(event.target.value);
        const studentRef = databaseRef.collection('answerfox').doc(tutorID);
        await studentRef.update({ [location.state.studentSelected]: event.target.value }).then(()=> setSyncStatus("Sync completed"));
  }
  useEffect(() => {
    databaseRef.collection("answerfox").doc(tutorID).onSnapshot(doc => {
      if ((doc.data().hasOwnProperty(location.state.studentSelected))){
        setAnswer(doc.data()[location.state.studentSelected]);
      } else {
        setAnswer("");
      }
    }, err => {
      console.error(`Encountered error: ${err}`);
    });
  },[])
    return (
        <div className="student-session-view-container">
            <Typography variant="subtitle1" component="p" style={{textTransform: "capitalize"}}>{location.state.studentSelected}</Typography>
            <Typography variant="h5" component="h1" style={{fontWeight: "bold"}}>My Answer</Typography>
            <Typography variant="subtitle1" component="p" >Enter your answer below. This text is visible to the teacher.</Typography>
            <textarea rows={10} col={20} onChange={inputHandler} value={answer} className="answer-input-styles"></textarea>
            {syncStatus.length > 0 && <Typography variant="subtitle1" color="primary" component="p">{syncStatus}</Typography>}
        </div>
    )
}