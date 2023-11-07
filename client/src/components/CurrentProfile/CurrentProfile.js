import React, { useEffect, useState } from "react";
import './CurrentProfile.css';
import Navbar from "../Navbar";
import Footer from "../Footer";
import final from"./final.jpg"

function CurrentProfile({userId}){
    const [userProfile,setuserProfile] = useState(1)
    const [userprof,setuserProf] = useState(1)

    useEffect(()=>{
        // axios.get("/user/getprofile/userId")  ///user/getp/cgyzdvxr67t7
        // .then(data=>{
        //     setuserProfile(data);
        // })
        // axios.get("/user/getprof/userId")  ///user/getp/cgyzdvxr67t7
        // .then(data=>{
        //     setuserProf(data);
        // })
        const dataprof ={
            qualification: [{qname:"B.Tech",qyear:"2021", quni:"Chitkara University"},{qname:"M.Tech",qyear:"2023",quni:"University of Amsterdam"}],
            skills: [{sname:"C++",slevel:"Intermediate"},{sname:"Python",slevel:"Intermediate"}],
            // userprof.qualifications.map((qual)=>{
            //      <tr><td> qual.qname</td><td> qual.qyear</td></tr>
            // })
            // userprof.skills.map((qual)=>{
            //      <tr><td> qual.sname</td><td> qual.slevel</td></tr>
            // })
        }
        setuserProf(dataprof)
         const data ={
            fname:"Deepak",
            lname: "Airan",
            email: "deepak@gmail.com",
            dob : '1999-12-12',
            gender: "male",
            city: "Hisar",
            state:"Haryana",
            phno:8168601486
        }

        setuserProfile(data)
    },[userProfile,setuserProfile])
    
    return(
        <>
        {/* if login to be implement */}
        <Navbar></Navbar>

        <div className="MAIN">
            <div className="main">
                <div className="left">
                    <h1>Profile Picture</h1>
                    <img src={final} position="relative" width="200px" height="200px" margin ="0px 0px 0px 0px" padding ="0px 0px 0px 0px"></img>
                    
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
                        {userprof.qualification !== undefined &&(
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
                        {userprof.qualification !== undefined &&(
                            <div className="datacontentl">
                                <div className="titlel">Qualifications:</div>
                                <table className="datal">
                                    <tr>
                                        <th>Qualification</th>
                                        <th>Year</th>
                                    </tr>
                                    {userprof.qualification.map((qual)=>{
                                        return(<tr><td> {qual.qname}</td><td> {qual.qyear}</td></tr>)
                                    })}
                                </table>
                            </div>
                        )}
                    </div>
                    {/* <div className="datacontent">
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
                    </div> */}
                    
                </div>
            </div>
        </div>

        <Footer></Footer>
        </>
    )
}

export default CurrentProfile;