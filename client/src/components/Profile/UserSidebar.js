import React, { useEffect, useState } from 'react';
import './UserSidebar.css'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import PasswordIcon from '@mui/icons-material/Password';
import axios from 'axios';
// import { colors } from '@mui/material';

const UserSidebar =({
    activepage,
    setactivepage
}) => {
    function changetoaccount(){
        setactivepage("PersonalInfo")
    }
    
    function changetopaccount(){
        setactivepage("ProfessionalInfo")
    }
    function deleteprofile(){
        axios.post("/user/deleteprofile")
        window.location.href="/login"
    }
    function changetochangepass(){
        setactivepage("changepass")
    }

    useEffect(()=>{
        console.log("hii",activepage)
    })
    return(
        <div className='usersidebar'>{
            <div className={activepage === 'PersonalInfo'?'s2':'s1'} onClick={changetoaccount}>
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
                </svg>

                <span>Personal Information</span>
            </div>
        }

        {
            <div className={activepage === 'ProfessionalInfo'?'s2':'s1'} onClick={changetopaccount}>
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
                </svg>

                <span>Professional Information</span>
            </div>
        }
        
        {
            <div className={activepage === 'changepass'?'s2':'s1'} onClick={changetochangepass}>
                <PasswordIcon className='cngpass'></PasswordIcon>   
                <span>Change Password</span>
            </div>
        }
        {
            <div className={activepage === 'logout'?'s2 redb':'s1 redb'} onClick={deleteprofile}>
                <DeleteForeverIcon className='red'></DeleteForeverIcon>
                <span>Delete Account</span>
            </div>
        }
        </div>
    )
}


export default UserSidebar