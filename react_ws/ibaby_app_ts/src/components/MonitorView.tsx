import 'bootstrap/dist/css/bootstrap.min.css';
import { ObjectProximityCard, StrollerPositionCard, TempHumGauge } from "./Gauges";
import { AirQualityGauge } from "./Gauges";
import { useEffect, useState } from 'react';

export type sensor ={
    ID: number;
    TYPE: string;
    VALUE: number;
    TIMESTAMP: string;
}

function MonitorView(){
    const[sensors, setSensors] = useState<sensor[]>([]);
    
    useEffect(()=>{
        const interval = setInterval(()=> {
            fetch('http://127.0.0.1:5000/api/sensors').then((res) => res.json())
            .then((data) => setSensors(data))
            .catch((err) => console.error("Error: ")+err);
        }, 8000)

    },[]);

    return(
        <div className="container">
            <div className="container" id="gaugesGrid">
                <div className="row" id="gauges">
                    <TempHumGauge sensors={sensors}/>
                    <AirQualityGauge sensors={sensors}/>
                    <StrollerPositionCard sensors={sensors}/>
                    <ObjectProximityCard sensors={sensors}/>
                </div>
            </div>
        </div>
    )
}

export default MonitorView;