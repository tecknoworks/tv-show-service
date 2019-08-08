const Episode = require('../models/episode')
const CrudService = require('./crud')
const EpisodeCrud = CrudService(Episode)

module.exports = {
    ...EpisodeCrud,
    getTvShowSeasons: async function(tvShowId){
        let seasons = {}
        let episodes =await EpisodeCrud.getAll()
        for(var i in episodes){
            if(episodes[i].tvShowId==tvShowId){
                if(Object.keys(seasons).includes(episodes[i].seasonNo.toString())){
                    seasons[episodes[i].seasonNo].push(episodes[i])
                }else{
                    seasons[episodes[i].seasonNo]=[episodes[i]]
                }
            }
        }
        return seasons
        
    },
    getEpisodesForTvShow: async function(tvShowId){
        let episodes= await CrudService.getAll()
        var filtered= episodes.filter(function(value, index, arr){
            return value.tvShowId==tvShowId;
        })
        return filtered
    }
}