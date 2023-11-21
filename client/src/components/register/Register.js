import React, { useState, useEffect } from "react";
import Errormessage from "../Alerts/Errormessage";
import Successmessage from "../Alerts/Successmessage";
import validator from "validator";
import axios from "axios";
import styles from "./register.module.css";
import cx from "classnames";

// import "./SForm.css";
// import Fade from "react-reveal/Fade";

function Register() {
  var [userObj, setUser] = useState({
    userName: "",
    userEmail: "",
    userPassword: "",
    userPassword2: "",
  });
  var [alertObj, setAlert] = useState({
    userNameAlert: false,
    userEmailAlert: false,
    userPasswordAlert: false,
    userPassword2Alert: false,
  });
  var [errorObj, setError] = useState({
    userNameError: "NO",
    userPasswordError: "NO",
    userEmailError: "NO",
    userPassword2Error: "NO",
  });
  const [buttondisabled, setButtondisabled] = useState(true);
  const [showserverERR, setShowserverERR] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(
      userObj.userName +
        " " +
        userObj.userPassword +
        " " +
        userObj.userPassword2 +
        " " +
        userObj.userEmail
    );
    axios
      .post("/user/create", {
        username: userObj.userName,
        pass: userObj.userPassword,
        email: userObj.userEmail,
      })
      .then(function (response) {
        console.log(response);
        if (response.data.code)
          //window.location.reload()
          setShowserverERR(response.data.code);
          setUser({...userObj, userName:"", userEmail:"", userPassword:"", userPassword2:""})
          setAlert({...alertObj, userNameAlert: false, userEmailAlert: false, userPasswordAlert: false, userPassword2Alert: false})
          setError({...errorObj, userNameError: "NO", userPasswordError: "NO", userEmailError: "NO", userPassword2Error: "NO",})
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // const handlegoogleSubmit= e => {
  //   e.preventDefault();
  //  //  axios.get('/auth/google').then(function(response){console.log(response)}).catch(function(err){console.log(err)})
  //  window.open("http://localhost:3763/auth/google" , "_self")
  // }

  useEffect(() => {
    function checkmatch() {
      userObj.userPassword === userObj.userPassword2
        ? setError({ ...errorObj, userPassword2Error: "YES" })
        : setError({ ...errorObj, userPassword2Error: "NO" });
    }
    checkmatch();
  }, [userObj.userPassword, userObj.userPassword2]);

  useEffect(() => {
    function checkmail() {
      validator.isEmail(userObj.userEmail)
        ? setError({ ...errorObj, userEmailError: "NO" })
        : setError({ ...errorObj, userEmailError: "YES" });
    }
    checkmail();
  }, [userObj.userEmail]);

  useEffect(() => {
    function checkusername() {
      userObj.userName.length < 6 || userObj.userName.length > 12
        ? setError({ ...errorObj, userNameError: "YES" })
        : setError({ ...errorObj, userNameError: "NO" });
    }
    checkusername();
  }, [userObj.userName]);

  useEffect(() => {
    if (
      errorObj.userEmailError === "NO" &&
      errorObj.userPassword2Error === "YES" &&
      userObj.userName.length &&
      errorObj.userNameError === "NO" &&
      userObj.userPassword.length
    )
      setButtondisabled(false);
    else setButtondisabled(true);
  }, [
    errorObj.userEmailError,
    errorObj.userPassword2Error,
    userObj.userName,
    userObj.userPassword,
    errorObj.userNameError,
  ]);

  return (
    <div className="form">
      {/* <div style={{marginTop: "8%"}} className="form__socialButton">
                <div className="socialButton" onClick={handlegoogleSubmit}>
                <img src={google} alt="google" />
                <p>Continue with Google</p>
                </div>                   
                </div>
                <div className="seperator">
            <div style={{marginTop: "7%"}} className="seperator__text">
                <hr />
                <span>or</span>
                <hr />
            </div>
            </div> */}
      {/* panda */}
      <div className={styles.panda}>
        <div className={styles.ear}></div>
        <div className={styles.face}>
          <div className={styles.eyeshade}></div>
          <div className={styles.eyewhite}>
            <div className={styles.eyeball}></div>
          </div>
          <div className={cx(styles.eyeshade, styles.rgt)}></div>
          <div className={cx(styles.eyewhite, styles.rgt)}>
            <div className={styles.eyeball}></div>
          </div>
          <div className={styles.nose}></div>
          <div className={styles.mouth}></div>
        </div>
        <div className={styles.body}> </div>
        <div className={styles.foot}>
          <div className={styles.finger}></div>
        </div>
        <div className={cx(styles.foot, styles.rgt)}>
          <div className={styles.finger}></div>
        </div>
      </div>
      {/* panda */}

      <form className={styles.loginform} action="" autoComplete="off">
        <div className={styles.hand}></div>
        <div className={cx(styles.hand, styles.rgt)}></div>
        <h1>Register New User</h1>
        {showserverERR === 2 && (
          <Errormessage message={`Username Already Exists! Login Instead`} />
        )}
        {showserverERR === 1 && (
          <Errormessage message={`Email Already Exists! Login Instead`} />
        )}
        {showserverERR === 3 && (
          <Successmessage
            message={"New User Created Succesfully. Login Now!"}
          />
        )}
        {showserverERR === 4 && (
          <Errormessage message={"Internal Server Error"} />
        )}
        {/* USERNAME INPUT FEILD AVISHKA*/}
        <div className={styles.inputField}>
          <input
            type="text"
            className=""
            id="inlineFormInputGroup"
            placeholder="Username"
            value={userObj.userName}
            onChange={(e) => {
              setUser({ ...userObj, userName: e.target.value });
              setAlert({ ...alertObj, userNameAlert: true });
            }}
          />
        </div>

        {alertObj.userNameAlert && errorObj.userNameError === "YES" && (
          <Errormessage message="Username Must Contain 6-12 characters." />
        )}
        {alertObj.userNameAlert && errorObj.userNameError === "NO" && (
          <Successmessage message="Valid UserName" />
        )}

        {/* EMAIL INPUT FEILD ARMAAN*/}
        <div className={styles.inputField}>
          <input
            type="text"
            autoComplete="off"
            className=""
            placeholder="Email"
            value={userObj.userEmail}
            onChange={(e) => {
              setUser({ ...userObj, userEmail: e.target.value });
              setAlert({ ...alertObj, userEmailAlert: true });
            }}
          />
        </div>

        {alertObj.userEmailAlert && errorObj.userEmailError === "YES" && (
          <Errormessage message="Enter a Valid Email" />
        )}
        {alertObj.userEmailAlert && errorObj.userEmailError === "NO" && (
          <div id="successmessage">
            <Successmessage message="Valid Email" />
          </div>
        )}

        {/*PASSWORD INPUT FEILD ARISHKA*/}
        <div className={styles.inputField}>
          <input
            type="password"
            className=""
            id="exampleInputPassword1"
            value={userObj.userPassword}
            placeholder="Password"
            onChange={(e) => {
              setUser({ ...userObj, userPassword: e.target.value });
            }}
          />
        </div>
        {/* </Fade> */}
        {/* <Fade bottom> */}

        {/*PASSWORD MATCH INPUT FEILD AVAAN*/}
        <div className={styles.inputField}>
          <input
            type="text"
            className=""
            id="exampleInputPassword2"
            value={userObj.userPassword2}
            placeholder="Confirm Password"
            onChange={(e) => {
              setUser({ ...userObj, userPassword2: e.target.value });
              setAlert({ ...alertObj, userPassword2Alert: true });
            }}
          />
        </div>

        {alertObj.userPassword2Alert &&
          errorObj.userPassword2Error === "NO" && (
            <Errormessage message={"Passwords Do Not Match"} />
          )}
        {alertObj.userPassword2Alert &&
          errorObj.userPassword2Error === "YES" && (
            <Successmessage message={"Passwords Match"} />
          )}

        {/* SUBMIT BUTTON AVISHKA */}
        <button
          disabled={buttondisabled}
          type="submit"
          className={styles.btn}
          onClick={handleSubmit}
        >
          Register
        </button>
        <a href="/login"> <p style={{color:'#0981f1', fontWeight:'600',fontSize:"10px"}}>Already a user ? <span style={{color:""}}>  Sign In </span> here</p></a>
      </form>
    </div>
  );
}

export default Register;