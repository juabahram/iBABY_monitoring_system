import { useEffect, useState } from "react";
import * as BsIcons from "react-icons/bs";


export default function actuatorsView(){
    const[isOn, setIsOn] = useState<boolean>(false);
    let val = "0";

    useEffect(()=>{
        switch(isOn){
            case(false):
                val="0";
                break;
            case(true):
                val="1";
                break;
        }
    })

    function handleClick(){
        setIsOn(!isOn);
        console.log("click!");
        fetch('http://127.0.0.1:5000/api/ibaby/actuators/1',{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
            type: "buzzer",
            state: val})
        });
    }

    return(
    <div className='col'>
        <div className='card' id='monitor'>
            <div className='row' id='buzzer'>
                <h3 id="pos">Buzzer actuator <button id="buzzer" className="button-close " onClick={handleClick}> <BsIcons.BsExclamationCircle id="icon"/> </button></h3>
            </div>
        </div>
    </div>
    );
}