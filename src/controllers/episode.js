const EpisodeService = require('../services/episode')

module.exports={
    getAllCtrl: async function (req, res) {
        try {
            res.send( await EpisodeService.getAll() )
        } catch (error) {
            res.send(error.message)
        }
        
    },
    getByIdCtrl: async function (req, res){
        try {
            res.send( await EpisodeService.getById(req.query.episodeId, req.userId))
        } catch (error) {
            res.send(error.message)
        }
        
    },
    insertCtrl: async function (req, res){
        try {
            var episode = await EpisodeService.insert(req.body);
            var episode = await EpisodeService.saveMediaFiles(episode, req.files);

            var episodeObj = episode.toObject();
            
            res.send(episodeObj)
        } catch (error) {
            res.send(error.message)
        }
        
    },
    deleteCtrl: async function(req, res){
        try {
            res.send( await EpisodeService.delete(req.query.episodeId))
        } catch (error) {
            res.send(error.message)
        }
        
    },
    getTvShowSeasonsCtrl: async function(req, res){
        try {
            res.send(await EpisodeService.getTvShowSeasons(req.query.tvShowId, req.userId))
        } catch (error) {
           res.send(error.message) 
        }
    }
}