require("dotenv").config();

const path = require("path")
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const axios = require('axios')
const port = 5000
const cors = require("cors")

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(path.resolve(__dirname, "../client/build")))
app.use(express.json())
app.use(cors())

app.post("/", (req, res) => {
    let city = req.body;
    console.log(city);
    res.send(city)
})

app.get("/", (req, res) => {
    res.send("Hello World!")
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))