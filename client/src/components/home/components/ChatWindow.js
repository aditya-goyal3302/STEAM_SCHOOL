import React, { useState, useEffect,useRef } from "react";
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
import { useDropzone } from 'react-dropzone';
import AWS from "aws-sdk";
// import { set } from "mongoose";


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
  const placeholder = "https://steamschool199.s3.ap-south-1.amazonaws.com/placeholderpic.png"
  const [messageinput, setMessageinput] = useState("");
  const [socket, setSocket] = useState(null);
  const [chatwindowupdate, setChatwindowupdate] = useState(false);
  const[textboxstate,settextboxstate] = useState(false);
  const [new_url, setnew_url] = useState("");
  const [file, setFile] = useState(null);
  const div = useRef(null);
  const generateRandomString = async(tfile) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';
    for (let i = 0; i < 32; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters[randomIndex];
    }
    randomString += "."+tfile.name.split('.')[1];
    return randomString;
  };
  
  const handleKeyPress = (event) => {
    if (event.keyCode === 13) {
      sendmessage();
    }
  };

  const verify_file = async (tfile) => {
    console.log(tfile);
    let tname = tfile.name.toString().split('.')[1];
    if(tname=="jpg"|| tname=="jpeg"|| tname=="png"|| tname=="gif"|| tname=="webp"){
      return true;
    }
    else{
      return false;
    }
  }

  const uploadfile = async (tfile) => {
    if(await verify_file(tfile)){
      const base_url ="https://steamschool199.s3.ap-south-1.amazonaws.com/"
    
      const S3_BUCKET = "steamschool199";
      const REGION = "ap-south-1";
      AWS.config.update({
        accessKeyId: "AKIAVXMPYCD56SUUX6VN",
        secretAccessKey: "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",
      });
      const s3 = new AWS.S3({
        params: { Bucket: S3_BUCKET },
        region: REGION,
      });
    
      const randomString = await generateRandomString(tfile);
      console.log(randomString);
      const params = {
        Bucket: S3_BUCKET,
        Key: randomString,
        Body: tfile,
      };
    
    
      var upload = s3
        .putObject(params)
        .on("httpUploadProgress", (evt) => {
          console.log(
            "Uploading " + parseInt((evt.loaded * 100) / evt.total) + "%"
          );
        })
        .promise();
    var temp = ""
      return await upload.then((err, data) => {
        console.log(err);
        temp = base_url+randomString
        // console.log(temp);
        return temp
      });
    }
    else{
      alert("Invalid file type")
    }
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ noClick: true, onDrop: acceptedFiles => {
    // Do something with the files
    // console.log(acceptedFiles);
    // map(acceptedFiles, (file) => {
    //   // console.log(file);
    //   // setFile(file);
    // });
      
    setFile(acceptedFiles);
    // console.log(file);
  }  });


  useEffect(() => {
    if(file!==null){
       file.map( (tfile) => {
        uploadfile(tfile).then((response)=>{
          // console.log(response);
          if(response!==undefined)
            setnew_url(response);
        }).catch((err)=>console.log(err))
      })
    }
  },[file])
  
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
      setnew_url("");
      return;
    }
    if (currentchat) {
      var newmessage = {
        recieverid: currentchat._id,
        chatid: currentconversation._id,
        mtype: 1,
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
          mtype: 1,
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

  useEffect(() => {
    if(new_url!=="")
      sendfile();
    
  },[new_url])

  const sendfilebtn =async () => {
    if(textboxstate===false){
      await settextboxstate(true);
      document.getElementById("file-picker-cw").click()
      return;
    }
    document.getElementById("file-picker-cw").click()
    
  }

  const sendfile = async() => {
    // e.preventdefault();
    
      if (currentchat) {
        var newmessage = {
          recieverid: currentchat._id,
          chatid: currentconversation._id,
          mtype: 2,
          text: new_url,
          senderid: user._id,
          createdAt: Date.now(),
        };
        await messages[currentconversation._id][0].push(newmessage);
        await setMessages(messages);
       updateconversation();

        sendmessagethroughsocket(newmessage);

        axios
          .post("chat/sendmessage", {
            text: new_url,
            mtype: 2,
            conversationID: currentconversation._id,
          })
          .then((response) => {
            console.log(response.data);
            setnew_url("");
            setFile(null);
          })
            .catch((err) =>{ 
              console.log(err)
              setnew_url("") 
            });
      }
      // console.log(messageinput);
      settextboxstate(false);

    
  };

  const updateconversation = () => {
    setChatwindowupdate(!chatwindowupdate);
  };

  // useEffect(()=> div.current.scrollIntoView({behavior: "smooth", block:"end"}), [currentconversation])

  return (
    <div className={styles.container}>
           {currentchat !==undefined && (<>
      <div className={styles.head}>
        <div className={styles.contactInfo } onClick={()=>{
          window.location.href="/profile/?userid="+currentchat._id
        }}>
            <div className={styles.contactImage}>
              <img
                src={
                  currentchat && currentchat.img !== ""
                    ? currentchat.img
                    : placeholder
                }
                alt="CP"
              />
            </div>
            <div className={styles.contactDetail}>
            <div className={styles.contactName}>
              {currentchat ? currentchat.username : " "}
              </div>
            </div>
          <div className={styles.status}></div>
        </div>
        
        <MenuIcon className={styles.menuIcon} onClick={changemode} />
      </div>
      <div className={styles.chat} ref={div}>
        {currentconversation &&
          messages !== undefined &&
          messages[currentconversation._id][0].map(
            (message) =>{
              // console.log(message.mtype==1)
              {if(message.mtype==1) return(
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
              )}
              {if(message.mtype==2) return (
                <M_Image
                  messageData={{
                    image: message.text,
                    time: new Date(message.createdAt).toLocaleString(
                      undefined,
                      { timeZone: "Asia/Kolkata" }
                    ),
                    position:
                      message.senderid === currentchat._id ? "left" : "right",
                  }}
                  key={message._id ? message._id : uuid()}
                />
              )}
            }
          )}
          
      </div>
      <div className={styles.messageContainer}>
        {/* <div className={styles.messageContainerIcons}>
          <InsertEmoticonIcon className={styles.emojiIcon} />
          <AttachFileIcon className={styles.fileIcon} />
        </div> */}
        <div className={styles.messageInputContainer}>
          <div {...getRootProps ({className: 'dropzone'})} style={{hight:"25px"}}  className={ `file-picker ${isDragActive ? 'active' : ''}`}>
            {textboxstate===false?
              <input
                type="text"
                className={styles.messageInput}
                placeholder="Type your message here"
                value={messageinput}
                onChange={(e) => setMessageinput(e.target.value)}
                onKeyDown={handleKeyPress}
              />
              :
              <input
                type="file"
                id = "file-picker-cw"
                {...getInputProps()}
                className={styles.messageInput}
                placeholder="upload file here"
              />
              
            }
          </div>
        </div>
        <div>
          {/* <Attachment className={styles.sendIcon} onClick={sendfile} /> */}
          
        </div>
          <AttachFileIcon className={styles.sendIcon} onClick={sendfilebtn} />
        <div>
          <SendIcon className={styles.sendIcon} onClick={sendmessage} />
        </div>
      </div>
          </>)}
    </div>
  );
}

export default ChatWindow;
