import GoogleMapReact from 'google-map-react';
import React, {useEffect, useState} from 'react'
import "./Map.scss"
import Wx from "../Wx/Wx";


const Map = () => {
    const [mapData, setMapData] = useState({center: {lat: null, lng: null}, zoom: 1});
    const getPosition = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(position => {
                if (typeof position !== "undefined") {
                    setMapData({center: {lat: position.coords.latitude, lng: position.coords.longitude}, zoom: 10})
                }
            })
        }
    };

    const clickHandler = ({x, y, lat, lng, event}) => {
        setMapData({
            center: {lat: lat, lng: lng}, zoom: 13
        });
    }

    useEffect(() => {
         getPosition()
    }, [])


    return (
        <div className="map" >
            <Wx coordinates={mapData.center} setMapData={setMapData} mapdData={mapData}/>
            <GoogleMapReact
                onClick={clickHandler}
                resetBoundsOnResize={true}
                bootstrapURLKeys={{key: "AIzaSyAaZ-6Wthq-Hj5SYq2Hw35hqBPsDN74dJc"}}
                style={{width: "100%", height: "100%"}}
                // defaultCenter={defaultCenter}
                center={mapData.center}
                defaultZoom={mapData.zoom}
                yesIWantToUseGoogleMapApiInternals={true}
                disableDefaultUI={true}
            >
            </GoogleMapReact>
        </div>
    )
}

export default Map
