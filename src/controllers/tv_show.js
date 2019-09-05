const TvShowService = require('../services/tv_show')
const Mapper = require('../helpers/mapper')
module.exports={
    getAllCtrl: async function (req, res) {
        try {
            let tvShowList = await TvShowService.getAll() 
            res.send(tvShowList)
        } catch (error) {
            res.send(error.message)
        }
        
    },
    getByIdCtrl: async function (req, res){
        try {
            let tvShow = await TvShowService.getById(req.query.tvShowId)
            tvShow = await Mapper.populateModel(tvShow)
            res.send(tvShow)
        } catch (error) {
            res.send(error.message)
        }
        
    },
    insertCtrl: async function (req, res){
        try {

            let tvShowMap = req.body;
            tvShowMap.actorList = JSON.parse(tvShowMap.actorList);

            let tvShow = await TvShowService.insert(tvShowMap)

            tvshow = TvShowService.saveMediaFiles(tvShow, req.files);

            let tvShowObj = tvShow.toObject()
            tvShowObj = await Mapper.populateModel(tvShowObj)
            res.send( tvShowObj )
        } catch (error) {
            res.send(error.message)
        }
        
    },
    deleteCtrl: async function(req, res){
        try {
            let tvShow = await TvShowService.delete(req.query.tvShowId)
            tvShow = await Mapper.populateModel(tvShow)
            res.send( tvShow )
        } catch (error) {
            res.send(error.message)
        }
        
    },
    getTvShowsByGenreCtrl: async function(req,res){
        try {
            let sortedList = await TvShowService.getTvShowsByGenre()
            res.send(sortedList)

        } catch (error) {
            res.send(error.message)
        }
    }
}