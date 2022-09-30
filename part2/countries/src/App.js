import { useState, useEffect } from 'react'
import axios from 'axios'

//($env:REACT_APP_API_KEY="ecd62f67e4474584b5ea76f274d83bf1") -and (npm start)

const CountryOverview = (country) => {
	const [weather, setWeather] = useState({ "weather": [{"icon": "0" }],"main": { "temp": 0},"wind": { "speed": 0, }})

	useEffect(() => {
		axios
			.get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital},${country.altSpellings[0]}&appid=${process.env.REACT_APP_API_KEY}`)
			.then(response => {
				console.log('weather acquired')
				setWeather(response.data)
			}).catch(error => {console.log(error)})
	}, [])

	return (
		<div>
			<h1>{country.name.common}</h1>
			<p>capital {country.capital} <br />
				area {country.area} </p>
			<h2>languages</h2>
			<ul>{Object.values(country.languages).map(language => <li key={language}>{language}</li>)}</ul>
			<img src={country.flags.png} alt={country.name.common} />
			<h1>Weather in {country.capital}</h1>
			<p>temperature {(weather.main.temp - 273.15).toFixed(2)} Celsius</p>
			<img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
			<p>wind {weather.wind.speed} m/s</p>
		</div>
	)
}

const Search = (props) => {
	const countries = props.handleSearch.length === 0 ? [] : props.countries.filter(
		country => {
			return country.name.common.toLowerCase().includes(props.handleSearch.toLowerCase())
		})

	if (countries.length > 10) {
		return "Too many matches, specify another filter"
	}
	else if (countries.length > 1) {
		return <ul>
			{countries.map(country => <li key={country.name.common}>
				{country.name.common}
				<button onClick={() => 1}>show</button>
			</li>)}
		</ul>
	}
	else if (countries.length === 1) {
		return CountryOverview(countries[0])
	}
}

function App() {
	const [countries, setCountries] = useState([])
	const [handleSearch, setSearch] = useState([])

	const handleSearchChange = (event) => setSearch(event.target.value)

	useEffect(() => {
		axios
			.get('https://restcountries.com/v3.1/all')
			.then(response => {
				console.log('promise fulfilled')
				setCountries(response.data)
			}).catch(error => {console.log(error)})
	}, [])

	return (
		<div>
			find countries <input onChange={handleSearchChange} /> <br />
			<Search countries={countries} handleSearch={handleSearch} />
		</div>
	)
}

export default App;
