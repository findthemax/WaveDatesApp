import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import moment, {HTML5_FMT} from "moment";
import {getWeather} from "../../../actions/weather";


const LocationCard = ({data, dispatch, skill}) => {

    const dispatchRedux = useDispatch()

    useEffect(()=> {
        if(!data.forecastTime || moment(data.forecastTime).isBefore(moment().subtract(12, 'hours'))) {
            dispatchRedux(getWeather(data._id))
        }
    }, [data])

    useEffect(()=> {
        let next6 = data.forecast.filter(obj => moment.unix(obj.dt).isAfter(moment()) && moment.unix(obj.dt).isBefore(moment().add(6, 'hours')))
        next6 = next6.map((obj, index) => {
            obj.header = getHeader(index)
            obj.quality = getQuality(obj.wind_speed*2.24)
            return obj
        })

        setQualityArr(next6)
    }, [data.forecast, skill])

    const [qualityArr, setQualityArr] = useState([])

    const getHeader = index => {
        switch (index) {
            case 0 :
                return "0 - 1"
            case 1 :
                return "1 - 2"
            case 2 :
                return "2 - 3"
            case 3 :
                return "3 - 4"
            case 4 :
                return "4 - 5"
            case 5 :
                return "5 - 6"
        }
    }

    const getQuality = (wind) => {
        if(skill === 'Novice') {
            if(wind === 15) {
                return 100
            }
            if(wind < 15) {
                return (6.6*wind)+1
            }
            if(wind > 20) {
                return 0
            }
            if(wind > 15) {
                return (100 - ((wind-15) * 20))
            }
        }
        if(skill === 'Intermediate') {
            if(wind === 20) {
                return 100
            }
            if(wind < 20) {
                return (5 * wind)+1
            }
            if(wind > 25) {
                return 0
            }
            if(wind > 20) {
                return (100 - ((wind-20) * 20))
            }
        }
        if(skill === 'Expert') {
            return wind*1.73
        }

    }

    return (

        <div className="location-card">
            <h4>{data.locName}</h4>
            <h5>{data.county}</h5>
            <h5>{data.distance.toFixed()} miles away</h5>
            { data.travelTime
                && <h5>Travel Time: {moment.utc(moment.duration(data.travelTime, "minutes").asMilliseconds()).format("HH:mm")}</h5>
            }
            <a href={`https://www.google.com/maps/search/?api=1&query=${data.lat},${data.long}`} target="_blank" className="btn">View on Google Maps</a>
            <h4>Forecast</h4>
            <div className="forecast"><p>Hour</p><p>Wind</p><p>Quality</p></div>
            {qualityArr.map(obj => <div key={data._id+obj.wind+obj.header} className="forecast"><p>{obj.header}</p><p>{(obj.wind_speed*2.24).toFixed(1)}Kts</p><p>{obj.quality.toFixed()}%</p></div>
            )}
        </div>
    )
}


export default LocationCard
