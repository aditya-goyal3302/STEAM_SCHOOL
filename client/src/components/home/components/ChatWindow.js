import React, { useState, useEffect } from "react";
import styles from "../css/chatWindow.module.css";
import MenuIcon from "@material-ui/icons/Menu";
import { Attachment } from "@material-ui/icons";
import Message from "./Message";
import M_Image from "./message-image"
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import SendIcon from "@material-ui/icons/Send";
import uuid from "react-uuid";
import axios from "axios";
import { io } from "socket.io-client";

function ChatWindow({
  currentchat,
  setCurrentchat,
  currentconversation,
  setcurrentconversation,
  messages,
  setMessages,
  user,
  setMode,
  mode,
}) {
  const [messageinput, setMessageinput] = useState("");
  const [socket, setSocket] = useState(null);
  const [chatwindowupdate, setChatwindowupdate] = useState(false);
  const[textboxstate,settextboxstate] = useState(false);

  useEffect(() => {
    socket?.on("message", (message) => {
      console.log(message);
    });

    socket?.on("getMessage", (newmessagedata) => {
      var newmessage = {
        chatid: newmessagedata.chatid,
        text: newmessagedata.text,
        senderid: newmessagedata.senderid,
        createdAt: Date.now(),
      };
      console.log("message recieved from socket", newmessage);

      // messages[currentconversation._id][0].push(newmessage);
      // setMessages(messages);
      // updateconversation();

      messages[newmessagedata.chatid][0].push(newmessage);
      setMessages(messages);
      console.log("messagesarrayupdated", messages[newmessagedata.chatid][0]);
      updateconversation();
      setChatwindowupdate(!chatwindowupdate);
    });
  }, [socket]);

  useEffect(() => {
    console.log();
    setSocket(io("ws://localhost:3005"));
  }, []);

  function sendmessagethroughsocket(message) {
    socket?.emit("sendMessage", message);
    console.log(message);
  }

  function changemode() {
    setMode(!mode);
  }

  useEffect(() => {
    if (user !== "") socket?.emit("join", user._id);
    socket?.on("getUsers", (activeusers) => {
      console.log(activeusers);
    });
    //eslint-disable-next-line
  }, [user]);

  const sendmessage = (e) => {
    // e.preventdefault();
    if(textboxstate===true){
      settextboxstate(false);
      return;
    }
    if (currentchat) {
      var newmessage = {
        recieverid: currentchat._id,
        chatid: currentconversation._id,
        text: messageinput,
        senderid: user._id,
        createdAt: Date.now(),
      };
      messages[currentconversation._id][0].push(newmessage);
      setMessages(messages);
      updateconversation();

      sendmessagethroughsocket(newmessage);

      axios
        .post("chat/sendmessage", {
          text: messageinput,
          conversationID: currentconversation._id,
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((err) => console.log(err));
    }
    console.log(messageinput);

    setMessageinput("");
  };

  const sendfile = (e) => {
    // e.preventdefault();
    if(textboxstate===false){
      settextboxstate(true);
      return;
    }
    if (currentchat) {
      var newmessage = {
        recieverid: currentchat._id,
        chatid: currentconversation._id,
        senderid: user._id,
        createdAt: Date.now(),

      };
      messages[currentconversation._id][0].push(newmessage);
      setMessages(messages);
      updateconversation();

      sendmessagethroughsocket(newmessage);

      axios
        .post("chat/sendmessage", {
          text: messageinput,
          conversationID: currentconversation._id,
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((err) => console.log(err));
    }
    // console.log(messageinput);
    settextboxstate(false);

    setMessageinput("");
  };

  const updateconversation = () => {
    setChatwindowupdate(!chatwindowupdate);
  };

  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <div className={styles.contactInfo}>
          <div className={styles.contactImage}>
            {/* {currentchat &&(
              
            )} */}
            <img
              src={
                currentchat && currentchat.img !== ""
                  ? currentchat.img
                  : "https://iconape.com/wp-content/png_logo_vector/doraemon-logo.png"
              }
              alt="Contact Avatar"
            />
          </div>
          <div className={styles.contactDetail}>
            <div className={styles.contactName}>
              {currentchat ? currentchat.username : " Aditya"}
            </div>
          </div>
          {/* <div className={styles.status}>Commited</div> */}
        </div>
        
        <MenuIcon className={styles.menuIcon} onClick={changemode} />
      </div>
      <div className={styles.chat}>
        {currentconversation &&
          messages !== undefined &&
          messages[currentconversation._id][0].map(
            (message) =>
              message && (
                <Message
                  messageData={{
                    text: message.text,
                    time: new Date(message.createdAt).toLocaleString(
                      undefined,
                      { timeZone: "Asia/Kolkata" }
                    ),
                    position:
                      message.senderid === currentchat._id ? "left" : "right",
                  }}
                  key={message._id ? message._id : uuid()}
                />
              )
          )}
          {/* {<>
                <Message
                  messageData={{
                    text: "message.textmessage.textmessage.text",
                    time:  Date.now(),
                    position:"left",
                  }}
                  // key={message._id ? message._id : uuid()}
                />
                <Message
                  messageData={{
                    text: 'Visit my website: www.google.com Example Website</a>',
                    time:  Date.now(),
                    position:"right",
                  }}
                  // key={message._id ? message._id : uuid()}
                />
                <M_Image
                  messageData={{
                    image: 'https://media.istockphoto.com/id/1402577565/photo/colour-swatches-book.webp?b=1&s=170667a&w=0&k=20&c=5oYyljXxGN1aolUSuyLLAii11_bcDb-tiVq0iGV7N5I=',
                    time:  Date.now(),
                    position:"right",
                  }}
                  // key={message._id ? message._id : uuid()}
                />
                <M_Image
                  messageData={{
                    image: 'https://media.istockphoto.com/id/1402577565/photo/colour-swatches-book.webp?b=1&s=170667a&w=0&k=20&c=5oYyljXxGN1aolUSuyLLAii11_bcDb-tiVq0iGV7N5I=',
                    time:  Date.now(),
                    position:"left",
                  }}
                  // key={message._id ? message._id : uuid()}
                />
              </>
          } */}
      </div>
      <div className={styles.messageContainer}>
        {/* <div className={styles.messageContainerIcons}>
          <InsertEmoticonIcon className={styles.emojiIcon} />
          <AttachFileIcon className={styles.fileIcon} />
        </div> */}
        <div className={styles.messageInputContainer}>
          {textboxstate===false?
          <input
            type="text"
            className={styles.messageInput}
            placeholder="Type your message here"
            value={messageinput}
            onChange={(e) => setMessageinput(e.target.value)}
          />
          :
          <input
          type="file"
          className={styles.messageInput}
          placeholder="Select your File here"
          value={messageinput}
          // onChange={(e) => setMessageinput(e.target.value)}
        />
        }
        </div>
        <div>
          <Attachment className={styles.sendIcon} onClick={sendfile} />
        </div>
        <div>
          <SendIcon className={styles.sendIcon} onClick={sendmessage} />
        </div>
      </div>
    </div>
  );
}

export default ChatWindow;
