import React from 'react'
// import $ from 'jquery'

function Successmessage(props) {
    return (
        <div id="successmessge">
           <p style={{color:'#0981f1', fontWeight:'600',fontSize:"10px"}}>{props.message}</p> 
        </div>
    )
}

export default Successmessage
