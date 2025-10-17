import express from 'express';
import "dotenv/config";
import app from './app.js'


const PORT = process.env.PORT;

const startServer = () => {

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

startServer();