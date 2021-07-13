import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { provider, authRef } from "./firebase-config";

export default function Login({setUser}){
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
            }).catch((error) => {
                let errorCode = error.code;
                let errorMessage = error.message;
                console.error(errorMessage);
            });
    }
    return (
        <div className="login-container">
            <h1>Everyone Answers</h1>
            <div style={{marginBottom: '1em'}}>Welcome Please sign in.</div>
            <AccountCircleIcon style={{color: 'gray', opacity: '0.5', fontSize: '150px', textAlign:'center', display: 'block'}} />
            <button className="sign-in-button" onClick={signIn} > <img src={"google-color.svg"} alt="Google icon" className="google-icon"></img> SIGN IN WITH GOOGLE </button>
        </div>
    )
}