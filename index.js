const fs = require("fs/promises");
const express = require("express");
const cors = require("cors");
const _ = require("lodash");
const { v4: uuid } = require("uuid");

const app = express();

app.get("/ski", (req, res) => {
    const mountains = ["Alyeska", "Santa Fe", "Whistler", "Beaver Creek"];
    const weather = ["Snow", "Cloudy", "Sunny"];

    res.json({
        mountain: _.sample(mountains),
        weather: _.sample(weather)
    });
});

app.listen(3000, () => console.log("API Server is running..."));