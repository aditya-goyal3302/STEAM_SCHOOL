import React from "react";
import styles from "../css/post.module.css";

function Post() {
  return (
    <div>
      <div className={styles.post_container}>
        <div className={styles.post_header}>Armaan Jain</div>
        <div className={styles.post_body}>
          <img src="" alt="" />
        </div>
        <div className={styles.post_footer}>Like</div>
      </div>
    </div>
  );
}

export default Post;
