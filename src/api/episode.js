const express = require('express')
const router = express.Router()
const EpisodeController= require('../controllers/episode')

router.get('/all', EpisodeController.getAllCtrl);
router.get('/one', EpisodeController.getByIdCtrl);
router.post('/insert', EpisodeController.insertCtrl);
router.delete('/delete', EpisodeController.deleteCtrl); 

module.exports= router