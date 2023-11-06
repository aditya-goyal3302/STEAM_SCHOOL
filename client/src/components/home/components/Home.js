import React from "react";
import styles from "../css/home.module.css";
import ContactsWindow from "./ContactsWindow";
import ContactWindow from "./ChatWindow";

function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.contactsWindow}>
          <ContactsWindow name="username" />
        </div>
        <div className={styles.chatWindow}>
          <ContactWindow name="Armaan" status="online" />
        </div>
      </div>
    </div>
  );
}

export default Home;
