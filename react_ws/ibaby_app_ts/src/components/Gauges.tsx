import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
// @ts-ignore
import GaugeChart from "react-gauge-chart";
import ReactSpeedometer from "react-d3-speedometer";
// @ts-ignore
import Thermometer from "react-thermometer-component";
import { sensor } from './MonitorView';

const colors:Array<String> = [
    "#b4f7ff","#a5ebf7","#97deee","#8ad2e6","#7cc6de","#70bad6","#63aece","#58a2c6","#4c96be","#428ab6","#387eae","#2f72a5"
    ,"#26669c","#174f8a","#114481","#0c3977","#082e6d","#062363","#041858"
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
                <h3>Nivel de calidad del aire</h3>
                <ReactSpeedometer
                    maxValue={251}
                    minValue={0}
                    value={valor}
                    customSegmentStops={[0, 12, 35, 55, 150, 250, 251]}
                    labelFontSize="6px"
                    needleTransition={undefined}
                    needleTransitionDuration={500}
                    needleColor="white"
                    startColor="white"
                    segments={6}
                    endColor="grey"
                    needleHeightRatio={0.7}
                />
            </div>
        </div>
    )
}

function TempHumGauge({sensors} : {sensors: sensor[]}){
    const[valor,setValor] = useState<number>(0);
    const[valor2,setValor2] = useState<number>(0);

    useEffect(()=>{
        const sensor = sensors.find(el => el.TYPE=="temperatura");
        const sensor2 = sensors.find(el => el.TYPE=="humedad");
        if(sensor){
            setValor(sensor.VALUE);
        }else if(sensor2){
            setValor2(sensor2.VALUE);
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
                            steps="2"
                            format="°C"
                            size="small"
                            height="180"
                        />
                        <h3></h3>
                    </div>
                    <div className="col" id="temphum">
                        <GaugeChart
                            id="gauge-chart1"
                            nrOfLevels={20} 
                            percent={valor2/100} 
                            colors={colors} 
                            arcPadding={0.01}
                        />
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

export {TempHumGauge, AirQualityGauge, PressurePositionCard};