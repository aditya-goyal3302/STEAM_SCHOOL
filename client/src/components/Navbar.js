import React, { useState } from 'react';
import "./NavbarStyles.css";
import logo from "./Logo.png" 
import axios from "axios";


function Navbar() {
    // const[page,setpage] = useState(1)
    function change1(e){
        e.preventDefault();
        window.location.href = "/"
        // setpage(1);

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
                <div className="Img"><a href=""><img src={logo} position = "relative" width="250px" margin ="0px 0px 0px 0px" padding ="0px 0px 0px 0px"/></a>
                </div>
                <div className="nav-items">
                    <ul id="navbar">
                            {/* <li><Link><i></i>Home</Link></li> */}
                            
                            <li><a 
                                onClick={change1} 
                                className={""}
                                >
                                    Home
                                </a>
                            </li>
                            <li><a href="/about">About</a></li>
                            <li><a href="/chat">Chat</a></li>
                            {/* <li><a href="profile.html">Profile</a></li> */}
                        <div class="dropdown">
                            <button class="dropbtn">Profile
                            <i className="fa fa-caret-down"></i>
                            </button>
                            <div className="dropdown-content">
                                <a href="/CurrentProfile">Profile</a>
                                <a href="/profile">Edit</a>
                                <a href="/login" onClick={handleLogout}>Log-Out</a>
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