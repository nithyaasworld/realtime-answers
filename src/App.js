import { useState, useEffect } from "react";
import firebase from "firebase/app";

import Login from "./Login";
import Dashboard from "./Dashboard";
import Loader from "./Loader";
import { authRef, databaseRef } from "./firebase-config";
import SessionView from "./SessionView";

function App() {
  let [user, setUser] = useState("");
  let [showSession, setShowSession] = useState(false);
  let [studentList, setStudentList] = useState([]);
  let [showLoader, setShowLoader] = useState(true);
  useEffect(() => {
    authRef.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
  }, []);
  useEffect(() => {
    authRef.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      }
    });
  });
  useEffect(() => {
    if (user.uid && studentList.length === 0) {
      databaseRef
      .collection("answerfox")
      .doc(user.email)
      .get()
      .then((doc) => {
        console.log("doc is: ", doc.data());
        setShowLoader(false);
        if (!doc.exists) {
          setShowSession(false);
        } else {
          setStudentList(doc.data().student_list.sort());
        }
      });
    }
  }, [user])
  useEffect(() => {
    if (studentList.length > 0) {
      setShowSession(true);
    } else {
      setShowSession(false);
    }
  },[studentList])
  const logout = async () => {
    await authRef.signOut().then(() => {
      setUser("");
      setStudentList([]);
      setShowSession(false);
    });
  };
  return (
    <div className="App">
    {showLoader && <Loader />}
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
      {!user.hasOwnProperty("uid") && <Login setUser={setUser} setShowLoader={setShowLoader}/>}
      {user.hasOwnProperty("uid") && user.uid.length > 0 && !showSession && (
        <Dashboard
          user={user}
          setUser={setUser}
          setShowSession={setShowSession}
        />
      )}
      {showSession && (
        <SessionView
          user={user}
          setShowSession={setShowSession}
          studentList={studentList}
          setStudentList={setStudentList}
        />
      )}
    </div>
  );
}
export default App;
