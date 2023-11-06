import React from "react";
import styles from "../css/topnav.module.css";
function Topnav(user) {
  return (
    <div>
      <div className={styles.topnav}>Welcome to Active {user.username}</div>
    </div>
  );
}

export default Topnav;
