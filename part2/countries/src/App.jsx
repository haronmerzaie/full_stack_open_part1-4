import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CountryInfo = ({ country, weather }) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital[0]}</p>
      <p>Area: {country.area} km²</p>
      <img src={country.flags.png} alt={`Flag of ${country.name.common}`} width="100" />
      <h3>Languages</h3>
      <ul>
        {Object.values(country.languages).map((lang, index) => (
          <li key={index}>{lang}</li>
        ))}
      </ul>
      {weather && (
        <div>
          <h3>Weather in {country.capital[0]}</h3>
          <p>{weather}</p>
        </div>
      )}
    </div>
  );
};

const App = () => {
  const [query, setQuery] = useState('');
  const [countries, setCountries] = useState([]);
  const [allCountries, setAllCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [weather, setWeather] = useState(null);

  // Fetch all countries when the component mounts
  useEffect(() => {
    async function fetchAllCountries() {
      try {
        const response = await axios.get(`https://studies.cs.helsinki.fi/restcountries/api/all`);
        setAllCountries(response.data);
      } catch (error) {
        console.error("Error fetching all countries:", error);
      }
    }

    fetchAllCountries();
  }, []);

  // Fetch country based on the search query
  useEffect(() => {
    if (!query) {
      setCountries(allCountries);
      return;
    }

    setLoading(true);

    async function fetchByName() {
      try {
        const responseByName = await axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${query.trim()}`);
        setCountries(responseByName.data);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          const filteredCountries = allCountries.filter(country => 
            country.name.common.toLowerCase().includes(query.toLowerCase())
          );
          setCountries(filteredCountries);
        } else {
          console.error("Error fetching countries by name:", error);
          setCountries([]);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchByName();
  }, [query, allCountries]);

  // Fetch weather for the country
  useEffect(() => {
    async function fetchWeather(capital) {
      try {
        const response = await axios.get(`https://wttr.in/${capital}?format=%C+%t+%w&lang=en`);
        setWeather(response.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setWeather(null);
      }
    }

    if (countries.length === 1) {
      fetchWeather(countries[0].capital[0]);
    } else if (selectedCountry) {
      fetchWeather(selectedCountry.capital[0]);
    } else {
      setWeather(null);
    }
  }, [countries, selectedCountry]);

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
    setSelectedCountry(null);
    setWeather(null);
  }

  return (
    <div>
      <input value={query} onChange={handleQueryChange} placeholder="Search for a country..." />
      {!loading && (
        <div>
          {countries.length === 0 && <p>No countries found for the query: {query}</p>}
          {countries.length > 10 && <p>Too many matches, specify another filter</p>}
          {countries.length <= 10 && countries.length > 1 && (
            <div>
              <h2>Countries matching your query:</h2>
              <ul>
                {countries.map(country => (
                  <li key={country.cca3}>
                    {country.name.common}
                    <button onClick={() => {
                      setSelectedCountry(country);
                      setCountries([]);
                    }}>
                      Show
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {countries.length === 1 && <CountryInfo country={countries[0]} weather={weather} />}
          {selectedCountry && <CountryInfo country={selectedCountry} weather={weather} />}
        </div>
      )}
    </div>
  );  
};

export default App;
