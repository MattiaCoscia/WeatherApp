import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import WeatherDisplay from '../weatherSection/WeatherDisplay';
import 'leaflet/dist/leaflet.css';
import './WeatherMap.css';
import L from 'leaflet';

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
                    <Marker position={[lat, lon]} icon={L.icon({
                        iconUrl: 'https://cdn.iconscout.com/icon/free/png-256/weather-152-1523649.png',
                        iconSize: [25, 41],
                        iconAnchor: [12, 41],
                        popupAnchor: [0, -41],
                    })}>
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
