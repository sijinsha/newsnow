import React, { useEffect, useState } from "react";
import "../styles/weather.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchWeather } from "../slices/weatherSlice";

function Weather() {
  const [lat, setlat] = useState("");
  const [long, setlong] = useState("");
  const climateDetails = useSelector((state) => state.weather.foreCast);
  const dispatch = useDispatch();

  useEffect(() => {
    let geoId = window.navigator.geolocation.getCurrentPosition((position) => {
      setlat(position.coords.latitude);
      setlong(position.coords.longitude);
    });
  }, []);

  useEffect(() => {
    if (lat && long) dispatch(fetchWeather({ lat: lat, long: long }));
  }, [lat, long]);

  return (
    <article className="weather">
      <div className="weather-condition">
        <h3>{parseInt(climateDetails?.main?.temp || 20)}&deg;</h3>
        <figure className="weather-image">
          <img src={`http://openweathermap.org/img/w/${climateDetails.weather?.[0]?.icon || "04d"}.png`} />
          <figcaption className="weatherCondition">{climateDetails.weather?.[0]?.main}</figcaption>
        </figure>
      </div>
      <span className="place">{climateDetails?.name}</span>
    </article>
  );
}

export default Weather;
