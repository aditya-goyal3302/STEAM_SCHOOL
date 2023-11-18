import React from "react";
import "./Main.css";
import Navbar from "../Navbar";
import Footer from "../Footer";
function Main(){    
        return(
            <>
              <Navbar></Navbar>

              <div className="home-page">
                <div className="s-txt"> What's Your Query Today?</div>
                <input className="s-box" placeholder="Write Your Query Here?"/>

              </div>
              



              
              <Footer></Footer>
            </>
        )
    }




export default Main;
 