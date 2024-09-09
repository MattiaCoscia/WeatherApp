import React from 'react';
import { Typography, Box } from '@mui/material';

const ForecastDisplay = ({ forecast }) => {
    return (
        <Box display="flex" justifyContent="center" mt={3}>
            {forecast.map((day) => (
                <Box key={day.date} mx={2} textAlign="center" sx={{ boxShadow: 3, p: 2, borderRadius: 2 }}>
                    <Typography variant="h6">{day.date}</Typography>
                    <Typography variant="body1">
                        {day.condition}
                    </Typography>
                    <Typography variant="body1">
                        Max: {day.maxTemp}°C
                    </Typography>
                    <Typography variant="body1">
                        Min: {day.minTemp}°C
                    </Typography>
                </Box>
            ))}
        </Box>
    );
};

export default ForecastDisplay;
