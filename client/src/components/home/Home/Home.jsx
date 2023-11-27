import React, { useEffect, useState } from "react";
import axios from "axios";
import ContactsWindow from "../components/ContactsWindow";
import ChatWindow from "../components/ChatWindow";
import styles from "../css/home.module.css";
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Navbar from"../../Navbar";
import Spinner from "../components/Spinner";


function Home() {
  const [user, setuser] = useState({});
  const [contacts, setContacts] = useState({});
  const [chats, setChats] = useState({});
  const [messages, setMessages] = useState({});
  const [currentchat, setCurrentchat] = useState();
  const [currentconversation, setCurrentconversation] = useState();
  const [mode, setMode] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true)
    axios
    .get("user/get")
    .then((response) => {
      const datauser = {
        _id: response.data._id,
        username: response.data.username,
        email: response.data.email,
        chats: response.data.chats,
        
      };
      console.log("datauser: ",response.data);
      setuser(datauser);
      // updatelocalstorage_user();
      // console.log("Fetched user now fetching friends");
    })
    .catch((err) => console.log(err));
    
    //eslint-disable-next-line
  }, []);
  useEffect(() => {
    const param = new URLSearchParams(window.location.search);
    const id = param.get("userid");
    if(id!==null){
      axios
      .get("/user/getprofile"+id)
      .then((response) => {
        const datauser = {
          _id: response.data._id,
          username: response.data.username,
          email: response.data.email,
          chats: response.data.chats,
          
        };
        
        setCurrentchat(datauser);
      })
    }
  },[ new URLSearchParams(window.location.search).get("userid") ])

    const updatelocalstorage_user = () => {
      localStorage.setItem("user", JSON.stringify(user));
    };
    
    useEffect(() => {
      printcontacts();
    updatelocalstorage_user();
    //eslint-disable-next-line
  }, [user]);
  
  function printcontacts() {
    if(user.chats && user.chats.length>0){
      axios
      .post("/friend/findbyid", {
        requests: user.chats,
      })
      .then((response) => {
        setContacts(response.data);
        // updatelocalstorage_contacts();
        // console.log("friends fetched too", contacts);
      })
      .catch((err) => {
        console.log("ERR", err);
      });}
      else {
        setContacts({});
        console.log("No friends");
      }

  }

  const updatelocalstorage_contacts = () => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  };
  useEffect(() => {
    updatelocalstorage_contacts();
    //eslint-disable-next-line
  }, [contacts]);
   useEffect
  (() => {
    if(Object.keys(contacts).length>0 || Object.keys(user).length>0 ){
      setLoading(false)
    }
  },[contacts])
  // User setup and local storage. User setup and local storage. User setup and local storage. User setup and local storage
  // User setup and local storage. User setup and local storage. User setup and local storage. User setup and local storage
  
  // Chat setup and local storage. Chat setup and local storage. Chat setup and local storage. Chat setup and local storage.
  // Chat setup and local storage. Chat setup and local storage. Chat setup and local storage. Chat setup and local storage.
  useEffect(() => {
    axios
    .get("chat/get")
    .then((response) => {
        console.log(response.data);
        setChats(response.data);
        // updatelocalstorage_chats();
        // let conversationids = response.data.map((a) => a._id);
        // setConversationIDs(conversationids);
      })
      .catch((err) => console.log(err));
      //eslint-disable-next-line
    }, []);
    
    const updatelocalstorage_chats = () => {
      localStorage.setItem("chats", JSON.stringify(chats));
    };
    useEffect(() => {
      updatelocalstorage_chats();
    fetchmessages();
    //eslint-disable-next-line
  }, [chats]);
  
  // Chat setup and local storage. Chat setup and local storage. Chat setup and local storage. Chat setup and local storage.
  // Chat setup and local storage. Chat setup and local storage. Chat setup and local storage. Chat setup and local storage.
  var i = 0;
  // var messages = {};
  
  const fetchmessages = () => {
    console.log("fetchedmessages", Object.keys(chats).length);
    if (i < Object.keys(chats).length) {
      axios
      .post("chat/getpastmessages", { chatid: chats[i]._id })
      .then((response) => {
        Object.assign(messages, { [chats[i]._id]: [response.data] });
        if (i <= Object.keys(chats).length) {
          i++;
          fetchmessages();
        }
      })
      .catch((err) => console.log(err));
    } else {
      localStorage.setItem("messages", JSON.stringify(messages));
    }
  };

  // const updatelocalstorage_chats = () => {
    //   localStorage.setItem("chats", JSON.stringify(chats));
  // };
  // useEffect(() => {
  //   updatelocalstorage_chats();
  // }, [chats]);

  const handleLogout = () => {
    console.log("REQUESTED LOGOUT");
    localStorage.removeItem("user");
    localStorage.removeItem("chats");
    localStorage.removeItem("messages");
    localStorage.removeItem("contacts");
    axios.delete("/user/logout").catch((err) => console.log(err));
    window.location.href = "/login";
  };

  // useEffect(() => {
  //   console.log("Chats state Updated", chats);
  // }, [chats]);

  useEffect(() => {
    if (currentchat) {
      console.log("currentchat", currentchat);
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].users.includes(currentchat._id)) {
          setCurrentconversation(chats[i]);
          break;
        }
      }
    }
    if (currentchat && window.innerWidth < 450) {
      document.getElementsByClassName("chatwindow")[0].style.width = "100%";
      document.getElementsByClassName("chatwindow")[0].style.flex = 100;
      // document.getElementsByClassName("chatwindow")[0].style.display = "flex";
      document.getElementsByClassName("contactswindow")[0].style.display =
        "none";
      // document.getElementsByClassName("contactswindow")[0].style.flex = 0;
      // document.getElementsByClassName("contactswindow")[0].style.width = 0;
      // document.getElementsByClassName("contactswindow")[0].style.flex = 0;
    }
    // eslint-disable-next-line
  }, [currentchat]);

  useEffect(() => {
    if (window.innerWidth < 450) {
      document.getElementsByClassName("contactswindow")[0].style.display =
        "flex";
      document.getElementsByClassName("chatwindow")[0].style.width = "0%";
      document.getElementsByClassName("chatwindow")[0].style.flex = 0;

      document.getElementsByClassName("contactswindow")[0].style.width = "100%";
      document.getElementsByClassName("contactswindow")[0].style.flex = 100;
      // document.getElementsByClassName("chatwindow")[0].style.display = "none";

      // document.getElementsByClassName("chatwindow")[0].style.display = "none";
      // document.getElementsByClassName("chatwindow")[0].style.flex = 0;
      // document.getElementsByClassName("chatwindow")[0].style.width = 0;
      // document.getElementsByClassName("chatwindow")[0].style.flex = 0;
    }
  }, [mode]);

  return (
    <div>
      {loading === true ? (
        <Spinner/>
      ) : (
        <div>
          <Navbar></Navbar>
          <div className={styles.container}>
            <div className={styles.main}>
              <div className={`${styles.contactsWindow} contactswindow`}>
                <ContactsWindow
                  user={user}
                  setuser={setuser}
                  contacts={contacts}
                  setContacts={setContacts}
                  printcontacts={printcontacts}
                  currentchat={currentchat}
                  setCurrentchat={setCurrentchat}
                />
                
              </div>
              <div className={`${styles.chatWindow} chatwindow`}>
                
                <ChatWindow
                  currentchat={currentchat}
                  setCurrentchat={setCurrentchat}
                  currentconversation={currentconversation}
                  setCurrentconversation={setCurrentconversation}
                  user={user}
                  messages={messages}
                  setMessages={setMessages}
                  mode={mode}
                  setMode={setMode}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    
    </div>
  );
}

export default Home;
