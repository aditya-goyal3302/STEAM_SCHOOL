import React, { useEffect } from "react";
import styles from "../css/contacts.module.css";
import RefreshIcon from "@material-ui/icons/Refresh";
import Contact from "./Contact";
import axios from "axios";

function Contacts({
  user,
  setuser,
  contacts,
  setContacts,
  printcontacts,
  currentchat,
  setCurrentchat,
}) {
  const refreshcontacts = () => {
    axios
      .get("user/get")
      .then((response) => {
        console.log(response.data);
        //Raghav added this shit
        setuser(response.data);
      })
      .catch((err) => {
        console.log("ERR", err);
      });
  };

  useEffect(() => {
    printcontacts();
    // eslint-disable-next-line
  }, [user]);

  useEffect(() => {
    console.log("do nothing");
  }, [currentchat]);

  return (
    <div className={styles.container}>
      <div onClick={refreshcontacts}>
        <RefreshIcon className={styles.refreshIcon} />
      </div>
      <div className={styles.requests}>
        {contacts.length ? (
          contacts.map((chat) => (
            <Contact
              key={chat._id}
              user={chat}
              currentchat={currentchat}
              setCurrentchat={setCurrentchat}
            />
          ))
        ) : (
          <h1>Your conversations show up here!</h1>
        )}
      </div>
    </div>
  );
}

export default Contacts;
