import React, { useState, useEffect } from "react";
import Errormessage from "../Alerts/Errormessage";
import Successmessage from "../Alerts/Successmessage";
import axios from "axios";
import styles from "./sign.module.css";
import cx from "classnames";
import google from "../../resources/google.png";
import Spinner from "../home/components/Spinner";

function Signin() {
    const [isloading, setisloading] = useState(1);
    const [serverERR, setserverERR] = useState(0);
    const [password, setpassword] = useState("");
    const [tokentimes, settokentimes] = useState("");
    const [confirmpassword, setconfirmpassword] = useState("");

    useEffect(() => {
      setisloading(1)
      const queryParameters = new URLSearchParams(window.location.search)
      const token = queryParameters.get("token")
      axios.get("/user/resetcheck/"+token).then(data=>{
        console.log(data.data);
        if(data.data.code === 1){
          // window.location.href="/login"
          setserverERR(1)
          setisloading(0)
        }
        if(data.data.code === 2){
          console.log("hi");
          setserverERR(2)
          settokentimes(data.data.resetTokenExpiration)
          setisloading(0)

        }
      })
    },[])

    const handleSubmit = (e) => {
        e.preventDefault();
        setserverERR(0);
        setisloading(1);
        const queryParameters = new URLSearchParams(window.location.search)
        const token = queryParameters.get("token")
        if(password !== confirmpassword){
          setisloading(0)
          setserverERR(3)
          return;
        }
        axios.post("/user/resetpassword", {
            password: password,
            token:token
        })
            .then((data) => {
                console.log(data.data);
                setisloading(0);
                if (data.data.code === 1) {
                    setserverERR(1);
                }
                else if (data.data.code === 3) {
                    setserverERR(3);
                }
                else {
                    setserverERR(4);
                }
            })
            .catch((err) => {
                console.log(err);
                setisloading(0);
                // setshowserverERR(1);
            });
    }
    
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
        <h1>Set New Password</h1>

        {serverERR === 2 && <Successmessage message={`Your Link Will Expire At: ${tokentimes} `} />}
        {serverERR === 4 && <Successmessage message={`Password Reset Successfully `} />}
        {serverERR === 1 && (
          <Errormessage message={"Token Expired"} />
        )}
        {serverERR === 3 && (
          <Errormessage message={"Password Mismatch"} />
        )}
        
        <div className={styles.inputField}>
          <input
            type="password"
            className=""
            id="passwordInput"
            placeholder="Password"
            value={password}
            disabled={serverERR === 2 ? false : serverERR === 3 ? false : true}
            onChange={(e) => {
              setpassword(e.target.value);
            //   setAlert({ ...alertObj, userNameAlert: true });
        }}
        />
        </div>

        <div className={styles.inputField}>
          <input
            type="password"
            className=""
            id="confirmpasswordinput"
            placeholder="Confirm Password"
            value={confirmpassword}
            disabled={serverERR === 2 ? false : serverERR === 3 ? false : true}
            onChange={(e) => {
              setconfirmpassword(e.target.value);
            //   setAlert({ ...alertObj, userNameAlert: true });
        }}
        />
        </div>
        {serverERR !==1 && (
            <button
            //   disabled={buttondisabled}
              type="submit"
              className={styles.btn}
              onClick={handleSubmit}
            >
              Reset Password
            </button>

        )}


      </form>
    </div>
  );
}

export default Signin;
