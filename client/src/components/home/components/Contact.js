import React, { useEffect } from "react";
import styles from "../css/contact.module.css";

function Contact({ user, currentchat, setCurrentchat, mode, setMode }) {
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
              : "https://iconape.com/wp-content/png_logo_vector/doraemon-logo.png"
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
