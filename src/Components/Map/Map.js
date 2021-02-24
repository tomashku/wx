import GoogleMapReact from 'google-map-react';
import React, {useEffect, useState} from 'react'
import "./Map.scss"
import Wx from "../Wx/Wx";



const Map = () => {
    const [mapData, setMapData] = useState({center: {lat: 51, lng: 21}, zoom: 13});
    const [position, setPosition] = useState(null)

    const getPosition = () => {
        navigator.geolocation.getCurrentPosition(position => {
            if (typeof position !== "undefined") {
                setPosition({
                    position
                })
                console.log(`position obtained ${position}`)
            }
        }, error => {
            console.log("position update not available")
        }, {
            enableHighAccuracy: false,
            maximumAge: 30000,
            timeout: 10000
        })
    };



    const clickHandler = ({x, y, lat, lng, event}) => {
        setMapData({
            center: {lat: lat, lng: lng}, zoom: 14
        });
    }

    useEffect(() => {

    }, [mapData])

    useEffect(()=>{
        getPosition()
    },[])


    return (
        <div className="map">
            <Wx coordinates={mapData.center}/>
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
