import { TextField, Typography } from "@material-ui/core";
import {withStyles} from '@material-ui/core/styles'
import { useState } from "react";
import { useLocation, useParams } from "react-router-dom"
import { databaseRef } from "../firebase-config";

export default function StudentSessionView() {
    let location = useLocation();
    let { tutorID } = useParams();
    let [syncStatus, setSyncStatus] = useState("");
    let [answer, setAnswer] = useState("");
    let CssTextField = withStyles({
        root: {
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#3f51b5',
              },
            },
          },
    })(TextField);

    const inputHandler = async (event) => {
        setSyncStatus("Synching...");
        setAnswer(event.target.value);
        const studentRef = databaseRef.collection('answerfox').doc(tutorID);
        await studentRef.update({ [location.state.studentSelected]: event.target.value }).then(()=> setSyncStatus("Sync completed"));
    }
    return (
        <div className="student-session-view-container">
            <Typography variant="subtitle1" component="p" style={{textTransform: "capitalize"}}>{location.state.studentSelected}</Typography>
            <Typography variant="h5" component="h1" style={{fontWeight: "bold"}}>My Answer</Typography>
            <Typography variant="subtitle1" component="p" >Enter your answer below. This text is visible to the teacher.</Typography>
            {/* <CssTextField  id="outlined-basic" label="Your answer" multiline rows={9} variant="outlined" /> */}
            <textarea rows={10} col={20} onChange={inputHandler} value={answer} className="answer-input-styles"></textarea>
            {syncStatus.length > 0 && <Typography variant="subtitle1" color="primary" component="p">{syncStatus}</Typography>}
        </div>
    )
}