import React, { useState } from 'react';
import "./NavbarStyles.css";
import logo from "./Logo.png" 

function Navbar() {
    const[page,setpage] = useState(1)
    function change1(e){
        e.preventDefault();
        setpage(1);

    }
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
                                className={page ===1 ?"active":""}
                                >
                                    Home
                                </a>
                            </li>
                            <li><a href="/about">About</a></li>
                            <li><a href="/main">Chat</a></li>
                            {/* <li><a href="profile.html">Profile</a></li> */}
                        <div class="dropdown">
                            <button class="dropbtn">Profile
                            <i className="fa fa-caret-down"></i>
                            </button>
                            <div className="dropdown-content">
                                <a href="/CurrentProfile">Profile</a>
                                <a href="/profile">Edit</a>
                                <a href="#">Log-Out</a>
                            </div>
                        </div>
                    </ul>
                </div>

                {/* {page ===1 &&(
                    
                )} */}
                {/* <div id="mobile">
                    <i className="fasfa-bars"></i> */}
                {/* </div> */}
                <div  className="DATE">date and time</div>
            </nav>
        </>
    )
}



// function Navbar(){
//     return(
        
//     )
// }


export default Navbar;