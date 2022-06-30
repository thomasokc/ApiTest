const fs = require("fs/promises");
const express = require("express");
const cors = require("cors");
const _ = require("lodash");
const { v4: uuid } = require("uuid");

const app = express();

app.use(express.json());

app.get("/ski", (req, res) => {
    const mountains = ["Alyeska", "Santa Fe", "Whistler", "Beaver Creek"];
    const weather = ["Snow", "Cloudy", "Sunny"];

    res.json({
        mountain: _.sample(mountains),
        weather: _.sample(weather)
    });
});

app.get("/comments/:id", async (req,res) => {
    const id = req.params.id;
    let content;

    try {
        content = await fs.readFile(`data/comments/${id}.txt`, "utf-8")
    } catch (err) {
        return res.sendStatus(404);
    }

    res.json({
        content: content
    });
});

app.post("/comments", async (req, res) => {
    const id = uuid();
    const content = req.body.content;

    if (!content) {
        return res.sendStatus(400);
    }

    await fs.mkdir('data/comments', {recursive: true})
    await fs.writeFile(`data/comments/${id}.txt`, content);

    res.status(201).json({
        id: id
    });
});

app.listen(3000, () => console.log("API Server is running..."));