import React from "react";
import styles from "../css/message.module.css";

function Message(props) {
  
  return(
    <div
      className={
        props.messageData.position === "right"
          ? styles.containerRight
          : styles.containerLeft
      }
    >
      {/* <img
        src="https://media-eng.dhakatribune.com/uploads/2019/11/tahsan-web-1574170968575.gif"
        alt="senderImage"
        className={styles.image}
      /> */}
      <div className={
        props.messageData.position === "right"
        ? styles.messageContainerR
        : styles.messageContainerL
        }>
        <div className={styles.messageText}><img className={styles.messimg} src={props.messageData.image}></img></div>
        <div className={props.messageData.position === "right"
        ? styles.messageTimeR
        : styles.messageTimeL}>{props.messageData.time}</div>
      </div>
    </div>
  );
}

export default Message;
