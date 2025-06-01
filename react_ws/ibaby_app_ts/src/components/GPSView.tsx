import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import 'leaflet/dist/leaflet.css';
import { sensor } from "./MonitorView";

export default function GPSView(){
    const[val, setVal] = useState<number[] | null>(null);
    const mapRef = useRef<L.Map | null>(null);
    const[sensors, setSensors] = useState<sensor[]>([]);

     useEffect(()=>{
        const interval = setInterval(()=> {
            fetch('http://127.0.0.1:5000/api/sensors').then((res) => res.json())
            .then((data) => setSensors(data))
            .catch((err) => console.error("Error: ")+err);
        }, 8000)

        return () => clearInterval(interval);
    },[]);

    useEffect(()=>{
        const vals= sensors.find(x => x.TYPE=='gps')?.VALUE;
        const coords = vals?.toString().split(',').map(Number); 
        if(coords){
            setVal(coords);
        }
        
    },[sensors]);

    let val1= val? val[0] : 0;
    let val2= val? val[1] : 0;

    useEffect(()=>{
        if(!val) return;

        if(val1==0 || val2==0 ){
            val1= 46;
            val2=1;
        }

        if(!mapRef.current){
            mapRef.current = L.map("map", {
            center: [val1, val2],
            zoom: 16,
            zoomControl: true,
            }).setView([val1, val2]);


            L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(mapRef.current);

            L.marker([val1, val2]).addTo(mapRef.current)
            .bindPopup('Your Baby is here!')
            .openPopup();

            mapRef.current?.invalidateSize();
        }
    }, [val])
    
    return(
        <div className="container" style={{
        maxWidth: "740px",
        minWidth: "0px",
        height: "400px",
        margin: "0 auto",
        border: "2px solid white",
        borderRadius: "1rem",
        overflow: "hidden",
        marginRight: "20px"
      }}>
            {val? (<div id="map" style={{ height: "100%", width: "100%" }} />) : (<p>Loading map...</p>)}
        </div>
    );
}