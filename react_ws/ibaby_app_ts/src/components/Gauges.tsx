import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
// @ts-ignore
import GaugeChart from "react-gauge-chart";
import ReactSpeedometer from "react-d3-speedometer";
// @ts-ignore
import Thermometer from "react-thermometer-component";
import { sensor } from './MonitorView';

import Plot from 'react-plotly.js';

const colors:Array<String> = [
    "#aa57d4",
    "#a04ec3",
    "#9645b2",
    "#8c3ca2",
    "#823391",
    "#782a80",
    "#6e216f",
    "#64185e",
    "#5a0e4d",
    "#510c4a",
    "#480a47",
    "#3f0844",
    "#360641",
    "#2d043e",
    "#24023b",
    "#1b0038",
    "#120035",
    "#100032",
    "#0e002f",
    "#0c002c",
    "#0a0029",
    "#33093f"
  ];

function AirQualityGauge({sensors} : {sensors: sensor[]}){
    const[valor,setValor] = useState<number>(0);

    useEffect(()=>{
        const sensor = sensors.find(el => el.TYPE=="airPart");
        if(sensor){
            setValor(sensor.VALUE);
        }
    },[sensors]);

    return(
        <div className="col">
            <div className="card" id="monitor">
                <h3 id="air">Air Particles Per Volume</h3>
                <ReactSpeedometer
                    maxValue={250}
                    minValue={0}
                    value={valor}
                    customSegmentStops={[0, 12, 35, 55, 150, 250]}
                    needleTransition={undefined}
                    needleTransitionDuration={500}
                    needleColor="#EEC9FF"
                    startColor="#D06BFF"
                    segments={5}
                    endColor="#3F0B52"
                    needleHeightRatio={0.7}
                    textColor="white"
                />
            </div>
        </div>
    )
}

function TempHumGauge({sensors} : {sensors: sensor[]}){
    const[valor,setValor] = useState<number>(0);
    const[valor2,setValor2] = useState<number>(0);
    const prevVal=0.;

    useEffect(()=>{
        const sensor = sensors.find(el => el.TYPE=="temperatura");
        if(sensor){
            setValor(sensor.VALUE);
        }
    },[sensors]);

    useEffect(()=>{
        const sensor2 = sensors.find(e => e.TYPE=="humedad");
        if(sensor2){
            if(sensor2.VALUE != prevVal){
                setValor2(sensor2.VALUE);
            }
        }
    },[sensors]);
      
    return(
        <div className="col">
            <div className="card" id="monitor">
                <div className="row" id="humtemp">
                    <div className="col" id="temphum_temp">
                        <Thermometer
                            id="thermo"
                            theme="dark"
                            value={valor}
                            max="40"
                            steps="3"
                            format="°C"
                            size="small"
                            height="180"
                        />
                    </div>
                    <div className="col" id="temphum">
                        <GaugeChart
                            id="gauge-chart1"
                            nrOfLevels={20} 
                            percent={valor2/100} 
                            colors={colors} 
                            arcPadding={0.01}
                            needleColor="#EEC9FF"
                            hideText={true}
                        />
                        <h3 id="hum">Relative humidity: {valor2}%</h3>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

function PressurePositionCard({sensors} : {sensors: sensor[]}){
    return(
        <div className='col'>
            <div className='card' id='monitor'>
                <div className='row' id='pressPosition'>
                    
                </div>
            </div>
        </div>
    )
}

function StrollerPositionCard({sensors} : {sensors: sensor[]}){

    const[value, setValue] = useState<number[]>([]);
    const[isOn, setIsOn] = useState<String>("");

    useEffect(() =>{
        const rawValue = sensors.find(el => el.TYPE=='angular')?.VALUE;
        const values = rawValue?.toString().split(',').map(Number);
        if (values){
            setValue(values);
        }
    }, [sensors]);

    useEffect(() => {
        const val = sensors.find(el => el.TYPE=='press')?.VALUE;
        if(val==1){
            setIsOn("Baby ON stroller");
        }else setIsOn("Baby OFF stroller");
    })

    const val1= value[0];
    const val2= value[1];

    const totalAngle = Math.sqrt(val1 ** 2 + val2 ** 2);

    return(
        <div className='col'>
        <div className='card' id='monitor'>
            <div className='row' id='StrollerPosition'>
            <h3 id="pos">Stroller angle position: {totalAngle.toPrecision(4)}°</h3>
            <h3 id="pos">{isOn}</h3>
            </div>
        </div>
    </div>
    )
}

export {TempHumGauge, AirQualityGauge, PressurePositionCard, StrollerPositionCard};