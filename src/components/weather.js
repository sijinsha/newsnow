import React,{useEffect, useState} from "react";
import { ReactComponent as LocationIcon } from '../icons/location.svg';
import '../styles/weather.css'
import { useSelector, useDispatch } from 'react-redux'
import {saveWeather} from '../slices/weatherSlice'
import Datetime from './datetime'

function Weather() {

    const [lat, setlat] = useState('');
    const [long, setlong] = useState('');
    const climateDetails = useSelector((state) => state.weather.foreCast)
    const dispatch = useDispatch()


    const getWeatherUpdates= ()=>{
        if(!lat && !long)
            return false;
        let apiKey = "07df1a41cb1bc97189c7685b087c9029"
        let baseUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`
        console.log(baseUrl)
        fetch(baseUrl)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                dispatch(saveWeather(data))
            });
    }

    useEffect(()=>{
        let geoId=window.navigator.geolocation.getCurrentPosition(position=>{
                setlat(position.coords.latitude)
                setlong(position.coords.longitude)
          })
    },[])

    useEffect(() => {
        getWeatherUpdates();
      }, [lat,long])

   return (
     <>
        {/* <div className="basic-info">
            <div className = "location-info">
                <LocationIcon />
                <p> {climateDetails?.name} </p>
            
            </div>
            <div className="climate-info">
                <img src={`http://openweathermap.org/img/w/${climateDetails.weather?.[0]?.icon}.png`} />
                
            </div>
            

        </div> */}

        <article className="widget">
            <div className="weatherInfo">
                <div className="temperature">
                    <span>{parseInt(climateDetails?.main?.temp)}&deg;</span>
                    <div className="place">{climateDetails?.name}</div>
                </div>
                <div className="description">
                    <img src={`http://openweathermap.org/img/w/${climateDetails.weather?.[0]?.icon}.png`} />
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