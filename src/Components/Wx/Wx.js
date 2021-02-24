import React, {useState, useEffect} from "react";
import "./Wx.scss"


const Wx = ({coordinates}) => {
    const [apiData, setApiData] = useState({
        city: undefined,
        country: undefined,
        icon: undefined,
        main: undefined,
        celsius: undefined,
        temp_max: null,
        temp_min: null,
        description: "",
        error: false
    });


    const apiKey = "6a6d2b3848fd82e38bbd2fceca2783c8";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lng}&appid=${apiKey}`

    const getWx = () => {
        function calCelsius(temp) {
            return Math.floor(temp - 273.15);
        }

        fetch(`${apiUrl}`)
            .then(response => response.json())
            .then(data => {
                setApiData({
                    city: `${data.name}, ${data.sys.country}`,
                    country: data.sys.country,
                    main: data.weather[0].main,
                    celsius: calCelsius(data.main.temp),
                    temp_max: calCelsius(data.main.temp_max),
                    temp_min: calCelsius(data.main.temp_min),
                    description: data.weather[0].description,
                    error: false
                })

            });
    }


    useEffect(() => {
        getWx()
    }, [getWx]);

    if (!apiData) {
        console.log(`api data ${apiData}`)
        return (
            <h4>acquiring weather...</h4>
        )
    } else {

        return (
            <div className="wx__info__panel">
                <h4>{apiData.city}</h4>
                <h4>{apiData.description}</h4>
                <h4>{apiData.celsius}</h4>
            </div>


        )
    }
}

export default Wx

