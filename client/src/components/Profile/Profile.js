import React, { useEffect, useState } from 'react';
import "./Profile.css";
import Navbar from '../Navbar';
import Footer from '../Footer';
import UserSidebar from './UserSidebar'
import PersonalInfo from './PersonalInfo.js'
import Logout from './Logout.js'
import Changepass from './changepass.js';
import ProfessionalInfo from './ProfessionalInfo.js';

function Profile(){    
  const [activepage,setactivepage]= useState('PersonalInfo');
  // useEffect(()=>{
  //   setactivepage('accountsettings');
  // })
return (
      <div className='userprofile'>
      <Navbar></Navbar>
      
      <div className= 'userprofilein' >
        <div className='left'>
          <UserSidebar 
            activepage={activepage} 
            setactivepage={setactivepage}/>
        </div>
        <div className= 'right'>
          
          {activepage==='PersonalInfo' && (<PersonalInfo 
            activepage={activepage} 
            setactivepage={setactivepage}/>)}
          
          {activepage==='ProfessionalInfo' && (<ProfessionalInfo 
            activepage={activepage} 
            setactivepage={setactivepage}/>)}
          
          {activepage==='logout' && <Logout 
            activepage={activepage} 
            setactivepage={setactivepage}/>}
          
          {activepage==='changepass' && <Changepass 
            activepage={activepage} 
            setactivepage={setactivepage}/>}
        </div>
      </div>


      
      <Footer></Footer>
      </div>
    );
}


export default Profile;