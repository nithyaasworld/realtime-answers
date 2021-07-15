import { useState, useEffect } from "react";
import { authRef } from "./firebase-config";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import SessionView from "./Components/SessionView";
import StudentFirstView from "./Components/StudentFirstView";
import StudentSessionView from "./Components/StudentSessionView";

function App() {
  let [user, setUser] = useState("");
  let [studentList, setStudentList] = useState([]);
  let [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    authRef.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      }
    });
  });
  const logout = async () => {
    await authRef.signOut().then(() => {
      setUser("");
      setStudentList([]);
    });
  };
  return (
    <Router>
      <div className="App">
          {user.hasOwnProperty("uid") && (
            <img
              style={{
                position: "relative",
                left: "95%",
                width: "50px",
                borderRadius: "50%",
                cursor: "pointer",
              }}
              onClick={logout}
              src={user.photoURL}
              alt="user profile"
            ></img>
          )}
        <Switch>
          <Route path="/tutor-dashboard">
            {user.hasOwnProperty("uid") ? <Dashboard user={user}
              setUser={setUser}
              studentList={studentList}
              setStudentList={setStudentList}
              setShowLoader={setShowLoader}
              showLoader={showLoader}
            /> : <Redirect to="/"></Redirect>}
          </Route>
          <Route path="/tutor-session-view">
            <SessionView
              user={user}
              studentList={studentList}
              setStudentList={setStudentList}
            />
          </Route>
          <Route path="/student-first-view/:tutorID">
            <StudentFirstView />
          </Route>
          <Route path="/:tutorID/student-session-view">
            <StudentSessionView />
          </Route>
          <Route path="/">
            {user.hasOwnProperty("uid") ? <Redirect to='/tutor-dashboard' /> : <Login setUser={setUser} setShowLoader={setShowLoader} />}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
export default App;
