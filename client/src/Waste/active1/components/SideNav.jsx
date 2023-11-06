import React from "react";
import styles from "../css/sidenav.module.css";
import im from "./photo-1438761681033-6461ffad8d80.jpeg";
import logo from "../public/logo1_w_g.png";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import MessageIcon from "@mui/icons-material/Message";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import BookIcon from "@mui/icons-material/Book";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import BrushIcon from "@mui/icons-material/Brush";
import CallIcon from "@mui/icons-material/Call";
import SideInfo from "./SideInfo";

function SideNav({ user }) {
  return (
    <div>
      <div className={styles.sidenav}>
        <img src={logo} alt="" className={styles.logo} />
        <ul>
          <p></p>
          <li className={styles.selected}>
            <ImageSearchIcon />
            <span> Posts </span>
          </li>
          <li>
            <MessageIcon />
            <span> Messenger </span>
          </li>
          <li>
            <ReceiptLongIcon />
            <span> Books </span>
          </li>

          <li>
            <BookIcon />
            <span> Notes </span>
          </li>
          <li>
            <LibraryMusicIcon />
            <span>Music </span>
          </li>
          <li>
            <BrushIcon />
            <span> Create </span>
          </li>
          <li>
            <CallIcon />
            <span> Calls </span>
          </li>
        </ul>
        <div>
          <SideInfo user={user} />
        </div>
      </div>
    </div>
  );
}

export default SideNav;
