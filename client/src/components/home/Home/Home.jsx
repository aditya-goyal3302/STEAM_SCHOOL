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
  const [mode, setMode] = useState(undefined);
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
      })
    .catch((err) => console.log(err));
    
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
  }, [user]);
  
  function printcontacts() {
    if(user.chats && user.chats.length>0){
      axios
      .post("/friend/findbyid", {
        requests: user.chats,
      })
      .then((response) => {
        setContacts(response.data);
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
  
  useEffect(() => {
    axios
    .get("chat/get")
    .then((response) => {
        console.log(response.data);
        setChats(response.data);
      })
      .catch((err) => console.log(err));
    }, []);
    
    const updatelocalstorage_chats = () => {
      localStorage.setItem("chats", JSON.stringify(chats));
    };
    useEffect(() => {
      updatelocalstorage_chats();
    fetchmessages();
  }, [chats]);
  
 var i = 0;
  
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

 
  const handleLogout = () => {
    console.log("REQUESTED LOGOUT");
    localStorage.removeItem("user");
    localStorage.removeItem("chats");
    localStorage.removeItem("messages");
    localStorage.removeItem("contacts");
    axios.delete("/user/logout").catch((err) => console.log(err));
    window.location.href = "/login";
  };

  useEffect(async () => {
    if (currentchat) {
      console.log("currentchat", currentchat);
       for (var i = 0; i < chats.length; i++) {
        if (chats[i].users.includes(currentchat._id)) {
          setCurrentconversation(chats[i]);
          break;
        }
      }
    }
    if(mode === undefined){
      setMode(false)
    }
  }, [currentchat]);

 
  const animateProperty = (element, property, startValue, endValue, duration) => {
    const startTime = new Date().getTime();
    const changeInValue = endValue - startValue;

    const animate = () => {
      const currentTime = new Date().getTime();
      const elapsed = currentTime - startTime;
      const progress = elapsed / duration;

      if (progress < 1) {
        const newValue = startValue + changeInValue * progress;
        element.style[property] =`${newValue}%`;
        requestAnimationFrame(animate);
      } else {
        element.style[property] =`${endValue}%`;
      }
    };

  animate();
  };
  const animatePropertyWTN = (element, property, startValue, endValue, duration) => {
    const startTime = new Date().getTime();
    const changeInValue = endValue - startValue;

    const animate = () => {
      const currentTime = new Date().getTime();
      const elapsed = currentTime - startTime;
      const progress = elapsed / duration;

      if (progress < 1) {
        const newValue = startValue + changeInValue * progress;
        element.style[property] =newValue;
        requestAnimationFrame(animate);
      } else {
        element.style[property] =endValue;
      }
    };

  animate();
  };
  useEffect(() => {
    if (window.innerWidth < 470 && mode !==undefined) {
      const contactWindow = document.getElementsByClassName("contactswindow")[0];
      const chatWindow = document.getElementsByClassName("chatwindow")[0];
      if(mode===true ){
        try{
          document.getElementsByClassName("contactswindow")[0].style.display ="flex";
          animateProperty(contactWindow, "width", 0, 100, 500);
          animateProperty(chatWindow, "width",100,0,500);
          animatePropertyWTN(chatWindow, "flex",100,0,500);
          animatePropertyWTN(contactWindow, "flex",0,100,500);
          setTimeout(() => {
            document.getElementsByClassName("chatwindow")[0].style.display = "none";
          },(250))
        }
        catch(err){
          console.log(err)
        }
      }
      if(mode===false ){
        try{
          document.getElementsByClassName("chatwindow")[0].style.display = "flex";
          animateProperty(contactWindow, "width", 100, 0, 500);
          animateProperty(chatWindow, "width",0,100,500);
          animatePropertyWTN(contactWindow, "flex",100,0,500);
          animatePropertyWTN(chatWindow, "flex",0,100,500);
          setTimeout(() => {
            document.getElementsByClassName("contactswindow")[0].style.display = "none";
          },(250))
        }
        catch(err){
          console.log(err)
        }
      }}
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
                  mode={mode}
                  setMode={setMode}
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
