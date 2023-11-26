import React, {useEffect,useState} from "react";
import './changepass.css';
import axios from "axios";

function Changepass({
    activepage,
    setactivepage
}){
    const[password,setpassword] = useState({})
    const[error,seterror] = useState({})

    const  inputChange = async (event) => {
        const {name,value} = event.target;
        console.log(name,value);
        const temp = {...password};
        temp[name] = value;
        setpassword(temp)
        console.log(password)
    }

    const onSubmitHandle = (event) => {
        event.preventDefault()
        console.log("SUBMITTING");
        if(password.newpassword === password.confirmpassword){
            axios.post("/user/changepassword",{pass:password})
            console.log("PASSWORD CHANGED");
        }
        else{
            console.log("PASSWORD NOT MATCHED");
        }
    }

    return(
        <>
        <div className='accountsettings'>
            <h1 className='mainhead1'>Change Password</h1>
        
            <form className='form_cp' onSubmit={onSubmitHandle}>
                <div className='form-group'>
                    <label htmlFor='oldpassword'>Old Password<span className="red">*</span></label>
                    <input type='password' name='oldpassword' onChange={e=>inputChange(e)} id='oldpassword'/>
                </div>

                <div className='form-group'>
                    <label htmlFor='newpassword'>New Password<span className="red">*</span></label>
                    <input type='password' name='newpassword' onChange={e=>inputChange(e)} id='newpassword'/>
                </div>

                <div className='form-group'>
                    <label htmlFor='confirmpassword'>Confirm Password<span className="red">*</span></label>
                    <input type='password' name='confirmpassword' onChange={e=>inputChange(e)} id='confirmpassword'/>
                </div>
                
                <button type="submit" className='passbutton1'>Change Password</button>
            </form>
        </div>
        
        </>
    )
}

export default Changepass;