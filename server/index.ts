require("dotenv").config();
import express, {Request, Response } from "express";
import {v4 as uuidv4} from 'uuid';
const path = require("path")
const app = express()
const bodyParser = require('body-parser')
const axios = require('axios')
const port = 5000
const cors = require("cors")

const uuid = uuidv4();
const mongoose = require("mongoose")

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(path.resolve(__dirname, "../client/build")))
app.use(express.json())
app.use(cors())


app.post("/searchresults", (req: Request, res: Response) => {
    let cityName = req.body.city;
    const cityResults = new Results({city: cityName})
    console.log(cityResults);
    res.send(cityResults);
})

app.get("/", (req: Request, res: Response) => {
    const mapboxToken = process.env.MAPBOX_API;
    axios.get(`https://api.mapbox.com/search/searchbox/v1/suggest?q=${cityReplace}&language=en&limit=5&types=city,locality&session_token=${uuid}&access_token=${mapboxToken}`)
    res.send("Hello World!")
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))