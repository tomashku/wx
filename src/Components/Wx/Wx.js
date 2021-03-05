import React, {useState, useEffect} from "react";
import "./Wx.scss"

const Wx = ({coordinates, setMapData, mapData}) => {
    const [apiData, setApiData] = useState({
        city: undefined,
        country: undefined,
        icon: undefined,
        main: undefined,
        celsius: undefined,
        description: "",
        windDir: null,
        windSpeed: null,
        press: null,
        utcOffset: null,
        localTime: null,
        latitude: null,
        longitude: null,
        error: false
    });

    const [place, setPlace] = useState("Warsaw");
    const [localTime, setLocalTime] = useState();
    const [error, setError] = useState(null)

    // 53e64af4ba678004519c753fd940ef5f
    // d9aa85904c769b23565749544d0c00ce
    const apiKey = "d9aa85904c769b23565749544d0c00ce";
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lng}&appid=${apiKey}`;
    // let apiWx = `http://maps.openweathermap.org/maps/2.0/weather/${PR0}/${0}/${0}/{y}&appid=${apiKey}`

    const handleChange = (e) => {
        setPlace(e.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        getWx();
        document.querySelector("form").reset();
    };

    const getWx = () => {
        function calCelsius(temp) {
            return Math.floor(temp - 273.15);
        }

        fetch(`${api}`)
            .then(response => response.json())
            .then(data => {
                    setError(null)
                    setLocalTime((data.dt + data.timezone) * 1000)
                    setApiData({
                        city: data.name,
                        country: data.sys.country,
                        main: data.weather[0].main,
                        celsius: calCelsius(data.main.temp),
                        description: data.weather[0].description,
                        windDir: data.wind.deg,
                        windSpeed: data.wind.speed,
                        press: data.main.pressure,
                        icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
                        latitude: data.coord.lat,
                        longitude: data.coord.lon,
                        error: false,
                    });
                }
            ).catch((error) => {
            setError(error);
        });
    }

    function alert() {
        document.querySelector("input").style.border = "2px solid red"
        const alertTimeOut = setTimeout(function () {
            document.querySelector("input").style.border = "none"
        }, 300)
        return () => clearTimeout(alertTimeOut);
    }


    const today = new Date(localTime)
    const date = today.getDate();
    const month = today.getMonth() + 1;
    const hour = today.getUTCHours() < 10 ? `0${today.getUTCHours()}` : today.getUTCHours();
    const minutes = today.getMinutes() < 10 ? `0${today.getMinutes()}` : today.getMinutes();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    useEffect(() => {
        if (typeof setMapData === 'function') {
            setMapData({center: {lat: apiData.latitude, lng: apiData.longitude}, zoom: 10})
        }
    }, [apiData.latitude]);

    useEffect(() => {
        getWx()
    }, [coordinates])

    useEffect(() => {
        api = `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${apiKey}`;
    }, [handleSubmit])

    useEffect(() => {
        alert()
    }, [error])

    if (apiData.error !== false) {
        return <h4 className="error__message">{apiData.error}</h4>
    } else {
        return (
            <div className="wx__info__panel">
                <form action="" onSubmit={handleSubmit}>
                    <input type="text" placeholder={"seacrh for a place..."} onChange={handleChange}/>
                </form>
                <div className="current__wx">
                    <div className="current__wx__header">
                        <h3>{apiData.city} {apiData.country}</h3>
                        <div className="time__date">
                            <h5>{error === null ? date : ""} {monthNames[month]}</h5>
                            <h5>{error === null ? hour + ` :` : " "} {error === null ? minutes : " "}</h5>
                        </div>
                    </div>
                    <span/>
                    <div className="current__wx__main">
                        <div className="current__wx__left">
                            <h4>Temp: {apiData.celsius}{'\u00b0'}C</h4>
                            <h4>Wind: {apiData.windDir}{'\u00b0'} {apiData.windSpeed}m/s</h4>
                            <h4>Press: {apiData.press} hpa</h4>
                            <h4></h4>
                        </div>
                        <div className="current__wx__right">
                            <h4>{apiData.description}</h4>
                            <div className="icon__container">
                                <img src={apiData.icon} alt=""/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Wx