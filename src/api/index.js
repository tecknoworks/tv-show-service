const express = require('express')
const router = express.Router()

const tvShowRouter = require('./tv_show')
const episodeRouter = require('./episode')

router.use('/', tvShowRouter);
router.use('/episode', episodeRouter);

module.exports = router;