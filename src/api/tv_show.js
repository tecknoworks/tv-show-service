const express = require('express')
const router = express.Router()
const EpisodeController = require('../controllers/episode')
const TvShowController = require('../controllers/tv_show')
const validatetoken = require('../helpers/validate_token');

router.get('/all', TvShowController.getAllCtrl);
router.get('/all-by-genre', TvShowController.getTvShowsByGenreCtrl)
router.get('/one', TvShowController.getByIdCtrl);
router.get('/seasons',validatetoken, EpisodeController.getTvShowSeasonsCtrl)
router.post('/insert', TvShowController.insertCtrl);
router.delete('/delete', TvShowController.deleteCtrl);

module.exports= router;
