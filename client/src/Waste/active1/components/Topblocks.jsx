import React from "react";
import styles from "../css/topblocks.module.css";
import im from "./photo-1438761681033-6461ffad8d80.jpeg";

function Topblocks() {
  return (
    <div>
      <div className={styles.topblocks}>
        <div className={styles.leftblock}>
          <img src={im} alt="" />
        </div>
        <div className={styles.leftblock}>
          <img src={im} alt="" />
        </div>
        <div className={styles.leftblock}>
          <img src={im} alt="" />
        </div>
        <div className={styles.leftblock}>
          <img src={im} alt="" />
        </div>
        <div className={styles.leftblock}>
          <img src={im} alt="" />
        </div>
        <div className={styles.leftblock}>
          <img src={im} alt="" />
        </div>
        <div className={styles.leftblock}>
          <img src={im} alt="" />
        </div>
        {/* <p>50</p>
        <p>Friends</p> */}
        {/* <div className={styles.leftblock}>
          <p>50</p>
          <p>Friends</p>
        </div>
        <div className={styles.midblock}>
          <p>Profile Icon</p>
          <p>Profile</p>
        </div>
        <div className={styles.rightblock}>
          <p>Plus Icon</p>
          <p>Share Something!</p>
        </div> */}
      </div>
      {/* <hr style={{ width: "50" }} /> */}
    </div>
  );
}

export default Topblocks;
