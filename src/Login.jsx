import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useEffect } from 'react';
import { provider, authRef } from "./firebase-config";
import firebase from 'firebase/app';

export default function Login({setUser}) {
    
    const signIn = () => {
        
        authRef
            .signInWithPopup(provider)
            .then((result) => {
                let credential = result.credential;
                let token = credential.accessToken;
                console.log(token);
                let user = result.user;
                setUser(result.user);
                console.log(user);
                // ...
            }).catch((error) => {
                let errorCode = error.code;
                let errorMessage = error.message;
                console.error(errorMessage);
            });
    }
    return (
        <div className="login-container" style={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "70vh",
          }}>
        <h1>Everyone Answers</h1>
        <div style={{marginBottom: '1em'}}>Welcom. Please sign in.</div>
        <AccountCircleIcon style={{color: 'gray', opacity: '0.5', fontSize: '150px', textAlign:'center', display: 'block'}}/>
        <button onClick={signIn} style={{fontWeight: 'bold', padding: '0.5em 1em', borderRadius:"5px", border:"none", boxShadow: '2px 2px 5px gray', backgroundColor: 'rgb(128,128,128,0.3)', cursor: 'pointer'}}>SIGN IN WITH GOOGLE</button>
        </div>
    )
}