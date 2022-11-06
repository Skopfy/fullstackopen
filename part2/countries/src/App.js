import { useState, useEffect } from 'react'
import axios from 'axios'

const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

const Search = (props) => {
    
    return (
	    <form>
	   Search: <input value={props.search} onChange={props.handleSearchChange} />
	    </form>
    )
}

const countriesToShow = (search, countries) => {
	if (search === "") {
	    return countries
	}
	const res = countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()))
	return res

}

const Country = (props) => {
    const {country, setSearch} = props
    return (
	    <>
	    <li>
	    {country.name.common} <Button onClick={() => setSearch(country.name.common)} text={"Show"}/>
	</li>
	    </>
    )
}

const SingleCountry = ({country}) => {
    var capital = "No capital."
    if ("capital" in country) {
	capital = country.capital[0]
    }
    var languages = {lang: 'No official language.'}
    if ("languages" in country) {
	languages = country.languages
    }
    return (
	    <>
	    <h2> {country.name.common}</h2>
	    <p>Capital: {capital}</p> 
	    <p>Area (sq km):  {country.area}</p>
	    <h3> Languages </h3>
	    <ul>
            {Object.entries(languages).map(([key, lang]) =>
		    <li key={key}> {lang}</li>
            )}
	</ul>
	    <img
        src={country.flags['png']}
        alt={country.name.common}
	    />
	    </>
    )
}

const Countries = (props) => {
    const cs = props.countriesToShow(props.search, props.countries)
    if (cs.length > 10) {
	return (
	    <>
            <p> Be more specific in your search. </p>
	    </>
    )
    }
    if (cs.length > 1 || cs.length === 0) {
	return (
	   <ul>
          {cs.map(country =>
		  <Country key={country.name.common} country={country} setSearch={props.setSearch}/>
          )}
      </ul>
    )
    }
    return (
	    <>
            <SingleCountry key={cs[0].name.common} country={cs[0]} />
	    <Weather key={cs[0].capital[0]} country={cs[0]} api_key={props.api_key} weather={props.weather} setWeather={props.setWeather}/>
	    </>
    )
    
}

const Weather = (props) => {
    const {country, api_key, weather, setWeather} = props
    const url =  `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&appid=${api_key}`
    useEffect(() =>
	{
	    axios
		.get(url)
		.then(response => {
		    setWeather(response.data)
		})
	}, [])
    
    return (
	    <>
	    <h3> Weather in {country.capital}</h3>
	    <p> Temperature: {weather && weather.main.temp}°C</p>
	    <img
        src={weather && `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt={weather && weather.weather.description}
	    />
	    <p> Wind: {weather && weather.wind.speed}km/h</p>
	    </>
    )
}


function App() {

    const [countries, setCountries] = useState([])
    const [weather, setWeather] = useState(null)
    const [search, setSearch] = useState('')  
    const api_key = process.env.REACT_APP_API_KEY

    useEffect(() =>
	{
	    axios
		.get('https://restcountries.com/v3.1/all')
		.then(response => {
		    setCountries(response.data)
		})
	}, [])

    const handleSearchChange = (event) => {
	const filter = event.target.value
	setSearch(filter)
    }
    
  return (
    <div>
	  <Search  countries={countries} search={search} setSearch={setSearch} handleSearchChange={handleSearchChange}/>
	  <Countries  api_key={api_key} countriesToShow={countriesToShow} search={search} setSearch={setSearch} countries={countries} weather={weather} setWeather={setWeather}/>
    </div>
  );
}

export default App;
