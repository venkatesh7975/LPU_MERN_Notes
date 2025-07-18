import { useState } from "react";
import axios from "axios";
import "./Weather.css";
import { auth } from "../firebaseConfig";
import { useNavigate}  from "react-router-dom";
export default function Weather() {
  const [input, setInput] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate();

  const API_KEY = "f88e755f398a8552e99e3c9d0d21cfd9";
    const handleLogout = () => {
    auth.signOut();
    navigate("/")
  };

  function handleInputChange(e) {
    setInput(e.target.value);
    if (error) setError(""); // clear error on input change
  }

  async function handleFormSubmit(e) {
    e.preventDefault();
    const city = input.trim();
    if (!city) return;

    setLoading(true);
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
      const response = await axios.get(url);
      setWeather(response.data);
      setError("");
    } catch (err) {
      setError("City not found. Please try again.",err);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="weather-container">
             <button onClick={handleLogout}>Logout</button>
      <form onSubmit={handleFormSubmit} className="weather-form">
        <input
          type="text"
          placeholder="Enter city name"
          value={input}
          onChange={handleInputChange}
          aria-label="City name"
        />
        <button type="submit" aria-label="Get weather">
          {loading ? "Loading..." : "Get Weather"}
        </button>
      </form>

      {error && <p className="error" role="alert">{error}</p>}

      {weather && !loading && (
        <div className="weather-card">
          <h2>
            {weather.name}, {weather.sys.country}
          </h2>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
          <p className="temp">{weather.main.temp}°C</p>
          <p>{weather.weather[0].description}</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}
