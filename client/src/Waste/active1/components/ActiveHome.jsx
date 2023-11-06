import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../css/activehome.module.css";
import SideNav from "./SideNav";
import Topnav from "./Topnav";
import Topblocks from "./Topblocks";
import Postarea from "./Postarea";

function ActiveHome() {
  const [user, setuser] = useState({});
  useEffect(() => {
    axios
      .get("user/get")
      .then((response) => {
        setuser(response.data);
        updatelocalstorage_user();
        console.log("Fetched user now fetching friends", response.data);
      })
      .catch((err) => console.log(err));
    //eslint-disable-next-line
  }, []);

  const updatelocalstorage_user = () => {
    localStorage.setItem("user", JSON.stringify(user));
  };

  useEffect(() => {
    updatelocalstorage_user();
    //eslint-disable-next-line
  }, [user]);

  return (
    <div style={{ overflow: "hidden" }}>
      <SideNav user={user} />
      <div className={styles.mainarea}>
        {/* <Topnav user={user} /> */}
        <Topblocks />
        <Postarea />
      </div>
    </div>
  );
}

export default ActiveHome;
