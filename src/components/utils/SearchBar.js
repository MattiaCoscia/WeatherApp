import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

const SearchBar = ({ onSearch }) => {
    const [city, setCity] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (city.trim()) {
            onSearch(city);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', justifyContent: 'center', mb: 3, marginTop: 5 }}>
            <TextField
                variant="outlined"
                label="Enter city name"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                sx={{ marginRight: 2 }}
            />
            <Button variant="contained" type="submit" color="primary">
                Search
            </Button>
        </Box>
    );
};

export default SearchBar;
