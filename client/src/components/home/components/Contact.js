import React, { useEffect } from "react";
import styles from "../css/contact.module.css";

function Contact({ user, currentchat, setCurrentchat, mode, setMode }) {
  const placeholder = "https://steamschool199.s3.ap-south-1.amazonaws.com/placeholderpic.png"
  const changechat = () => {
    setCurrentchat(user);
  };

  return (
    <div
      className={
        currentchat
          ? currentchat._id === user._id
            ? styles.activecontact
            : styles.requestbox
          : styles.requestbox
      }
      onClick={()=>{changechat();setMode(!mode)}}
    >
      <div className={styles.requestimage}>
        <img
          src={
            user.img !== ""
              ? user.img
              : placeholder
          }
          alt="ca"
          className={styles.contactimage}
        />
      </div>
      <div className={styles.seprator}></div>
      <div
        className={
          currentchat
            ? currentchat._id === user._id
              ? styles.activeinfo
              : styles.requesteduserinfo
            : styles.requesteduserinfo
        }
      >
        {user.username}
      </div>
    </div>
  );
}

export default Contact;
