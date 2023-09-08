require("dotenv").config();
import express, {Request, Response } from "express";
const path = require("path")
const app = express()
const bodyParser = require('body-parser')
const axios = require('axios')
const port = 5000
const cors = require("cors")



app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(path.resolve(__dirname, "../client/build")))
app.use(express.json())
app.use(cors())

app.post("/searchresults", (req: Request, res: Response) => {
    let city = req.body.city;
    console.log(city);
    res.send(city);
})

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!")
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))