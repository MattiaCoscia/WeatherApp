import React from 'react';
import { Typography, Box } from '@mui/material';

const WeatherDisplay = ({ weatherData }) => {
    return (
      <Box textAlign="center" style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", marginLeft: "150px" }}>
            <Typography variant="h4" component="h2">
                {weatherData.city}
            </Typography>
            <Typography variant="h5">
                Temperature: {weatherData.temperature}°C
            </Typography>
            <Typography variant="h6">
                Condition: {weatherData.condition}
            </Typography>
            <Typography variant="h6">
                Country: {weatherData.country}
            </Typography>
        </Box>
    );
};

export default WeatherDisplay;
