import React, { useEffect, useState } from "react";
import styles from "./UserFriendRequests.module.css";
import RefreshIcon from "@material-ui/icons/Refresh";
import RequestTiles from "../components/RequestTiles";
import axios from "axios";

function UserFriendRequests({ user, setuser }) {
  const [requests, setRequests] = useState({});

  // useEffect(() => {
  //   refreshrequests();
  //   // eslint-disable-next-line
  // }, [])

  function printrequests() {
    axios
      .post("/friend/findbyid", { requests: user.requests })
      .then((response) => {
        console.log(response);
        setRequests(response.data);
        console.log(requests);
      })
      .catch((err) => {
        console.log("ERR", err);
      });
  }

  const refreshrequests = () => {
    console.log("cli");
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
    printrequests();
    // eslint-disable-next-line
  }, [user]);

  return (
    <div className={styles.container}>
      <div onClick={refreshrequests}>
        Yo!
        <RefreshIcon className={styles.refreshIcon} />
      </div>
      <div className={styles.requests}>
        {requests.length ? (
          requests.map((request) => (
            <RequestTiles setuser={setuser} key={request._id} user={request} />
          ))
        ) : (
          <h1>You Don't have any new requests</h1>
        )}
      </div>
    </div>
  );
}

export default UserFriendRequests;
