const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: "./config/.env.local" });

const app = express();

app.use(express.json());
app.use(cors({
    origin: [process.env.CLIENT_URL]
}));

app.use('/data', express.static(path.join(__dirname, 'public/data')));
app.use('/models', express.static(path.join(__dirname, 'public/models')));
app.use('/labeled_images', express.static(path.join(__dirname, 'public/labelled_images')));
app.use('/ml', express.static(path.join(__dirname, 'public/ml')));

module.exports = app;