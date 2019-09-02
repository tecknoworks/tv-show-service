const express = require('express')
const router = express.Router()
const EpisodeController = require('../controllers/episode')
const TvShowController = require('../controllers/tv_show')

router.get('/all', TvShowController.getAllCtrl);
router.get('/all-by-genre', TvShowController.getTvShowsByGenreCtrl)
router.get('/one', TvShowController.getByIdCtrl);
router.get('/seasons', EpisodeController.getTvShowSeasonsCtrl)
router.post('/insert', TvShowController.insertCtrl);
router.delete('/delete', TvShowController.deleteCtrl);

module.exports= router;
