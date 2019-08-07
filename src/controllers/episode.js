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
            res.send( await EpisodeService.getById(req.params.id))
        } catch (error) {
            res.send(error.message)
        }
        
    },
    insertCtrl: async function (req, res){
        try {
            res.send( await EpisodeService.insert(req.body))
        } catch (error) {
            res.send(error.message)
        }
        
    },
    deleteCtrl: async function(req, res){
        try {
            res.send( await EpisodeService.delete(req.params.id))
        } catch (error) {
            res.send(error.message)
        }
        
    },
    getTvShowSeasonsCtrl: async function(req, res){
        try {
            res.send(await EpisodeService.getTvShowSeasons(req.params.id))
        } catch (error) {
           res.send(error.message) 
        }
    }
}