import React, { useState, useEffect } from "react";
import Errormessage from "../Alerts/Errormessage";
import Successmessage from "../Alerts/Successmessage";
import axios from "axios";
import styles from "./sign.module.css";
import cx from "classnames";
import google from "../../resources/google.png";
import Spinner from "../home/components/Spinner";
// import "./SForm.css";
// import Fade from "react-reveal/Fade";

function Signin() {
  const [isloading, setisloading] = useState(0);
  var [userObj, setUser] = useState({
    userName: "",
    userPassword: "",
  });
  var [alertObj, setAlert] = useState({
    userNameAlert: false,
    userPasswordAlert: false,
  });
  var [errorObj, setError] = useState({
    userNameError: "NO",
    userPasswordError: "NO",
  });
  const [buttondisabled, setButtondisabled] = useState(true);
  const [showserverERR, setShowserverERR] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(userObj.userName + " " + userObj.userPassword);
    axios
      .post("/user/login", {
        username: userObj.userName,
        password: userObj.userPassword,
      })
      .then(function (response) {
        // console.log(response);
        if (response.data.code) {
          setAlert({
            ...alertObj,
            userNameAlert: false,
            userPasswordAlert: false,
          });
          setError({
            ...errorObj,
            userNameError: "NO",
            userPasswordError: "NO",
          });
          if (response.data.code === 3) {
            document.getElementById("usernameInput").disabled = true;
            document.getElementById("passwordInput").disabled = true;
            setotpmode(true);
            setOtpmail(response.data.email);
            const intervaltimer = setInterval(() => {
              setOtptimer((prev) => (prev > 0 ? prev - 1 : timerover()));
            }, 1000);
            function timerover() {
              clearInterval(intervaltimer);
              setotpR(2);
              setTimeout(() => {
                window.location.reload();
              }, 3000);
            }
            //intialise countdown timer //AJ DONE
            // limit attempts // AJ DONE
          } else {
            setShowserverERR(response.data.code);
            setUser({ ...userObj, userPassword: "" });
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handlegoogleSubmit = (e) => {
    e.preventDefault();
    axios
      .get("user/auth/google")
      .then(function (response) {
        console.log(response);
      })
      .catch(function (err) {
        console.log(err);
      });
    window.open("http://localhost:2948/user/auth/google", "_self");
  };

  // OTP OTP OTP OTP OTP OTP OTP OTP OTP OTP OTP OTP OTP OTP OTP OTP OTP OTP OTP OTP OTP OTP OTP OTP OTP OTP OTP OTP OTP OTP OTP OTP OTP OTP OTP OTP
  const [otpmode, setotpmode] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpmail, setOtpmail] = useState();
  const [otpR, setotpR] = useState(false);
  const [otpRmess, setotpRmess] = useState(false);
  const [otptimer, setOtptimer] = useState(119);
  const [buttondisabledotp, setbuttondisabledotp] = useState(true);
  function handleSubmitotp(e) {
    e.preventDefault();
    axios
      .post("/user/verifyotp", { otp: otp, useremail: otpmail })
      .then(function (response) {
        // console.log(response);
        setotpR(1);
        setotpRmess(response.data.message);
        if (response.data.code === 2) {
          handleRedirect();
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const checkp = async (p)=>{
    // const prof = p.profile;
    if(p.fname === "" || p.fname === undefined || p.fname === null || p.fname === " "){
      return false;
    }
     if(p.lname === "" || p.lname === undefined || p.lname === null || p.lname === " "){
      return false;
    }
     if(p.phno === "" || p.phno === undefined || p.phno === null || p.phno === " "){
      return false;
    }
     if(p.dob === "" || p.dob === undefined || p.dob === null || p.dob === " "){
      return false
    }
     if(p.gender === "" ||p.gender === undefined || p.gender === null || p.gender === " " ){
      return false
    }
     if(p.username === "" || p.username === undefined || p.username === null || p.username === " "){
      return false
    }
    if(p.state === "" || p.state === undefined || p.state === null || p.state === " "){
      return false
    }
    if(p.city === "" || p.city === undefined || p.city === null || p.city === " "){
      return false
    }
    return true;
    

  }

  const handleRedirect = async() => {
    await axios.get("/user/getprofile/self")  ///user/getp/cgyzdvxr67t7
        .then( (data)=>{
          setisloading(1);
    
            if(data.data.code === 101){
                // setislogin(0);
                window.location.href = "/login";
                setisloading(0);
                return;
            }
            alert( JSON.stringify(data.data));
            // return checkp(data.data);
        }).then((valid)=>{
            console.log(valid);
            // alert(valid);
            
              if(valid === true)
                window.location.href = "/";
              else
                window.location.href = "/editprofile";
              // setislogin(1);
        })
        .catch(err=>{
            // setislogin(0);
        })
  }

  useEffect(() => {
    function checkotp() {
      otp < 100000 || otp > 999999
        ? setbuttondisabledotp(true)
        : setbuttondisabledotp(false);
    }
    checkotp();
  }, [otp]);

  // const renderer = ({ hours, minutes, seconds, completed }) => {
  //   if (completed) {
  //     return <span>0</span>;
  //   } else {
  //     if(minutes>0)
  //     seconds = seconds+60;
  //     return <span>{seconds}</span>;
  //   }
  // };

  // const handletimerend = () => {
  //   setbuttondisabledotp(true)
  //   //send to server to delete the otp
  // }

  // OTP OTP OTP OTP OTP OTP OTP OTP OTP OTP OTP OTP OTP OTP OTP OTP OTP OTP OTP OTP OTP OTP OTP OTP OTP OTP OTP OTP OTP OTP OTP OTP OTP OTP OTP OTP

  useEffect(() => {
    function checkusername() {
      userObj.userName.length < 6 || userObj.userName.length > 12
        ? setError({ ...errorObj, userNameError: "YES" })
        : setError({ ...errorObj, userNameError: "NO" });
    }
    checkusername();
    // eslint-disable-next-line
  }, [userObj.userName]);

  useEffect(() => {
    if (
      userObj.userName.length &&
      errorObj.userNameError === "NO" &&
      userObj.userPassword.length
    )
      setButtondisabled(false);
    else setButtondisabled(true);
  }, [userObj.userName, userObj.userPassword, errorObj.userNameError]);

  return (
    <div className="form">
      {/* panda */}
      {isloading === 1 && <Spinner />}
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

      <form action="" className={styles.loginform} autoComplete="off">
        <div className={styles.hand}></div>
        <div className={cx(styles.hand, styles.rgt)}></div>
        <div className={styles.form__socialButton}>
          <div className={styles.socialButton} onClick={handlegoogleSubmit}>
            <img src={google} alt="google" /> CONTINUE WITH GOOGLE
          </div>
        </div>
        <hr />
        {/* <hr /> */}
        <h1>Login</h1>

        {showserverERR === 2 && <Errormessage message={"Incorrect Password"} />}
        {showserverERR === 1 && (
          <Errormessage message={"Username Doesn't Exist"} />
        )}

        {/* USERNAME INPUT FEILD */}
        <div className={styles.inputField}>
          <input
            type="text"
            className=""
            id="usernameInput"
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

        {/*PASSWORD INPUT FEILD */}
        <div className={styles.inputField}>
          <input
            type="password"
            className=""
            id="passwordInput"
            value={userObj.userPassword}
            placeholder="Password"
            onChange={(e) => {
              setUser({ ...userObj, userPassword: e.target.value });
            }}
          />
        </div>
        {/* </Fade> */}
        {/* <Fade bottom> */}

        {/* SUBMIT BUTTON  */}
        {!otpmode && (
          <div>
            <button
              disabled={buttondisabled}
              type="submit"
              className={styles.btn}
              onClick={handleSubmit}
            >
              Login
            </button>
            <a href="/register">
              {" "}
              <p
                style={{
                  color: "#0981f1",
                  fontWeight: "600",
                  fontSize: "10px",
                }}
              >
                Not a user ? <span style={{ color: "" }}> Register </span> here
              </p>
            </a>
            <a href="/login/forgetpass">
              {" "}
              <p
                style={{
                  color: "#0981f1",
                  fontWeight: "600",
                  fontSize: "10px",
                }}
              >
                Forgot Password ? <span style={{ color: "" }}> Reset </span> Here
              </p>
            </a>
          </div>
        )}
        {otpmode && (
          <div>
            <div>
              <p
                style={{
                  color: "#0981f1",
                  fontWeight: "600",
                  textAlign: "center",
                  fontSize: "10px",
                }}
              >
                Credentials Verified. Enter Otp sent to{" "}
                <span style={{ color: "#222" }}>{otpmail}</span> to proceed.{" "}
              </p>{" "}
            </div>
            {/* <p style={{color:'#0981f1', fontWeight:'600', textAlign:'center',fontSize:"10px"}}> Login Session will Expire in {otptimer} seconds</p>  */}
            <div className={styles.inputField}>
              <input
                type="tel"
                className="logininput"
                id="exampleInputPassword1"
                value={otp}
                placeholder="One Time Password"
                onChange={(e) => {
                  setOtp(e.target.value);
                }}
              />
            </div>
            {otpR === 1 && <Errormessage message={otpRmess}></Errormessage>}
            {otpR === 2 && (
              <Errormessage message="Otp Expired, Please Retry Logging In. Reloading.."></Errormessage>
            )}
            <button
              disabled={buttondisabledotp}
              type="submit"
              className={styles.btn}
              onClick={handleSubmitotp}
            >
              Verify Otp ({otptimer})
            </button>
            <a href="/register">
              {" "}
              <p
                style={{
                  color: "#0981f1",
                  fontWeight: "600",
                  fontSize: "10px",
                }}
              >
                Not a user ? <span style={{ color: "" }}> Register </span> here
              </p>
            </a>
            <a href="/login/forgetpass">
              {" "}
              <p
                style={{
                  color: "#0981f1",
                  fontWeight: "600",
                  fontSize: "10px",
                }}
              >
                Forgot Password ? <span style={{ color: "" }}> Reset </span> Here
              </p>
            </a>
          </div>
        )}
      </form>
    </div>
  );
}

export default Signin;
