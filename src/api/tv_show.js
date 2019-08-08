const express = require('express')
const router = express.Router()
const EpisodeController = require('../controllers/episode')
const TvShowController = require('../controllers/tv_show')

router.get('/all', TvShowController.getAllCtrl);
router.get('/all-by-genre', TvShowController.getTvShowsByGenreCtrl)
router.get('/:id', TvShowController.getByIdCtrl);
router.get('/:id/seasons', EpisodeController.getTvShowSeasonsCtrl)
router.post('/', TvShowController.insertCtrl);
router.delete('/:id', TvShowController.deleteCtrl);

module.exports= router;
