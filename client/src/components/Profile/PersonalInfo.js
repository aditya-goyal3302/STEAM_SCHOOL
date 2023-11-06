import React, { useState } from 'react';
import "./AccountSettings.css";

function PersonalInfo({
    activepage,
    setactivepage
}){

    return(
        <>
        <div className='accountsettings'>
            <h1 className='mainhead1'>Personal Information</h1>
            <div className='form'>
                <div className='form-group'>
                    <label htmlFor='name'>Your Name<span>*</span></label>
                    <input type='text' name='fname' id='name'/>
                </div>

                <div className='form-group'>
                    <label htmlFor='phone'>Phone/Mobile No.<span>*</span></label>
                    <input type='text' name='Phone' id='Phone'/>
                </div>

                <div className='form-group'>
                    <label htmlFor='email'>E-mail<span>*</span></label>
                    <input type='email' name='email' id='email'/>
                </div>
                
            </div>
                <button className='mainbutton1'>Button</button>
        </div>
        </>
    )
}

export default PersonalInfo