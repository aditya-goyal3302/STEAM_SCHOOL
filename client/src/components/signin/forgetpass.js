import React, { useState, useEffect } from "react";
import Errormessage from "../Alerts/Errormessage";
import Successmessage from "../Alerts/Successmessage";
import axios from "axios";
import styles from "./sign.module.css";
import cx from "classnames";
// import google from "../../resources/google.png";
import Spinner from "../home/components/Spinner";
// import './forpass.css';

function Signin() {
    const [isloading, setisloading] = useState(0);
    const [username, setusername] = useState("");
    const [showserverERR, setshowserverERR] = useState(0);


    const handleSubmit = (e) => {
        e.preventDefault();
        setshowserverERR(0);
        setisloading(1);
        axios.post("/user/forgetpass", {
            username: username,
        })
            .then((data) => {
                console.log(data.data);
                setisloading(0);
                if (data.data.code === 1) {
                    setshowserverERR(1);
                }
                else if (data.data.code === 3) {
                    setshowserverERR(3);
                }
                else {
                    setshowserverERR(2);
                }
            })
            .catch((err) => {
                console.log(err);
                setisloading(0);
                // setshowserverERR(1);
            });
    };
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
        <h1>Forget Password</h1>

        {showserverERR === 2 && <Successmessage message={"Reset password link sent to your E-mail"} />}
        {showserverERR === 1 && (
          <Errormessage message={"Username Doesn't Exist"} />
        )}
        {showserverERR === 3 && (
          <Errormessage message={"Server Down!!"} />
        )}


        <div className={styles.inputField}>
          <input
            type="text"
            className=""
            id="usernameInput"
            placeholder="Username"
            value={username}
            onChange={(e) => {
              setusername(e.target.value);
            //   setAlert({ ...alertObj, userNameAlert: true });
            }}
          />

        </div>
            <button
            //   disabled={buttondisabled}
              type="submit"
              className={styles.btn}
              onClick={handleSubmit}
            >
              Reset Password
            </button>
      </form>
    </div>
  );
}

export default Signin;
