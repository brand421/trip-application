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

const uri = process.env.MONGO

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(path.resolve(__dirname, "../client/build")))
app.use(express.json())
app.use(cors())

// setTimeout(function() {
//     mongoose.connect(uri);
// }, 5000)

const searchSchema = new mongoose.Schema({city: String})

const Search = mongoose.model('Search', searchSchema)

app.post("/", (req: Request, res: Response) => {
    let cityName = req.body.city;
    let regex = / /i;
    let cityReplace = cityName.replace(regex, "+")
    const cityResults = new Search({city: cityReplace})
    // console.log(cityResults);
    res.send(cityResults);
})

app.get("/searchresults", (req: Request, res: Response) => {
    let cityName = Search.find()
    const cityList: string[] = [];
    axios.get(`https://api.mapbox.com/search/searchbox/v1/suggest?q=grand+rapids&language=en&limit=5&types=city,locality&session_token=${uuid}&access_token=${mapboxToken}`).then((response: {suggestions: []}) => {
        for (let i = 0; i < response.suggestions.length; i++) {
            cityList.push(response.suggestions[i])
        }
        return cityList;
    }).then((data: { body: { [x: string]: any; }; }) => {
        var name = data.body["name"];
        var place = data.body["place_formatted"]
        res.json({
        city: name,
        place_formatted: place
    });
    })
    
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))