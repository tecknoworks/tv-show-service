const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const logger = require('morgan')
const fileUpload = require('express-fileupload')
const config = require("./config")

const app = express()
const port = 3004
mongoose.connect(config.batabaseUrl, { useNewUrlParser: true })

app.use(cors())
app.use(bodyParser.json())
app.use(logger('dev'));
app.use(fileUpload())

const router = require('./api/index')

app.use('/tv-shows',router)

app.listen(port, ()=> console.log(`tv-show-service listens on port ${port}.`));

