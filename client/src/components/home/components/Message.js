import React from "react";
import styles from "../css/message.module.css";

function Message(props) {
  const messageWithLinks = props.messageData.text.replace(
    /((http|https|www)[^\s]+)/g,
    (url) =>
      `<a href="${url.startsWith('http') ? url : `http://${url}`}" target="_blank">${url}</a>`
  );
  const createMarkup = () => {
    return { __html:messageWithLinks  };
  };
  return props.messageData.position === "center" ? (
    <div className={styles.containerCenter}>
      <div className={styles.messageTextCenter}>{props.messageData.text}</div>
    </div>
  ) : (
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
        <div className={
        props.messageData.position === "right"
        ? styles.messageTextR
        : styles.messageTextL
        } dangerouslySetInnerHTML={createMarkup()} ></div>
        <div className={
        props.messageData.position === "right"
        ? styles.messageTimeR
        : styles.messageTimeL
        }>{props.messageData.time}</div>
      </div>
    </div>
  );
}

export default Message;
