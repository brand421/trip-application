require("dotenv").config();
import express, {Request, Response } from "express";
const path = require("path")
const app = express()
const bodyParser = require('body-parser')
const axios = require('axios')
const port = 5000
const cors = require("cors")
const mongoose = require("mongoose")

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(path.resolve(__dirname, "../client/build")))
app.use(express.json())
app.use(cors())

const mongo=process.env.MONGO;

mongoose.connect(mongo);

const resultsSchema = new mongoose.Schema({city: String})

const Results = mongoose.model('Results', resultsSchema)

app.post("/searchresults", (req: Request, res: Response) => {
    let cityName = req.body.city;
    const cityResults = new Results({city: cityName})
    console.log(cityResults);
    res.send(cityResults);
})

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!")
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))