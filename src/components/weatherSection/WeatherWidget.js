import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const WeatherWidget = ({ weatherData }) => {
    if (!weatherData) return null;

    return (
        <Card sx={{ maxWidth: 345, margin: 'auto' }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {weatherData.city}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {weatherData.condition}
                </Typography>
                <Typography variant="h6" component="div">
                    {weatherData.temperature}°C
                </Typography>
            </CardContent>
        </Card>
    );
};

export default WeatherWidget;
