const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const logger = require('morgan')

const app = express()
const port = 3004
mongoose.connect('mongodb://localhost:27017/tv_shows', { useNewUrlParser: true })

app.use(cors())
app.use(bodyParser.json())
app.use(logger('dev'));

const seeder = require('./seeders/index')
// seeder.seed().then(()=>console.log("Done seeding!"))

const router = require('./api/index')

app.use('/tv-shows',router)

app.listen(port, ()=> console.log(`tv-show-service listens on port ${port}.`));

