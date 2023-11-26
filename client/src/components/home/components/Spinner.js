import React from 'react';
import "../css/Spinner.css";
import gif from "./Flat-Preloaders.webp";

function Spinner() {
    return (
        <div className='load'>
            <div className="loader-wraper">
                {/* <div className="loader"></div> */}
                <img src={gif} alt="Loading..." className="loader"/>
                <div className="loader-text">Hang On!... Its Comming For You</div>
            </div>
        </div>
    )
}

export default Spinner;