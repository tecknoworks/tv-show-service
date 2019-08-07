const TvShowService = require('../services/tv_show')
const Mapper = require('../helpers/mapper')
module.exports={
    getAllCtrl: async function (req, res) {
        try {
            let tvShowList =  await TvShowService.getAll() 
            for(var i=0;i<tvShowList.length;i++){
                tvShowList[i] = await Mapper.populateModel(tvShowList[i])
            }
            res.send(tvShowList)
        } catch (error) {
            res.send(error.message)
        }
        
    },
    getByIdCtrl: async function (req, res){
        try {
            let tvShow = await TvShowService.getById(req.params.id)
            tvShow = await Mapper.populateModel(tvShow)
            res.send(tvShow)
        } catch (error) {
            res.send(error.message)
        }
        
    },
    insertCtrl: async function (req, res){
        try {
            let tvShow = await TvShowService.insert(req.body)
            tvShow = await Mapper.populateModel(tvShow)
            res.send( tvShow )
        } catch (error) {
            res.send(error.message)
        }
        
    },
    deleteCtrl: async function(req, res){
        try {
            let tvShow = await TvShowService.delete(req.params.id)
            tvShow = await Mapper.populateModel(tvShow)
            res.send( tvShow )
        } catch (error) {
            res.send(error.message)
        }
        
    }
}