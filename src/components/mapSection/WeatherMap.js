import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import WeatherDisplay from '../weatherSection/WeatherDisplay';
import 'leaflet/dist/leaflet.css';
import './WeatherMap.css';

const WeatherMap = ({ weatherData }) => {
    const { lat, lon, city } = weatherData;

    return (
        <div className="weather-map-container">
            <WeatherDisplay weatherData={weatherData} className="weather-display" />
            <div className="map-wrapper">
                <MapContainer center={[lat, lon]} zoom={10} className="map-container" >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
                    />
                    <Marker position={[lat, lon]}>
                        <Popup>
                            {city}
                        </Popup>
                    </Marker>
                </MapContainer>
            </div>
        </div>
    );
};

export default WeatherMap;
