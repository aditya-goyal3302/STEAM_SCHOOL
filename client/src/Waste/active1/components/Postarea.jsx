import React from "react";
import styles from "../css/postarea.module.css";
import Post from "./Post";

function Postarea() {
  return (
    <div>
      <div className={styles.postarea}>
        <Post></Post>
      </div>
    </div>
  );
}

export default Postarea;
