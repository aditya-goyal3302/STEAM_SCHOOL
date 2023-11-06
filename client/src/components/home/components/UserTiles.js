import React from "react";
import styles from "../css/contact.module.css";
import PersonAddRoundedIcon from "@material-ui/icons/PersonAddRounded";
import axios from "axios";


function UserTiles(props) {

  const handlefrdrequest = (id) => {
    // console.log(id)
    axios.post("/friend/request", {"requesteduser" : id}).then(response => {
      console.log(response)
    }).catch(err => {
      console.log("ERR", err);  
    })
  }




  return (
    <div className={styles.container}>
      {/* <img
        src={props.userimg!==""?props.userimg:"https://iconape.com/wp-content/png_logo_vector/doraemon-logo.png"}
        alt="Contact Avatar"
        className={styles.contactImage}
      /> */}
      <div className={styles.contactDetail}>
        <div className={styles.contactName}>{props.username}</div>
        <div className={styles.contactLastMsg}>Ok bro</div>
      </div>
      <div style={{ float: "right"}} className={styles.newChat} onClick={()=> handlefrdrequest(props.userid)}>
            <PersonAddRoundedIcon
              className={styles.icon}
            />
          </div>
    </div>
  );
}

export default UserTiles;
