const TvShow = require('../models/tv_show');
const CrudService = require('./crud');
const TvShowCrud = CrudService(TvShow)
module.exports = {
    ...TvShowCrud,
    getTvShowsByGenre: async function(){
        let tvShows= await TvShowCrud.getAll()
        let sorted = {}
        for(var i in tvShows){
            if(Object.keys(sorted).includes(tvShows[i].genre)){
                sorted[tvShows[i].genre].push(tvShows[i])
            }else{
                sorted[tvShows[i].genre]=[tvShows[i]]
            }
        }
        return sorted
    }
}

