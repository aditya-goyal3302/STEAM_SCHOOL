import React from "react";
import styles from "../css/sideinfo.module.css";

function SideInfo({ user }) {
  return (
    <div>
      <div className={styles.div4}>
        {/* <div>  <img id="current_logo" src="https://www.flaticon.com/svg/static/icons/svg/27/27112.svg"/> </div> */}

        <div style={{ color: "white" }}>Profile</div>
        <div id="currently_playing_details">
          <div>
            <img src={user.img} alt="User Img" id="current_img" />
          </div>
          <p className={styles.curr_name}>{user.username}</p>
        </div>
      </div>
    </div>
  );
}
export default SideInfo;
