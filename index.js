// dot env
require('dotenv').config();

const express = require('express');
const http = require('http');
const app = express();
const port = process.env.PORT || 6000;  // Ensure PORT is read from the environment if available
const cors = require('cors');
require('./config/database/db');
const router = require('./router');
const morgan = require('morgan');

// CORS configuration
app.use(cors({
    origin: "*",  // Allow all origins
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));

// Test route
app.get("/", (req, res) => {
    res.json({
        message: "Welcome to the backend"
    });
});

// Use custom router
app.use(router);

// Create HTTP server
http.createServer(app).listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});