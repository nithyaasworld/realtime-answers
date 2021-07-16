import { provider, authRef } from "../../firebase-config";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import firebase from "firebase/app";

export default function Login({ setUser }) {
  const history = useHistory();
  useEffect(() => {
    authRef.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
  }, []);
  const signIn = (event) => {
    event.target.disabled = true;
    authRef
      .signInWithPopup(provider)
      .then((result) => {
        setUser(result.user);
        history.push("/tutor-dashboard");
      })
      .catch((error) => {
        let errorMessage = error.message;
        console.error(errorMessage);
        event.target.disabled = false;
      });
  };
  return (
    <div className="login-container">
      <h1>Everyone Answers</h1>
      <div style={{ marginBottom: "1em" }}>Welcome Please sign in.</div>
      <AccountCircleIcon
        style={{
          color: "gray",
          opacity: "0.5",
          fontSize: "150px",
          textAlign: "center",
          display: "block",
        }}
      />
      <button className="sign-in-button" onClick={signIn}>
        {" "}
        <img
          src={"google-color.svg"}
          alt="Google icon"
          className="google-icon"
        ></img>{" "}
        SIGN IN WITH GOOGLE{" "}
      </button>
    </div>
  );
}
