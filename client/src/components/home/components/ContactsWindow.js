import React, { useState, useEffect } from "react";
import styles from "../css/contactsWindow.module.css";
import Contacts from "./Contacts";
import SearchIcon from "@material-ui/icons/Search";
import axios from "axios";

function ContactsWindow({
  user,
  setuser,
  contacts,
  setContacts,
  printcontacts,
  currentchat,
  setCurrentchat,
  mode,
  setMode
}) {

  const [searchbarval, setSearchbarval] = useState("");
  const [searchresult, setSearchresult] = useState();

  useEffect(() => {
    console.log(searchbarval);
    //axios req
    if (searchbarval.length) {
      axios
        .get(`/user/chatsfind/`)
        .then((response) => {
          console.log(response);
          setSearchresult(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setSearchresult();
    }
  }, [searchbarval]);

  return (
    <div className={styles.container}>
      {/* <div className={styles.head}>
        <div className={styles.headLeft}>
          {user.username && (
            <img src={user.img} alt="img" className={styles.userimage} />
          )}
          <div className={styles.userName}>{user.username}</div>
        </div>
      </div> */}
      {/* <div className={styles.tabcontainer}>
        <div className={styles.tab} onClick={setContMode}>
          Chats
        </div>
        <div className={styles.tab} onClick={setFindMode}>
          Search
        </div>
        <div className={styles.tab} onClick={setReqMode}>
          Requests
        </div>
      </div> */}
      <div className={styles.searchContainer}>
        <div className={styles.search}>
          <input
            type="text"
            className={styles.searchBar}
            placeholder="Search for a contact"
            style={{ backgroundColor: "transparent" }}
            value={searchbarval}
            onChange={(e) => {
              setSearchbarval(e.target.value);
            }}
          />
        </div>
      </div>
        <Contacts
          user={user}
          setuser={setuser}
          contacts={contacts}
          setContacts={setContacts}
          printcontacts={printcontacts}
          currentchat={currentchat}
          setCurrentchat={setCurrentchat}
          setMode={setMode}
          mode={mode}
          />
    </div>
  );
}

export default ContactsWindow;
