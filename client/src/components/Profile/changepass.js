import React from "react";
import './changepass.css';

function Changepass({
    activepage,
    setactivepage
}){
    return(
        <>
        <div className='accountsettings'>
            <h1 className='mainhead1'>Change Password</h1>

            <div className='form'>
                <div className='form-group'>
                    <label htmlFor='oldpassword'>Old Password<span>*</span></label>
                    <input type='password' name='oldpassword' id='oldpassword'/>
                </div>

                <div className='form-group'>
                    <label htmlFor='newpassword'>New Password<span>*</span></label>
                    <input type='newpassword' name='newpassword' id='newpassword'/>
                </div>

                <div className='form-group'>
                    <label htmlFor='newpassword'>Confirm Password<span>*</span></label>
                    <input type='newpassword' name='newpassword' id='newpassword'/>
                </div>
                
            </div>
                <button className='mainbutton1'>Button</button>
        </div>
        
        </>
    )
}

export default Changepass;