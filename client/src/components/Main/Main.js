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
            {/* <div className="home-page">
              <div className="background-image"></div>
              <div className="search-container">
                <h1>Welcome to our Education Portal</h1>
                
                <input className="in" type="text" placeholder="Search for courses..." />
                <br></br>
                <button className="btn">Search</button>
              </div>
            </div> */}
            {/* <div>
                <h1>hello</h1>
            </div> */}



             
            <Footer></Footer>
            </>
        )
    }




export default Main;
 