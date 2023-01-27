import { ChangeEvent, useEffect, useState } from 'react'
import { locationData, forecastType } from '../types';
import Search from './Search';
import ShowForecast from './ShowForecast';

function useDebounceValue(value: string, time=350){
    const trimmedValue = value.trim();
    const [debounceValue, setDebounceValue] = useState(trimmedValue);  
    useEffect(()=>{
      const timeout = setTimeout(()=>{
        setDebounceValue(trimmedValue);
      },time);
      return () => {
        clearTimeout(timeout);
      }
    },[value, time]);
    return debounceValue;
  }

function Forecast() {
  const [location, setLocation] = useState<string>("");
  const [suggestions, setSuggestions] = useState<[]>([]);
  const [city, setCity] = useState<locationData | null>(null)
  const [weather, setWeather] = useState<forecastType | null>(null);
  const [option, setOption] = useState(false); // To mark if an option was selected from the dropdown menu.
  const inputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocation(value);
  }
  const debounceValue = useDebounceValue(location);
  const onOptionSelect = async (item: locationData) => {
    setCity(item);
    console.log(item.name);
    setLocation(item.name);
    setOption(true);
    setSuggestions([]); 
  }
  const getCurrentWeather = async (item: locationData) => {
      const weatherData = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${item.lat}&lon=${item.lon}&appid=${import.meta.env.VITE_API_KEY}&units=metric`)
      const data = await weatherData.json();
      const forecastData: forecastType = {...data.city, list: data.list.slice(0,16)} 
	  setWeather(forecastData);
	  console.log(forecastData);
  }
  const onSubmit = () => {
	setSuggestions([]);
    if(!city) return
    getCurrentWeather(city);
  }
  useEffect(()=>{
    (async () => {
      setSuggestions([]);
      if(debounceValue.length > 0){
        const suggestedData = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${location.trim()}&limit=5&appid=${import.meta.env.VITE_API_KEY}`)
        const data = await suggestedData.json();
        if(option === false)
          setSuggestions(data);
      }
    })();
    return () => {
      setOption(false);
    }
  },[debounceValue])

  return (
    <main className='flex justify-center items-center bg-gradient-to-br from-sky-700 via-sky-400 to-sky-200 h-screen w-full'>
      {weather?(
        <ShowForecast data={weather}/>
      ):(
        <Search location={location} suggestions={suggestions} inputChange={inputChange} onOptionSelect={onOptionSelect} onSubmit={onSubmit} />
        )}
    </main> 
  )
}

export default Forecast 
