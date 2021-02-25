import React, {useState, useEffect} from "react";
import "./Wx.scss"


const Wx = ({coordinates, position}) => {
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

    const [place, setPlace] = useState("")

    const handleChange = (e) => {
        setPlace(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        document.querySelector("form").reset();
        console.log(place);
    };

    // 53e64af4ba678004519c753fd940ef5f
    const apiKey = "d9aa85904c769b23565749544d0c00ce";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lng}&appid=${apiKey}`

    const getWx = () => {
        function calCelsius(temp) {
            return Math.floor(temp - 273.15);
        }

        fetch(`${apiUrl}`)
            .then(response => response.json())
            .then(data => {
                if (data.cod !== 429) {
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
                }
            }
            ).catch((error)=> {
            console.log(error)
            setApiData({error: error})
        });
    }

    useEffect(() => {
        getWx()
    }, [getWx]);

    if (apiData.error !== false) {
        return (
            <h4 className="wx__info__panel">{apiData.error}</h4>
        )
    } else {
        return (
            <div className="wx__info__panel">
                <form action="" onSubmit={handleSubmit}>
                    <input type="text" placeholder={"seacrh for a place..."} onChange={handleChange}/>
                </form>
                <h4>{apiData.city}</h4>
                <h4>{apiData.celsius}</h4>
                <h4>{apiData.description}</h4>
            </div>
        )
    }
}

export default Wx

