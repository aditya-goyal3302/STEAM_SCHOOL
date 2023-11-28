import React, { useEffect, useState } from "react";
import "./ProfessionalInfo.css";
import axios from "axios";
import AddIcon from '@mui/icons-material/Add';
import Spinner from "../home/components/Spinner";

function ProfessionalInfo({
    userprof,
    setuserProf,
    setisloading,
    isLoading,
}){
    const[Qual,setQual] = useState([])
    const[Skill,setSkill] = useState([])
    const[exp,setexp] = useState([])
    const [loading, setLoading] = useState(false);  
    // const [countQ,setcountQ] = useState([]); 
    // const [countS,setcountS] = useState([]);
    // const [countE,setcountE] = useState([]);
    
    useEffect(() => { 
        if(userprof !== null){
            console.log(userprof);
            setQual(userprof.qualifications);
            setSkill(userprof.skills);
            setexp(userprof.Exp);
            setisloading(0);
        }
    },[userprof])

    const incrementQ = () => { 
        console.log(Qual);
        try{
            if(Qual === undefined){
                setQual([{qname:"",quni:"",qyear:""}])
            }
            else if(Qual[Qual.length-1]?.qname && Qual[Qual.length-1]?.quni && Qual[Qual.length-1]?.qyear){
                setQual([...Qual,{qname:"",quni:"",qyear:""}]);
            }
        }
        catch(err){
            console.log(err);
        }
    }
    const incrementS = () => { 
        if(Skill === undefined){
            setSkill([{sname:"",slevel:""}])
        }
        else if(Skill[Skill.length-1]?.sname != "" && Skill[Skill.length-1]?.slevel != ""){ 
            setSkill([...Skill,{sname:"",slevel:""}]);
            
        }
    }
    const incrementE = () => {
        if(exp === undefined){
            setexp([{etitle:"",ename:"",eyear:""}])
        } 
        else if(exp[exp.length-1]?.etitle != "" && exp[exp.length-1]?.ename != "" && exp[exp.length-1]?.eyear != ""){
            setexp([...exp,{etitle:"",ename:"",eyear:""}]);
        }
    }

    const inputChangeQ = async (event,rowIndex) => {
        const {name,value,className} = event.target;
        setQual(Qual.map((data,index) => {
            if(index == className){
                return {...data,[name]:value}
            }
            return data;
        }))
    }
    const inputChangeS = async (event,rowIndex) => {
        const {name,value,className} = event.target;
        setSkill(Skill.map((data,index) => {
            if(index == className){
                return {...data,[name]:value}
            }
            return data;
        }))
    }
    const inputChangeE = async (event,rowIndex) => {
        const {name,value,className} = event.target;
        setexp(exp.map((data,index) => {
            if(index == className){
                return {...data,[name]:value}
            }
            return data;
        }))
    }
//onClick={increment}
    return(
        loading === true ? (<Spinner/>) : (
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
                            {Qual?.map((data, rowIndex) => (
                            <tr key={rowIndex}>
                                <td><input className={rowIndex} name="qname" value={Qual[rowIndex]?.qname !== undefined ? Qual[rowIndex].qname : ""} onChange={(e)=>inputChangeQ(e)}></input></td>
                                <td><input className={rowIndex} name="quni" value={Qual[rowIndex]?.quni !== undefined ? Qual[rowIndex].quni : ""} onChange={(e)=>inputChangeQ(e)}></input></td>
                                <td><input className={rowIndex} name="qyear" value={Qual[rowIndex]?.qyear !== undefined ? Qual[rowIndex].qyear : ""} onChange={(e)=>inputChangeQ(e)}></input></td>
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
                            {Skill?.map((data, rowIndex) => (
                            <tr key={rowIndex}>
                                <td><input className={rowIndex} name="sname" value={Skill[rowIndex]?.sname !== undefined ? Skill[rowIndex].sname : ""} onChange={(e)=>inputChangeS(e)}></input></td>
                                <td><input className={rowIndex} name="slevel" value={Skill[rowIndex]?.slevel !== undefined ? Skill[rowIndex].slevel : ""} onChange={(e)=>inputChangeS(e)}></input></td>
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
                            {exp?.map((data, rowIndex) => (
                            <tr key={rowIndex}>
                                <td><input className={rowIndex} name="etitle" value={exp[rowIndex]?.etitle !== undefined ? exp[rowIndex].etitle : ""} onChange={(e)=>inputChangeE(e)}></input></td>
                                <td><input className={rowIndex} name="ename" value={exp[rowIndex]?.ename !== undefined ? exp[rowIndex].ename : ""} onChange={(e)=>inputChangeE(e)}></input></td>
                                <td><input className={rowIndex} name="eyear" value={exp[rowIndex]?.eyear !== undefined ? exp[rowIndex].eyear : ""} onChange={(e)=>inputChangeE(e)}></input></td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                    </form>
                </div>
                    <button type="submit" className='mainbutton1' >Save Changes</button>
            </div>
        </div>
        )
    )
}




export default ProfessionalInfo