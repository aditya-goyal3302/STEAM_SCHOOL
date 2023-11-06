import React from 'react'

function Errormessage(props) {
    return (
        <div>
           <p style={{color:'red',fontSize:"10px"}}>{props.message}</p> 
        </div>
    )
}

export default Errormessage