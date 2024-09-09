import React from 'react';
import { Typography } from '@mui/material';

const ErrorMessage = ({ message }) => {
    return (
        <Typography variant="body2" color="error" align="center">
            {message}
        </Typography>
    );
};

export default ErrorMessage;
