import React, { useState } from "react";
import {
  ThemeProvider,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Switch,
} from "@mui/material";
import { toast } from "react-toastify";
import "leaflet/dist/leaflet.css";
import "react-toastify/dist/ReactToastify.css";
import { lightTheme, darkTheme } from "./styleApp/theme";
import NewsCarousel from "./components/newsSection/NewsCarousel";
import WeatherChart from "./components/weatherSection/WeatherChart";
import SearchBar from "./components/utils/SearchBar";
import WeatherDetails from "./components/weatherSection/WeatherDetails";
import ErrorMessage from "./components/utils/ErrorMessage";
import ForecastDisplay from "./components/weatherSection/ForecastDisplay";
import WeatherMap from "./components/mapSection/WeatherMap";
import axios from "axios";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const API_KEY = "e9d15eae03804f969d7133122240609";

  const handleThemeChange = () => {
    setDarkMode(!darkMode);
  };

  const notify = (message) => toast(message);
  const currentTheme = darkMode ? darkTheme : lightTheme;

  const handleSearch = async (city) => {
    try {
      // Fetch weather data for the searched city
      const response = await axios.get(
        `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=3&aqi=no&alerts=no`
      );
      const data = response.data;

      const newWeatherData = {
        city: data.location.name,
        temperature: data.current.temp_c,
        condition: data.current.condition.text,
        country: data.location.country,
        lat: data.location.lat,
        lon: data.location.lon,
        details: {
          humidity: data.current.humidity,
          windSpeed: data.current.wind_kph / 3.6,
        },
        forecast: data.forecast.forecastday.map((day) => ({
          date: day.date,
          maxTemp: day.day.maxtemp_c,
          minTemp: day.day.mintemp_c,
          condition: day.day.condition.text,
        })),
      };

      // Save the city to recent cities
      let recentCities = JSON.parse(localStorage.getItem("recentCities")) || [];
      if (!recentCities.includes(city)) {
        recentCities = [city, ...recentCities].slice(0, 5); // Keep only the last 5 cities
        localStorage.setItem("recentCities", JSON.stringify(recentCities));
      }

      // Update the state with the new weather data
      setWeatherData(newWeatherData);
      setError(null);

      // Notify the user
      const extremeWeather =
        data.current.condition.text.toLowerCase().includes("storm") ||
        data.current.condition.text.toLowerCase().includes("snow");
      if (extremeWeather) {
        notify("Extreme weather conditions detected! Stay safe.");
      } else {
        notify(`Weather data for ${city} loaded successfully.`);
      }
    } catch (err) {
      notify("City not found, please try again.");
      setError("City not found, please try again.");
      setWeatherData(null);
    }
  };

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Weather App
          </Typography>
          <Switch checked={darkMode} onChange={handleThemeChange} />
          <Typography variant="body1">
            {darkMode ? "Dark Mode" : "Light Mode"}
          </Typography>
        </Toolbar>
      </AppBar>
      <>
        <SearchBar onSearch={handleSearch} />
        {error && <ErrorMessage message={error} />}
        {weatherData && (
          <>
            <WeatherMap key={weatherData.city} weatherData={weatherData} />
            <WeatherDetails details={weatherData.details} />
            <ForecastDisplay forecast={weatherData.forecast} />
            <WeatherChart
              data={weatherData.forecast.map((day) => ({
                date: day.date,
                temperature: day.maxTemp,
                humidity: weatherData.details.humidity,
              }))}
            />
          </>
        )}
        <NewsCarousel />
      </>
    </ThemeProvider>
  );
};

export default App;
