import React from 'react';
import { Typography, Box } from '@mui/material';

const WeatherDetails = ({ details }) => {
    return (
        <Box textAlign="center">
            <Typography variant="body1">
                Humidity: {details.humidity}%
            </Typography>
            <Typography variant="body1">
                Wind Speed: {details.windSpeed.toFixed(2)} m/s
            </Typography>
        </Box>
    );
};

export default WeatherDetails;
