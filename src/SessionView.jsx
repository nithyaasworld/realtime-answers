import { useEffect, useState } from "react";
import { databaseRef } from "./firebase-config";
import TextField from "@material-ui/core/TextField";
import { InputLabel, Typography, withStyles } from "@material-ui/core";

const CssTextField = withStyles({
    root: {
 
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
                border: '2px solid #4153AF'
        },
      },
    },
  })(TextField);
  
export default function SessionView({ user, setShowSession }) {
    let [studentList, setStudentList] = useState([]);
  
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
                      <div className="answer-box-single">
                          <Typography color="primary">{s}</Typography>
                          <CssTextField
                              id="outlined-multiline-flexible"
                              label={s}
                              multiline
                              rows={6}
                              variant="outlined"
                              fullWidth
                          ></CssTextField>
                      </div>
                  ))}
      </div>
    </div>
  );
}
