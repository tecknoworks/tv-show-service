const express = require('express')
const router = express.Router()
const EpisodeController= require('../controllers/episode')

router.get('/all', EpisodeController.getAllCtrl);
router.get('/:id', EpisodeController.getByIdCtrl);
router.post('/', EpisodeController.insertCtrl);
router.delete('/:id', EpisodeController.deleteCtrl); 

module.exports= router