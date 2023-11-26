import React, { useEffect, useState } from 'react';
import "./NavbarStyles.css";
import logo from "./Logo.png" 
import axios from "axios";


function Navbar() {
    // const[page,setpage] = useState(1)
    const [islogin,setislogin] = useState(1)
    function change1(e){
        e.preventDefault();
        window.location.href = "/"
        // setpage(1);
    }

    useEffect(()=>{
        console.log("hi ",window.location.pathname)
    })

    useEffect(()=>{
        axios.get("/user/getprofile/self")  ///user/getp/cgyzdvxr67t7
        .then(data=>{
            if(data.data.code === 101){
                setislogin(0);
            }
            else{
                setislogin(1);
            }
        }).catch(err=>{
            setislogin(0);
        })
    })
    const handlecurrprofile = () => {
        if(islogin === 0){
            window.location.href = "/login"
            return;
        }
        window.location.href = "/Profile"
    }
    const handleprofile = () => {
        if(islogin === 0){
            window.location.href = "/login"
            return;
        }
        window.location.href = "/editprofile"
    }
    const handlechat = () => {
        if(islogin === 0){
            window.location.href = "/login"
            return;
        }
        window.location.href = "/chat"
    }
    
    const handleLogout = () => {
        console.log("REQUESTED LOGOUT");
        localStorage.removeItem("user");
        localStorage.removeItem("chats");
        localStorage.removeItem("messages");
        localStorage.removeItem("contacts");
        axios.delete("/user/logout").catch((err) => console.log(err));
        window.location.href = "/login";
      };
    return(
        <>
            <nav className="main-nav">
                <div className="Img"><a href=""><img src={logo} /></a>
                </div>
                <div className="nav-items">
                    <ul id="navbar">
                            {/* <li><Link><i></i>Home</Link></li> */}
                            
                            <li><a 
                                onClick={change1} 
                                className={window.location.pathname == "/" ? "active" : ""}
                                >
                                    Home
                                </a>
                            </li>
                            <li><a 
                                className={window.location.pathname == "/about" ? "active" : ""}
                                href="/about">About</a></li>
                            <li><a 
                                className={window.location.pathname == "/chat" ? "active" : ""}
                                onClick={handlechat}>Chat</a></li>
                            {/* <li><a href="profile.html">Profile</a></li> */}
                        <div class="dropdown">
                            <button class="dropbtn">Profile
                            <i className="fa fa-caret-down"></i>
                            </button>
                            <div className="dropdown-content">
                                <a onClick={handlecurrprofile}>Profile</a>
                                <a onClick={handleprofile}>Edit</a>
                                <a href="/login" onClick={handleLogout}>{islogin?"Log-Out":"Sign-in"}</a>
                            </div>
                        </div>
                    </ul>
                </div>

                {/* {page ===1 &&(
                    
                )} */}
                {/* <div id="mobile">
                    <i className="fasfa-bars"></i> */}
                {/* </div> */}
                <div  className="DATE"></div>
            </nav>
        </>
    )
}



// function Navbar(){
//     return(
        
//     )
// }


export default Navbar;

//cd client