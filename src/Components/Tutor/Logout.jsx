import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { authRef } from "../../firebase-config";

export default function Logout() {
  let dispatch = useDispatch();
  let user = useSelector((state) => state.user);
  let history = useHistory();
  const logout = async () => {
    await authRef.signOut().then(() => {
      dispatch({ type: "DELETE_USER" });
      dispatch({ type: "DELETE_ALL_STUDENTS" });
    });
    history.push("./");
  };
  return (
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
  );
}
