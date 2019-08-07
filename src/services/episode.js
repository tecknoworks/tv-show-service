const Episode = require('../models/episode')
const CrudService = require('./crud').CrudService(Episode)

module.exports = {
    ...CrudService,
    getTvShowSeasons: async function(tvShowId){
        let seasons = {}
        let episodes =await CrudService.getAll()
        for(var episode in episodes){
            if(episode.tvshow == tvShowId){
                if(Object.keys(seasons).includes(episode.seasonNo)){
                    seasons[episode.seasonNo]=[episode]
                }else{
                    seasons[episode.seasonNo].push(episode)
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