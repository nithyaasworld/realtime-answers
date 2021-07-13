import { authRef } from "./firebase-config";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export default function Dashboard({ user, setUser }) {
  const logout = () => {
    authRef.signOut().then(() => {
      setUser("");
    });
  };
  return (
    <div className="dashboard-wrapper" style={{display:'flex', justifyContent: 'center'}}>
      <div className="dashboard-container" style={{ maxWidth: "450px" }}>
              <img style={{ position: 'absolute', right: '20px', top: '20px', width: '50px', borderRadius: '50%', cursor: 'pointer'}} onClick={logout} src={user.photoURL} alt="user profile"></img>
        <h1>My Students</h1>
        <p>
          Enter the names of each person who will answer your questions,
          separated by comma or new line
        </p>
        <TextField
          id="outlined-textarea"
          label="Enter student names separated by comma"
          placeholder="Eg: David, Kim, Rajesh"
          multiline
          rows={10}
          variant="outlined"
          fullWidth
        />
        <Button style={{marginTop: '20px'}} variant="contained" color="primary">
          Submit
        </Button>
      </div>
    </div>
  );
}
