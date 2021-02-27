import React, {useState, useEffect} from "react";
import "./Wx.scss"


const controller = new AbortController();
const signal = controller.signal;


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
    const [wxCoordinates, setWxCoordinates] = useState({lat: 0, lon: 0})
    const [place, setPlace] = useState("Warsaw")

    const apiKey = "d9aa85904c769b23565749544d0c00ce";
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lng}&appid=${apiKey}`

    const handleChange = (e) => {
        setPlace(e.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        getWx();
        document.querySelector("form").reset();
    };
    // 53e64af4ba678004519c753fd940ef5f
    // d9aa85904c769b23565749544d0c00ce


    const getWx = () => {
        function calCelsius(temp) {
            return Math.floor(temp - 273.15);
        }

        fetch(`${api}`, {signal})
            .then(response => response.json())
            .then(data => {
                    console.log(data)
                    if (typeof data.cod !== 429) {
                        setWxCoordinates({lat: data.coord.lat, lon: data.coord.lon});
                        setApiData({
                            city: `${data.name}`,
                            country: data.sys.country,
                            main: data.weather[0].main,
                            celsius: calCelsius(data.main.temp),
                            temp_max: calCelsius(data.main.temp_max),
                            temp_min: calCelsius(data.main.temp_min),
                            description: data.weather[0].description,
                            windDir: data.wind.deg,
                            windSpeed: data.wind.speed,
                            press: data.main.pressure,
                            icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
                            utcOffset: data.timezone,
                            error: false
                        });
                    } else {
                        setApiData({error: data.message})
                        controller.abort();
                    }
                }
            ).catch((error) => {
            console.log(error)
        });
    }

    const today = new Date()
    const date = today.getDate();
    const month = today.getMonth() + 1;
    const hour = today.getUTCHours()
    const minutes = today.getMinutes() < 10 ? `0${today.getMinutes()}` : today.getMinutes();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    useEffect(() => {

    }, [handleSubmit]);

    useEffect(() => {
        getWx()
    }, [coordinates])

    useEffect(() => {
        api = `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${apiKey}`;
    }, [place])

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
                        <h3>{apiData.city}</h3>
                        <div className="time__date">
                            <h5>{date} {monthNames[month]}</h5>
                            <h5>{hour + apiData.utcOffset / 3600} : {minutes}</h5>
                        </div>
                    </div>
                    <div className="current__wx__main">
                        <div className="current__wx__left">
                            <h4>Temp: {apiData.celsius}{'\u00b0'}C</h4>
                            <h4>Wind:  {apiData.windDir}{'\u00b0'}  {apiData.windSpeed}m/s</h4>
                            <h4>Press: {apiData.press} hpa</h4>
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

