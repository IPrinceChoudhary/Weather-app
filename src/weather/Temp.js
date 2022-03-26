import React from 'react';
import { useState , useEffect} from 'react';
import WeatherCard from './WeatherCard';

const Temp = () => {

  const [searchValue, setSearchValue] = useState("Delhi");
  const [tempInfo, setTempInfo] = useState("");

  const getWeatherInfo = async()=>{
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=8111ec6c3f13e2bdf75fcc6d2b66e51a`;
      let res = await fetch(url)
      let data = await res.json()

      // destructuring the fetched data 
      const {temp, humidity, pressure} = data.main
      const {main: weatherMood} = data.weather[0]
      // (changing the name of data which we are fetching)
      const {name} = data
      const {speed} = data.wind
      const { country, sunset } = data.sys;

      const myNewWeatherInfo = {
        temp,
        humidity,
        pressure,
        weatherMood,
        name,
        speed,
        country,
        sunset,
      }
      setTempInfo(myNewWeatherInfo)

    } catch (error) {
      
    }
  }

  // (page refresh hote hi data mil jayega use effect ki madat se)
    useEffect(() => {
      getWeatherInfo()
    }, []);
    

  return (
    <>
      <div className="wrap">
        <div className="search">
          <input
            type="search"
            placeholder="search..."
            autoFocus
            id="search"
            className="searchTerm"
            value={searchValue}
            onChange={(e)=>setSearchValue(e.target.value)}
          />
          <button className="searchButton" type="button" onClick={getWeatherInfo}>
            Search
          </button>
        </div>
      </div>
      {/* our weather card  */}
      <WeatherCard tempInfo={tempInfo}/>
    </>
  );
};

export default Temp;
