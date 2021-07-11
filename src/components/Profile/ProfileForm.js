import { useRef, useContext } from "react";
import { useHistory } from "react-router";

import AuthContext from "../../store/auth-context";

import classes from "./ProfileForm.module.css";

const { REACT_APP_API_KEY } = process.env;

const ProfileForm = () => {
  const history = useHistory();
  const authCtx = useContext(AuthContext);

  const newPasswordInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredNewPassword = newPasswordInputRef.current.value;
    // add validation

    fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${REACT_APP_API_KEY}`,
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.token,
          password: enteredNewPassword,
          returnSecureToken: false
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then(res => {
      // Assumes always works
      history.replace("/");
    });
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" minLength="7" ref={newPasswordInputRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
