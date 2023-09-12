require("dotenv").config();
import express, {Request, Response } from "express";
import {v4 as uuidv4} from 'uuid';
const path = require("path")
const app = express()
const bodyParser = require('body-parser')
const axios = require('axios')
const port = 5000
const cors = require("cors")

const mongoose = require("mongoose")
const uuid = uuidv4();
const mapboxToken = process.env.MAPBOX_API!;

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(path.resolve(__dirname, "../client/build")))
app.use(express.json())
app.use(cors())

const searchSchema = new mongoose.Schema({city: String})

const Search = mongoose.model('Search', searchSchema)

app.post("/", (req: Request, res: Response) => {
    let cityName = req.body.city;
    const cityResults = new Search({city: cityName})
    console.log(cityResults);
    res.send(cityResults);
})

app.get("/", (req: Request, res: Response) => {
    const cityName = req.body.city;
    axios.get(`https://api.mapbox.com/search/searchbox/v1/suggest?q=${cityName}&language=en&limit=5&types=city,locality&session_token=${uuid}&access_token=${mapboxToken}`)
    console.log(cityName);
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))