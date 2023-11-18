import React, { useEffect, useState } from "react";
import "./ProfessionalInfo.css";
import axios from "axios";



function ProfessionalInfo({
    
    activepage,
    setactivepage,
    userprof,
    setuserProf
}){
    const count = 1; 
    return(
        <>
        <div className='accountsettings'>
            <h1 className='mainhead1'>Professional Information</h1>
            <div className='form'>

                <div className='form-group1'>
                    <table className="datal">
                        <tr>
                            <th>Qualification</th>
                            <th>University/collage</th>
                            <th>Year</th>
                        </tr>
                        <form action="/userid">
                            <tr>
                                <td><input name={"qname"}/></td>
                                <td><input name={"quni"}/></td>
                                <td><input name={"qyear"}/></td>
                            </tr>
                        </form>
                        {/* {userprof.qualification.map((qual)=>{
                            return(<tr><td> {" "+qual.qname}</td><td>{" "+qual.quni}</td><td> {" "+qual.qyear}</td></tr>)
                        })} */}
                    </table>
                </div>
            </div>
                <button className='mainbutton1'>Button</button>
        </div>
        </>
    )
}

export default ProfessionalInfo