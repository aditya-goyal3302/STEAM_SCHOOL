import React, { useEffect, useState } from 'react';
import "./Profile.css";
import Navbar from '../Navbar.js';
import Footer from '../Footer.js';
import UserSidebar from './UserSidebar.js'
import PersonalInfo from './PersonalInfo.js'
// import Logout from './Logout.js'
import Changepass from './changepass.js';
import ProfessionalInfo from './ProfessionalInfo.js';
import axios from 'axios';
import Spinner from '../home/components/Spinner.js';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

function Profile(){    
  const [activepage,setactivepage]= useState('PersonalInfo');
  const [userProfile,setuserProfile] = useState({})
  const [islogin,setislogin] = useState(1)
  const [userprof,setuserProf] = useState({})
  const [isloading,setisloading] = useState(1)
  // useEffect(()=>{
  //   setactivepage('accountsettings');
  // })
  useEffect(()=>{
    const perams = new URLSearchParams(window.location.search);
    const page = perams.get("page");
    console.log(page);
    page !== null || page === undefined? setactivepage(page) : setactivepage('PersonalInfo');
  },[ new URLSearchParams(window.location.search).get("page") ])
  useEffect(()=>{
      axios.get("/user/geteditprofile/")  
      .then(data=>{
          // console.log(data.data);
          setuserProfile(data.data);
          setisloading(0);
      })
  },[])

  useEffect(()=>{

      axios.get("/user/geteditprof/") 
      .then(data=>{
          // console.log(data.data);
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
    {/* {islogin === 1 ? ( */}
      {isloading == 1  ? ( <Spinner></Spinner>):(
        
        <div className='userprofile'>
        <Navbar></Navbar>
      <div className='mobileview'>
        <button className='closebtn' id='closebtn'
        onClick={()=>{
          document.getElementById('mbtn').style.display='block';
          // document.getElementById('mbtn').style.animation="fadeIn 1s"
          document.getElementById('closebtn').style.display='none';
          // document.getElementById('left').style.animation="0.5s ease-out 0.5s 1 slideOutFromLeft"
          document.getElementById('left').style.display='none';
          document.getElementById('right').style.display='block';
          

      }}
        ><CloseIcon/></button>
        <button className='mbtn' id='mbtn'
        onClick={()=>{ 
          document.getElementById('closebtn').style.display='block';
          document.getElementById('mbtn').style.display='none';
          document.getElementById('left').style.display='block';
          document.getElementById('right').style.display='none';

        }}
        ><MenuIcon/></button>
      </div>
        <div className= 'userprofilein' >
          <div className='left' id='left'>
            <UserSidebar 
              activepage={activepage} 
              setactivepage={setactivepage}/>
          </div>
          
          <div className= 'right' id='right'>
            
            {activepage==='PersonalInfo' && (<PersonalInfo 
              userProfile={userProfile}
              setuserProfile={setuserProfile}
              isloading={isloading}
              setisloading={setisloading}
              />)}
            
            {activepage==='ProfessionalInfo' && (<ProfessionalInfo 
             userprof={userprof}
              setuserProf={setuserProf}
              isloading={isloading}
              setisloading={setisloading}
              />)}
            
            {activepage==='logout' &&(logout) }
            
            {activepage==='changepass' && <Changepass 
              activepage={activepage} 
              setactivepage={setactivepage}
              isloading={isloading}
              setisloading={setisloading}/>}
          </div>
        </div>


        
        <Footer></Footer>
        </div>
        
        )}
        {/* ):(window.location.href = "/login")} */}
        </>
      
    )
}


export default Profile;