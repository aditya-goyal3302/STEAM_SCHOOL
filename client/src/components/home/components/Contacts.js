import React, { useEffect } from "react";
import styles from "../css/contacts.module.css";
import RefreshIcon from "@material-ui/icons/Refresh";
import Contact from "../components/Contact";
import axios from "axios";

function Contacts({
  user,
  setuser,
  contacts,
  setContacts,
  printcontacts,
  currentchat,
  setCurrentchat,
  mode,
  setMode,
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
              mode={mode}
              setMode= {setMode}
              // onClick={()=>{
              //   setMode(!mode)
              // }}
            />
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default Contacts;
