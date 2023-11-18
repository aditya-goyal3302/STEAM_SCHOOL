import React, { useEffect, useState } from "react";
import "./AccountSettings.css";
import axios from "axios";

function PersonalInfo({
    activepage,
    setactivepage,
    setuserProfile,
    userProfile
}){
    

    return(
        <>
        <div className='accountsettings'>
            <h1 className='mainhead1'>Personal Information</h1>
            <div className='form'>
                <div className='form-group'>
                    <label htmlFor='name'>Your Name<span>*</span></label>
                    <input type='text' name='fname' id='fname'/>
                </div>

                <div className='form-group'>
                    <label htmlFor='name'>Last Name<span>*</span></label>
                    <input type='text' name='lname' id='lname'/>
                </div>

                <div className='form-group'>
                    <label htmlFor='email'>E-mail<span>*</span></label>
                    <input type='email' name='email' id='email'/>
                </div>

                <div className='form-group'>
                    <label htmlFor='phone'>Phone/Mobile No.<span>*</span></label>
                    <input type='text' name='Phone' id='Phone'/>
                </div>

                <div className='form-group'>
                    <label htmlFor='dob'>Date of Birth<span>*</span></label>
                    <input type='date' name='date' id='date'/>
                </div>

                <div className='form-group'>
                    <label htmlFor='phone'>Gender<span>*</span></label>
                    <select  htmlFor='gender' name="gender" id="gender">
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                

                <div className='form-group'>
                    <label htmlFor='city'>City<span>*</span></label>
                    <input type='text' name='city' id='city'/>
                </div>

                <div className='form-group'>
                    <label htmlFor='state'>State<span>*</span></label>
                    <input type='text' name='state' id='state'/>
                </div>
            </div>
                <button className='mainbutton1'>Button</button>
        </div>
        </>
    )
}

export default PersonalInfo