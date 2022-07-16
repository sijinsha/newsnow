import React,{useEffect, useState} from "react";
import '../styles/weather.css'
import { useSelector, useDispatch } from 'react-redux'
import {fetchWeather} from '../slices/weatherSlice'
import Datetime from './datetime'

function Weather() {

    const [lat, setlat] = useState('');
    const [long, setlong] = useState('');
    const climateDetails = useSelector((state) => state.weather.foreCast)
    const dispatch = useDispatch()

    useEffect(()=>{
        let geoId=window.navigator.geolocation.getCurrentPosition(position=>{
                setlat(position.coords.latitude)
                setlong(position.coords.longitude)
          })
    },[])

    useEffect(() => {
        if(lat && long)
        dispatch(fetchWeather({lat:lat,long : long}));
      }, [lat,long])

   return (
     <>
        <article className="widget">
            <div className="weatherInfo">
                <div className="temperature">
                    <span>{parseInt(climateDetails?.main?.temp || 20)}&deg;</span>
                    <div className="place">{climateDetails?.name}</div>
                </div>
                <div className="description">
                    <img src={`http://openweathermap.org/img/w/${climateDetails.weather?.[0]?.icon || "04d"}.png`} />
                    <div className="weatherCondition">{climateDetails.weather?.[0]?.main}</div>     
                </div>
                <div className="date-info">
                    <Datetime />
                </div>
            </div>
        </article>
     </>
   )
}

export default Weather