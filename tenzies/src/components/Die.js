import React from 'react';

export default function die(props){

    return (
        
        <div className={`die ${props.isHeld ? "die-held" : ""}`} onClick={()=>props.click()} > 
            <h2 className="die-num">{props.num}</h2>
        </div>
    )
}