import React, { useEffect, useState } from "react";
import './CurrentProfile.css';
import Navbar from "../Navbar";
import Footer from "../Footer";
import final from"./final.jpg";
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import MessageRoundedIcon from '@mui/icons-material/MessageRounded';
import axios from "axios";
import Spinner from "../home/components/Spinner";
import Test from "../../resources/test/test";

function CurrentProfile(){
    const [userProfile,setuserProfile] = useState(1)
    const [userprof,setuserProf] = useState(1)
    const [loader,setloader] = useState(1)
    const [isadmin,setisadmin] = useState(1)
    const queryParameters = new URLSearchParams(window.location.search)
    const user = queryParameters.get("userid")
    const [userId,setuserId]=useState(user?user:"self")
    const [isclicked,setisclicked] = useState(0)
    const [url,seturl] = useState("")

    useEffect(()=>{
        axios.get("/getadmin/"+userProfile._id)
        .then(data=>{
            console.log("hi",data.data);
            setisadmin(data.data.isadmin)
        })
    },[userProfile])

    useEffect(()=>{
        axios.get("/user/getprofile/"+userId) 
        .then(data=>{
            if(data.data.code === 101){
                window.location.href="/login"
                return;
            }
            console.log(data.data);
            setuserProfile(data.data);
        }).catch(err=>{
            // setislogin(0);
        })

        axios.get("/user/getprof/"+userId)  
        .then(data=>{
            setuserProf(data.data);
            setloader(0);
        })
    },[userId])

    function sendmessage(){
        axios.get("/chat/newchat/"+userId)
        .then(data=>{
            console.log(data.data)
            window.location.href="/chat/?userid="+userId
        })
    }
    useEffect(()=>{
        if(url !== ""){
            axios.post("/user/updateimg",{
                url:url
            }).then(data=>{
                console.log(data.data);
                window.location.reload();
            })
            console.log(url);
        }
    },[url])
 
    return(

        loader === 0 ? (
        <>
        {/* if login to be implement */}
        <Navbar></Navbar>

        <div className="MAIN">
            <div className="main">
                <div className="left">
                    <h1>Profile Picture</h1>
                    <img src={userProfile.img === "" ? final:userProfile.img} position="relative" width="200px" height="200px" margin ="0px 0px 0px 0px" padding ="0px 0px 0px 0px"></img>
                    {isadmin === 1 ? (
                    <>
                        <button 
                            className="btn " 
                            onClick={()=>{setisclicked(1)}}>
                            <div className="btntxt">
                                Change Profile Picture
                            </div> 
                            <div className="btnimg">
                                <EditRoundedIcon>  </EditRoundedIcon>
                            </div>
                        </button>
                        <button 
                            className="btn "
                            onClick={()=>{window.location.href="/editprofile/?page=changepass"}}>
                            <div className="btntxt">
                                Change Password
                            </div> 
                            <div className="btnimg">
                                <EditRoundedIcon>  </EditRoundedIcon>
                            </div>
                        </button>
                        <button 
                            className="btn "
                            onClick={()=>{window.location.href="/editprofile/?page=PersonalInfo"}}>
                            <div className="btntxt">
                                Edit Profile
                            </div> 
                            <div className="btnimg">
                                <EditRoundedIcon> </EditRoundedIcon>
                            </div>
                        </button>
                        {/* <button 
                            className="btn delbtn"
                            onClick={deleteprofile}>
                            <div className="btntxt">
                                Delete Profile
                            </div>
                            <div className="btnimg">
                                <DeleteOutlineRoundedIcon>  </DeleteOutlineRoundedIcon>
                            </div>
                        </button> */}

                        {isclicked === 1 &&(<div style={{display:"none"}}>
                            <Test 
                                new_url={url}
                                setnew_url={seturl}
                                settextboxstate={setisclicked}
                                textboxstate={isclicked}
                            >
                            </Test>
                        </div>)}
                    </>    
                    ):(
                        <>
                            <button 
                                className="btn "
                                onClick={sendmessage}>
                                <div className="btntxt">
                                    Send Message
                                </div> 
                                <div className="btnimg">
                                    <MessageRoundedIcon>  </MessageRoundedIcon>
                                </div>
                            </button>
                            
                        </>
                    )}
                </div>



                <div className="right">
                    <div className="r1">
                        {/* <h1>Personal Information</h1> */}
                        <div className="datacontent">
                            <div className="title">First Name: </div>
                            <pre className="data">{" "+userProfile.fname}</pre>
                        </div>
                        <div className="datacontent">
                            <div className="title">Last Name:</div>
                            <pre className="data">{" "+userProfile.lname}</pre>
                        </div>
                        <div className="datacontent">
                            <div className="title">E-mail:</div>
                            <pre className="data">{" "+userProfile.email}</pre>
                        </div>
                        <div className="datacontent">
                            <div className="title">Phone No.:</div>
                            <pre className="data">{" "+userProfile.phno}</pre>
                        </div>
                        <div className="datacontent">
                            <div className="title">Date Of Birth:</div>
                            <pre className="data">{" "+userProfile.dob}</pre>
                        </div>
                        <div className="datacontent">
                            <div className="title">Gender:</div>
                            <pre className="data">{" "+userProfile.gender}</pre>
                        </div>
                        <div className="datacontent">
                            <div className="title">City:</div>
                            <pre className="data">{" "+userProfile.city}</pre>
                        </div>
                        <div className="datacontent">
                            <div className="title">State:</div>
                            <pre className="data">{" "+userProfile.state}</pre>
                        </div>
                    </div>
                    <div className="r2">
                        {userprof.qualification?.qname &&(
                            <pre className="datacontentl">
                                <div className="titlel">Qualifications:</div>
                                <table className="datal">
                                    <tr>
                                        <th>Qualification</th>
                                        <th>University/collage</th>
                                        <th>Year</th>
                                    </tr>
                                    {userprof.qualification.map((qual)=>{
                                        return(<tr><td> {" "+qual.qname}</td><td>{" "+qual.quni}</td><td> {" "+qual.qyear}</td></tr>)
                                    })}
                                </table>
                            </pre>
                        )}
                        {userprof.skills?.sname &&(
                            <pre className="datacontentl">
                                <div className="titlel">Skills:</div>
                                <table className="datal">
                                    <tr>
                                        <th>Skills Name</th>
                                        <th>Skill Level</th>
                                    </tr>
                                    {userprof.skills.map((qual)=>{
                                        return(<tr><td> {" "+qual.sname}</td><td> {" "+qual.slevel}</td></tr>)
                                    })}
                                </table>
                            </pre>
                        )}
                    </div>
                </div>
            </div>
        </div>

        <Footer></Footer>
        </>
        ):(
            <><Spinner/></>
        )
    )
}

export default CurrentProfile;