import React from "react";
import styles from "../css/requesttiles.module.css";
import axios from "axios";


function RequestTiles({user, setuser}) {

  const acceptrequest = (id) => {
    console.log("Accepting ", id)
    axios.post("/friend/acceptrequest", {"acceptedid" : id}).then(response => {
      console.log(response)
      setuser(response.data)
    }).catch(err => {
      console.log("ERR", err);
    })
  }
  const rejectrequest = (id) => {
    console.log("Rejecting", id)
    axios.post("/friend/rejectrequest", {"rejectedid" : id}).then(response => {
      console.log(response)
      setuser(response.data)
    }).catch(err => {
      console.log("ERR", err);
    })
  }
//
//

  return (
    <div className={styles.requestbox}>
      <div className={styles.requestimage}>
      <img
        src={user.img!==""?user.img:"https://iconape.com/wp-content/png_logo_vector/doraemon-logo.png"}
        alt="Contact Avatar"
        className={styles.contactimage}
      />
      </div>
      <div className={styles.seprator}></div>
      <div className={styles.requesteduserinfo}>
        {user.username}
      </div>
      <div className={styles.requestoptions}>
        <div className={styles.acceptbutton} onClick={()=> {acceptrequest(user._id)}}>
            Accept
        </div>
        <div className={styles.rejectbutton} onClick={()=> {rejectrequest(user._id)}}>
            Reject
        </div>
      </div>
    </div>
  );
}

export default RequestTiles;
