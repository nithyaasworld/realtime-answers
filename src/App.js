import { useState, useEffect } from "react";
import firebase from 'firebase/app';

import Login from "./Login";
import Dashboard from "./Dashboard";
import { authRef } from './firebase-config';
import SessionView from "./SessionView";

function App() {
  let [user, setUser] = useState("");
  let [showSession, setShowSession] = useState(false);
  useEffect(() => {
    authRef.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
  }, []);
  useEffect(() => {
    authRef.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      }
    })
  })
  useEffect(() => {
    console.log(user)
  }, [user]);
  return (
    <div
      className="App"
    >
      {!user.hasOwnProperty('uid') && <Login setUser={setUser} />}
      {user.hasOwnProperty('uid') && user.uid.length > 0 && !showSession && <Dashboard user={user} setUser={setUser} setShowSession={setShowSession}/>}
      {showSession && <SessionView user={user} setShowSession={setShowSession}/>}
    </div>
  );
}
export default App;
