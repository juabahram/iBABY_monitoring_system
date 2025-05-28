import 'bootstrap/dist/css/bootstrap.min.css';
import { TempHumGauge } from "./Gauges";
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
        fetch('http://127.0.0.1:5000/api/sensors').then((res) => res.json())
        .then((data) => setSensors(data))
        .catch((err) => console.error("Error: ")+err);
    },[]);

    return(
        <div className="container">
            <div className="container" id="gaugesGrid">
                <div className="row" id="gauges">
                    <TempHumGauge sensors={sensors}/>
                    <AirQualityGauge sensors={sensors}/>
                </div>
            </div>
        </div>
    )
}

export default MonitorView;