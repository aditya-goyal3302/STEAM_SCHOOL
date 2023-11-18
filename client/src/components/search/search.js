import React, { useState,useEffect } from 'react';
import './search.css'; // Import your CSS file
import Navbar from '../Navbar';
import Footer from '../Footer';
import axios from 'axios';
import MessageRoundedIcon from '@mui/icons-material/MessageRounded';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

const SearchProfile = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [userProfile,setuserProfile] = useState([])
  const userId =["653029068158a55364a1fc73","655731765f57219174022ea3"]
  
  useEffect(()=>{
    const pdata =[{
      _id: "653029068158a55364a1fc73",
      
      city: "Tohana",
      
      dob: "11-07-2002 ",
      
      email: "agdoie3302@gmail.com",
      
      fname: "Aditya",
      
      gender: "Male",
      
      img: "https://lh3.googleusercontent.com/a/ACg8ocJsedZjCImuGsVLKExg_q29u_wFnzj0Hqf3G0iMju_58vQ=s96-c",
      
      lname: "Goyal",
      
      phno: "843584398345",
      
      state: "Haryana",
      
      username: "agdoie"}]
    userId.map(id=>{  
      axios.get("/user/getprofile/"+id)  ///user/getp/cgyzdvxr67t7
      .then(data=>{
        pdata.push(data.data)
        setuserProfile(pdata);
      })
    })
  },[])

  useEffect(() => {
    console.log(userProfile);

  },[userProfile])

  const handleSearch = () => {
    // Perform the search logic here
    const results = userProfile.filter(profile =>
      profile.username.toString().includes(searchQuery)
    );
    setSearchResults(results);
    console.log(results);
  };

  return (
  <>
    <Navbar></Navbar>
    <div className="search-profile-container1">
      <h1 className='searchh1'>Profile Search</h1>
      <div className="search-bar1">
        <input className='search-input1'
          type="text"
          placeholder="Enter profile ID"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className='search-button' onClick={handleSearch}>Search</button>
      </div>

      <div className="search-results">
        <h2>Search Results:</h2>
        {searchResults.length === 0 ? (
          <p>No results found.</p>
        ) : (
          <ul className='search-ul'>
            {
            searchResults.map(profile => (

              <div className="search-profile-container">
                <div className="search-profile">
                  <div className="search-profile-left">
                    <img className='search-profile-pic' src={profile.img} alt="profile-pic" />
                  </div>
                  <div className="search-profile-right">
                    <div className="search-profile-name">{profile.fname +" " + profile.lname}</div>
                    <div className="search-profile-username">{profile.username}</div>
                  </div>
                    <div className="search-profile-buttons">
                      <button className="search-profile-button" onClick={()=>{window.location.href="/chat"}}><MessageRoundedIcon></MessageRoundedIcon></button>
                      <button className="search-profile-button" onClick={()=>{window.location.href="/profile"}}><PersonOutlineIcon></PersonOutlineIcon></button>
                    </div>
                </div>
              </div>
            ))}
          </ul>
        )
      }
      </div>
    </div>
    <Footer></Footer>
    </>
  );
};

export default SearchProfile;

//<div> <img> <div flex col>     <div>{profile.fname+""+profile.lname}</div>      <div flex row> buttons </div>      </div> </div>