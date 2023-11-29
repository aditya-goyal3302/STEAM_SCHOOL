import React, { useEffect, useState } from "react";
import "./AccountSettings.css";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



function PersonalInfo({
    setuserProfile,
    userProfile,
    setisloading,
    isLoading,
}){
    const [dob,setdob] = useState(new Date()) 
    const [newUserData,setnewUserData] = useState({})
    useEffect(()=>{
        setnewUserData(userProfile)
    },[userProfile])
    useEffect(async ()=>{
        if(newUserData !== null){
            reverseDate(userProfile.dob);
            setisloading(0)

        }
        // setdob(userProfile.dob);
    },[userProfile])
    const reverseDate = (d) => {
        if(d){
            let t = d.split("-");
            let day = t[0];
            let month = t[1]
            let year = t[2];
            let date = new Date(year,month-1,day);
            // console.log(date," is date");
            setdob(date);
        }
    }   
    const normaldate = (d) => {
        setdob(d);
        if(d){
            let date = new Date(d);
            let day = date.getDate();
            let month = date.getMonth()+1;
            let year = date.getFullYear();
            let newdate = day+"-"+month+"-"+year;
            setnewUserData({...newUserData,dob:newdate});
            // return day+"/"+month+"/"+year;
        }
    }

    const inputChange = async (event) => {
        const {name,value} = event.target;
        // console.log(name,value);
        const temp = {...newUserData};
        temp[name] = value;
        setnewUserData(temp)
        // console.log(newUserData)
    }

    const onSubmitHandle = (event) => {
        // event.preventDefault()
        console.log("SUBMITTING");
        axios.post("/user/updateprofile",{profile:newUserData})
        window.location.href = "/editprofile/?page=?page=PersonalInfo";
    }
//  onChange={e=>inputChange(e)}
    return(
       
            <>
            <div className='accountsettings'>
                <h1 className='mainhead1'>Personal Information</h1>
                <form className='formper' onSubmit={onSubmitHandle}>
                    <div className='form-group'>
                        <label htmlFor='name'>Your Name<span className="red">*</span></label>
                        <input required type='text' name='fname' id='fname' onChange={e=>inputChange(e)} value={newUserData?.fname}/>
                    </div>
    
                    <div className='form-group'>
                        <label htmlFor='name'>Last Name<span className="red">*</span></label>
                        <input required type='text' name='lname' id='lname' onChange={e=>inputChange(e)} value={newUserData?.lname}/>
                    </div>
    
                    <div className='form-group'>
                        <label htmlFor='username'>Username<span className="red">*</span></label>
                        <input required type='text' name='username' id='username' onChange={e=>inputChange(e)} value={newUserData?.username}/>
                    </div>
    
                    <div className='form-group'>
                        <label htmlFor='phone'>Phone No.<span className="red">*</span></label>
                        <input required type='text' name='phno' id='phno' onChange={e=>inputChange(e)} value={newUserData?.phno}/>
                    </div>
    
                    <div className='form-group'>
                        <label htmlFor='dob'>Date of Birth<span className="red">*</span></label>
                        <DatePicker  required closeOnScroll={true} showIcon selected={dob} onChange={date=>{normaldate(date)}} dateFormat="dd/MM/yyyy" className="calender"/>
                        {/* <input type='date' name='date' id='date' value={newUserData.dob !==""?userProfile.dob:"01-01-2000"} /> */}
                    </div>
    
                    <div className='form-group'>
                        <label htmlFor='phone'>Gender<span className="red">*</span></label>
                        <select required  htmlFor='gender' name="gender" id="gender" onChange={e=>inputChange(e)} value={newUserData?.gender?newUserData.gender:"Other"}>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other" selected>Rather Not Say</option>
                        </select>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='city'>City<span className="red">*</span></label>
                        <input required type='text' name='city' id='city' onChange={e=>inputChange(e)} value={newUserData?.city}/>
                    </div>
    
                    <div className='form-group'>
                        <label htmlFor='state'>State<span className="red">*</span></label>
                        <input required type='text' name='state' id='state' onChange={e=>inputChange(e)} value={newUserData?.state}/>
                    </div>
                    <button type="submit" className='mainbutton1' >Save Changes</button>
                </form>
            </div>
            </>

    )
}

export default PersonalInfo