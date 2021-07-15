import { Button, MenuItem, Select, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { databaseRef } from "../firebase-config";

export default function StudentFirstView() {
  let [studentSelected, setStudentSelected] = useState("");
  let [studentList, setStudentList] = useState([]);
  let { tutorID } = useParams();
  const history = useHistory();
  const handleChange = (event) => {
    console.log(event.target.value, "is selected");
    setStudentSelected(event.target.value);
    };
    const submitHandler = () => {
        history.push({
            pathname: `../${tutorID}/student-session-view`,
            state: { studentSelected },
        });
    }
  useEffect(() => {
    databaseRef
      .collection("answerfox")
      .doc(tutorID)
      .get()
      .then((doc) => {
        console.log("doc is: ", doc.data());
        if (doc.exists) {
          setStudentList(doc.data().student_list.sort());
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  return (
    <div className="student-firstview-container">
      <Typography variant="h6" component="h1">
        Select Your Name
      </Typography>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={studentSelected}
        onChange={handleChange}
      >
        {studentList.length > 0 &&
          studentList.map((s) => (
            <MenuItem key={s} value={s}>
              {s}
            </MenuItem>
          ))}
      </Select>
          <Button
              onClick={submitHandler}
        color="primary"
        style={{ width: "fit-content" }}
        variant="contained"
      >
        continue
      </Button>
    </div>
  );
}
