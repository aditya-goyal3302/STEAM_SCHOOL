import React, { useEffect, useState } from 'react';
import "./Profile.css";
import Navbar from '../Navbar';
import Footer from '../Footer';
import UserSidebar from './UserSidebar'
import PersonalInfo from './PersonalInfo.js'
// import Logout from './Logout.js'
import Changepass from './changepass.js';
import ProfessionalInfo from './ProfessionalInfo.js';
import axios from 'axios';

function Profile(){    
  const [activepage,setactivepage]= useState('PersonalInfo');
  const [userProfile,setuserProfile] = useState({})
  const [islogin,setislogin] = useState(1)
  const [userprof,setuserProf] = useState({})
  // useEffect(()=>{
  //   setactivepage('accountsettings');
  // })

  useEffect(()=>{
      axios.get("/user/geteditprofile/")  
      .then(data=>{
          console.log(data.data);
          setuserProfile(data.data);
      })
  },[])

  useEffect(()=>{

      axios.get("/user/geteditprof/") 
      .then(data=>{
          console.log(data.data);
          setuserProf(data.data);
      })
  },[])
 
function logout(){
  console.log("REQUESTED LOGOUT");
  setislogin(0)
  localStorage.removeItem("user");
  localStorage.removeItem("chats");
  localStorage.removeItem("messages");
  localStorage.removeItem("contacts");
  axios.delete("/user/logout").catch((err) => console.log(err));
  window.location.href = "/login";
}

  
return (
  <>
    {islogin === 1 ? (
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
              userProfile={userProfile}
              setuserProfile={setuserProfile}
              />)}
            
            {activepage==='ProfessionalInfo' && (<ProfessionalInfo 
             userprof={userprof}
              setuserProf={setuserProf}
              />)}
            
            {activepage==='logout' &&(logout) }
            
            {activepage==='changepass' && <Changepass 
              activepage={activepage} 
              setactivepage={setactivepage}/>}
          </div>
        </div>


        
        <Footer></Footer>
        </div>
        ):""
      }
    </>);
}


export default Profile;