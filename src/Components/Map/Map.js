import GoogleMapReact from 'google-map-react';
import React, {useEffect, useState} from 'react'
import "./Map.scss"
import Wx from "../Wx/Wx";


const Map = () => {
    const [mapData, setMapData] = useState({center: {lat: 51, lng: 21}, zoom: 1});
    const [position, setPosition] = useState({center: {lat: 51, lng: 21}, zoom: 1})

    const getPosition = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(position => {
                if (typeof position !== "undefined") {
                    setPosition({center: {lat: position.coords.latitude, lng: position.coords.longitude}, zoom: 15});
                    setMapData({center: {lat: position.coords.latitude, lng: position.coords.longitude}, zoom: 15})
                    console.log(`${position.coords.latitude} ${position.coords.longitude}`);
                }
            })

        }
    };


    const clickHandler = ({x, y, lat, lng, event}) => {
        setMapData({
            center: {lat: lat, lng: lng}, zoom: 14
        });
    }

    useEffect(() => {
        getPosition()
    }, [])
    useEffect(()=>{

    },[setPosition])


    return (
        <div className="map">
            <Wx coordinates={mapData.center} position={position.center}/>
            <GoogleMapReact
                onClick={clickHandler}
                resetBoundsOnResize={true}
                bootstrapURLKeys={{key: "AIzaSyAaZ-6Wthq-Hj5SYq2Hw35hqBPsDN74dJc"}}
                style={{width: "100%", height: "100%"}}
                // defaultCenter={defaultCenter}
                center={mapData.center}
                defaultZoom={mapData.zoom}
                yesIWantToUseGoogleMapApiInternals={true}
            >
            </GoogleMapReact>
        </div>
    )
}


export default Map
