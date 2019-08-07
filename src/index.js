const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()
const router = express.Router()
const port = 3004
mongoose.connect('mongodb://localhost:27017/tv_shows', { useNewUrlParser: true })

app.use(cors())
app.use(bodyParser.json())

router.get('/', (req,res)=>res.send('Hai ca merge.'))

app.use('/tv-shows',router)

app.listen(port, ()=> console.log(`tv-show-service listens on port ${port}.`));

