import React, { useEffect, useState } from "react";
import "./ProfessionalInfo.css";
import axios from "axios";
import AddIcon from '@mui/icons-material/Add';


function ProfessionalInfo({
    userprof,
    setuserProf
}){
    const [countQ,setcountQ] = useState([]); 
    const[Qual,setQual] = useState([{qname:"BCA",quni:"Chitkara",qyear:"2024"}])

    const increment = () => { 
        if(countQ.length == 0){
            setcountQ([1]);
            console.log(countQ);
            return;
        }
        if(Qual[countQ.length-1].qname != "" && Qual[countQ.length-1].quni != "" && Qual[countQ.length-1].qyear != ""){
            setQual([...Qual,{qname:"",quni:"",qyear:""}]);
            console.log(countQ);
            setcountQ([...countQ,1]);
        }
    }

    const inputChange = async (event,rowIndex) => {
        const {name,value} = event.target;
        console.log(name,value,rowIndex);
        // const temp = {...newUserData};
        // temp[name] = value;
        // setnewUserData(temp)
        // console.log(newUserData)
    }

//onClick={increment}
    return(
        <div className="box-2">
            <div className="app">
                <div className="datacontentl">
                    <div className="titlel">
                        <div className="titlel-textl">Qualification:</div> 
                        <div className="title-btn">
                            <button className="add-button" onClick={increment}><AddIcon/></button>
                        </div>
                    </div>
                    <form className="form-table">
                    <table className="dynamic-table datal">
                        <tbody>
                        <tr>
                            <th>Qualification</th>
                            <th>University/collage</th>
                            <th>Year</th>
                        </tr>
                            {countQ.map((data, rowIndex) => (
                            <tr key={rowIndex}>
                                <td><input name="Qname" value={Qual[rowIndex].qname !== undefined ? Qual[rowIndex].qname : ""} onChange={(e,rowIndex)=>inputChange(e,rowIndex)}></input></td>
                                <td><input name="Quni" value={Qual[rowIndex].quni !== undefined ? Qual[rowIndex].quni : ""}></input></td>
                                <td><input name="Qyear" value={Qual[rowIndex].qyear !== undefined ? Qual[rowIndex].qyear : ""}></input></td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                    </form>
                </div>
            </div>
        {/* <div className='accountsettings'>
            <h1 className='mainhead1'>Professional Information</h1>
            <div className='form'>
                <div className='form-group1'>
                    <table className="datal">
                        <tr>
                            <th>Qualification</th>
                            <th>University/collage</th>
                            <th>Year</th>
                        </tr>
                        <form action="/userid">
                            <tr>
                                <td><input name={"qname"}/></td>
                                <td><input name={"quni"}/></td>
                                <td><input name={"qyear"}/></td>
                            </tr>
                        </form>
                        
                    </table>
                </div>
            </div>
                <button className='mainbutton1'>Button</button>
        </div> */}
        </div>
    )
}




export default ProfessionalInfo