import React, { useEffect, useState } from "react";
import "./ProfessionalInfo.css";
import axios from "axios";
import AddIcon from '@mui/icons-material/Add';


function ProfessionalInfo({
    userprof,
    setuserProf
}){
    const [countQ,setcountQ] = useState([]); 
    const [countS,setcountS] = useState([]);
    const [countE,setcountE] = useState([]);
    const[Qual,setQual] = useState([{qname:"BCA",quni:"Chitkara",qyear:"2024"}])
    const[Skill,setSkill] = useState([{sname:"React",slevel:"Intermediate"}])
    const[exp,setexp] = useState([{etitle:"Intern",ename:"Google",eyear:"2021"}])

    useEffect(() => { 

     })

    const incrementQ = () => { 
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
    const incrementS = () => { 
        if(countS.length == 0){
            setcountS([1]);
            // console.log(countQ);
            return;
        }
        if(Skill[countS.length-1].sname != "" && Skill[countS.length-1].slevel != ""){ 
            setSkill([...Skill,{sname:"",slevel:""}]);
            // console.log(countQ);
            setcountS([...countS,1]);
        }


    }
    const incrementE = () => { 
        if(countE.length == 0){
            setcountE([1]);
            // console.log(countQ);
            return;
        }
        if(exp[countE.length-1].etitle != "" && exp[countE.length-1].ename != "" && exp[countE.length-1].eyear != ""){
            setexp([...exp,{etitle:"",ename:"",eyear:""}]);
            // console.log(countQ);
            setcountE([...countE,1]);
        }
    }

    const inputChange = async (event,rowIndex) => {
        const {name,value,className} = event.target;
        // console.log(name,value,className);
        setQual(Qual.map((data,index) => {
            if(index == className){
                return {...data,[name]:value}
            }
            return data;
        }))
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
                            <button className="add-button" onClick={incrementQ}><AddIcon/></button>
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
                                <td><input className={rowIndex} name="qname" value={Qual[rowIndex].qname !== undefined ? Qual[rowIndex].qname : ""} onChange={(e,rowIndex)=>inputChange(e)}></input></td>
                                <td><input className={rowIndex} name="quni" value={Qual[rowIndex].quni !== undefined ? Qual[rowIndex].quni : ""} onChange={(e,rowIndex)=>inputChange(e)}></input></td>
                                <td><input className={rowIndex} name="qyear" value={Qual[rowIndex].qyear !== undefined ? Qual[rowIndex].qyear : ""} onChange={(e,rowIndex)=>inputChange(e)}></input></td>
                            </tr>
                            ))}
                        </tbody>
                    </table> 
                    </form>
                </div>
                <div className="datacontentl">
                    <div className="titlel">
                        <div className="titlel-textl">Skills:</div> 
                        <div className="title-btn">
                            <button className="add-button" onClick={incrementS}><AddIcon/></button>
                        </div>
                    </div>
                    <form className="form-table">
                    <table className="dynamic-table datal">
                        <tbody>
                        <tr>
                            <th>Skills</th>
                            <th>Level</th>
                        </tr>
                            {countS.map((data, rowIndex) => (
                            <tr key={rowIndex}>
                                <td><input name="sname" value={Skill[rowIndex].sname !== undefined ? Skill[rowIndex].sname : ""} onChange={(e)=>inputChange(e)}></input></td>
                                <td><input name="slevel" value={Skill[rowIndex].slevel !== undefined ? Skill[rowIndex].slevel : ""}></input></td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                    </form>
                </div>
                <div className="datacontentl">
                    <div className="titlel">
                        <div className="titlel-textl">Experince:</div> 
                        <div className="title-btn">
                            <button className="add-button" onClick={incrementE}><AddIcon/></button>
                        </div>
                    </div>
                    <form className="form-table">
                    <table className="dynamic-table datal">
                        <tbody>
                        <tr>
                            <th>Title</th>
                            <th>Company Name</th>
                            <th>Year</th>
                        </tr>
                            {countE.map((data, rowIndex) => (
                            <tr key={rowIndex}>
                                <td><input name="etitle" value={exp[rowIndex].etitle !== undefined ? exp[rowIndex].etitle : ""} onChange={(e)=>inputChange(e)}></input></td>
                                <td><input name="ename" value={exp[rowIndex].ename !== undefined ? exp[rowIndex].ename : ""}></input></td>
                                <td><input name="eyear" value={exp[rowIndex].eyear !== undefined ? exp[rowIndex].eyear : ""}></input></td>
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