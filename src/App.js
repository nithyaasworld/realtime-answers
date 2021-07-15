import { useState, useEffect } from "react";
import { authRef } from "./firebase-config";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Login from "./Components/Tutor/Login";
import Dashboard from "./Components/Tutor/Dashboard";
import SessionView from "./Components/Tutor/SessionView";
import StudentFirstView from "./Components/Student/StudentFirstView";
import StudentSessionView from "./Components/Student/StudentSessionView";
import Logout from "./Components/Tutor/Logout";

function App() {
  let user = useSelector((state) => state.user);
  let dispatch = useDispatch();
  useEffect(() => {
    authRef.onAuthStateChanged((user) => {
      if (user) {
        dispatch({type: "ADD_USER", payload: user})
      }
    });
  });
  return (
    <Router>
      <div className="App">
          {user.hasOwnProperty("uid") && <Logout />}
        <Switch>
          <Route path="/tutor-dashboard">
            {user.hasOwnProperty("uid") ? <Dashboard/> : <Redirect to="/"></Redirect>}
          </Route>
          <Route path="/tutor-session-view">
            <SessionView/>
          </Route>
          {/* <Route path="/student-first-view/:tutorID">
            <StudentFirstView />
          </Route>
          <Route path="/:tutorID/student-session-view">
            <StudentSessionView />
          </Route> */}
          <Route path="/">
            {user.hasOwnProperty("uid") ? <Redirect to='/tutor-dashboard' /> : <Login />}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
export default App;
