import React, { useState,useEffect } from 'react';
import './search.css'; // Import your CSS file
import Navbar from '../Navbar';
import Footer from '../Footer';
import axios from 'axios';
import MessageRoundedIcon from '@mui/icons-material/MessageRounded';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import PersonIcon from '@mui/icons-material/Person';

const SearchProfile = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [userProfile,setuserProfile] = useState([])
  const placeholder = "https://steamschool199.s3.ap-south-1.amazonaws.com/placeholderpic.png"
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const searchParam = params.get('search');
    console.log(searchParam);
    if (searchParam!== null ){
        setSearchQuery(searchParam );
        handleSearch();
      }
  }, []);

  const handleSearch = () => {
    if(searchQuery !== "" && searchQuery !== undefined && searchQuery !== null){
      axios.get("/friend/find/"+searchQuery ||" ")  ///user/getp/cgyzdvxr67t7
      .then(data=>{
        console.log(data.data)
        setSearchResults(data.data);
      })
    }
  };

  async function sendmessage(id){
    await axios.get("/chat/newchat/"+id)
    .then(data=>{
        console.log(data.data)
        window.location.href="/chat/?userid="+data.data.id
    })
}

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
          <>
            <p>No results found.</p>
            <ul className='search-ul'></ul>
          </>
          
        ) : (
          <ul className='search-ul'>
            {
            searchResults.map(profile => (

              <div className="search-profile-container">
                <div className="search-profile">
                  <div className="search-profile-left">
                    <img className='search-profile-pic' src={profile.img?profile.img:placeholder} alt="profile-pic" />
                  </div>
                  <div className="search-profile-right">
                    <div className="search-profile-name">{profile.fname +" " + profile.lname}</div>
                    <div className="search-profile-username">{profile.username}</div>
                  </div>
                    <div className="search-profile-buttons">
                      <button className="search-profile-button" onClick={()=>{sendmessage(profile._id)}}><MessageRoundedIcon></MessageRoundedIcon></button>
                      <button className="search-profile-button" onClick={()=>{window.location.href="/profile/?userid="+profile._id}}><PersonOutlineIcon></PersonOutlineIcon></button>
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