import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

function App() {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);
  const [show, setShow] = useState(null);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((res) => {
        setCountries(res.data);
      });
  }, []);

  useEffect(() => {
    if (!show) {
      setWeather(null);
      return;
    }

    const capital = Array.isArray(show.capital)
      ? show.capital[0]
      : show.capital;
    const apiKey = import.meta.env.VITE_API_KEY;
    if (!apiKey) {
      console.warn("VITE_API_KEY is not set; skipping weather fetch");
      return;
    }

    const v2_5 = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}&units=metric`;

    axios
      .get(v2_5)
      .then((res) => {
        setWeather(res.data);
      })
      .catch((err) => {
        console.error("weather fetch failed", err);
        setWeather(null);
      });
  }, [show]);

  const filtered = countries.filter((country) =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  );

  const count = filtered.length;

  return (
    <div>
      <h1>Country Data</h1>
      find country{" "}
      <input value={search} onChange={(e) => setSearch(e.target.value)} />
      {count > 10 && <p>Too many matches, specify another filter</p>}
      {count <= 10 && (
        <>
          {filtered.map((country) => (
            <p key={country.name.common}>
              {country.name.common}{" "}
              <button onClick={() => setShow(country)}>Show</button>
            </p>
          ))}
        </>
      )}
      {show && (
        <div>
          <div>
            <h1>{show.name.common}</h1>
            <p>
              Capital {show.capital}
              <br />
              Area {show.area}
            </p>
          </div>

          <div>
            <h1>Language</h1>
            <ul>
              {Object.values(show.languages).map((lang) => (
                <li key={lang}>{lang}</li>
              ))}
            </ul>
          </div>

          <div>
            <h1>Flag</h1>
            <img src={show.flags.png} alt="flag" />
          </div>

          <div>
            <h1>Coat Of Arms</h1>
            <img src={show.coatOfArms.png} alt="flag" width={300} />
          </div>

          {weather && (
            <div>
              <h1>Weather in {show.capital}</h1>

              <h3>Temperature {weather.main.temp} Celcius</h3>
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt="weatherIcon"
              />
              <h3>Wind {weather.wind.speed} m/s</h3>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
