const express = require('express')
const router = express.Router()
const EpisodeController= require('../controllers/episode')
const validateToken = require('../helpers/validate_token');

router.get('/all', EpisodeController.getAllCtrl);
router.get('/one',validateToken, EpisodeController.getByIdCtrl);
router.post('/insert', EpisodeController.insertCtrl);
router.delete('/delete', EpisodeController.deleteCtrl); 

module.exports= router