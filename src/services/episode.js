const Episode = require('../models/episode')
const CrudService = require('./crud')

const uploadFile = require('../helpers/upload_file');
const deleteFile = require('../helpers/delete_file');

const assetsServiceUrl = "http://localhost:3002/assets";
const videoServiceUrl = "http://localhost:3003/videos";

const Mapper = require('../helpers/mapper');

module.exports = {
    getAll: async function () {
        let resultList = await Episode.find()
        return resultList.map(doc => doc.toObject())
    },
    getById: async function (episodeId,userId) {
        let episode = await Episode.findById(episodeId);
        let episodeObj = episode.toObject();
        if(userId)
            await Mapper.getHistoryRecord(episodeObj,userId);
        return episodeObj;
    },
    insert: async function (EpisodeMap) {
        EpisodeMap.createdAt=new Date()
        let result = await Episode.create(EpisodeMap)
        return result
    },
    delete: async function (episodeId) {
        let result = await Episode.findByIdAndDelete(episodeId)

        var deleteImageUrl = `${assetsServiceUrl}/image/delete`;
        var deleteVideoUrl = `${videoServiceUrl}/delete`;

        await deleteFile(deleteImageUrl, {key: 'imageFileName', value: result.poster});
        await deleteFile(deleteVideoUrl, {key: 'videoFileName', value: result.video});

        return result.toObject()
    },
    getTvShowSeasons: async function(tvShowId, userId){
        let seasons = {}
        let resultList = await Episode.find()
        let episodes = resultList.map(doc => doc.toObject())
        if(userId){
            await Mapper.addHistoryRecordToList(episodes, userId)
        }
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
    },
    saveMediaFiles: async function(episode, files){
        if(Object.keys(files).length!=0){
            //video upload
            var videoBuffer =  files.video.data;
            videoBuffer.name =  files.video.name;

            var uploadVideoWithPosterUrl =`${videoServiceUrl}/upload-with-poster`

            var videoUploadResponse = await uploadFile(uploadVideoWithPosterUrl, {key: 'video', value: videoBuffer});                

            if(videoUploadResponse){
                episode.video = videoUploadResponse.video.videoFileName;
                episode.runtime = videoUploadResponse.video.runtime;
                episode.poster = videoUploadResponse.imageFileName;
            }
            var updatedEpisode= await episode.save()

            return updatedEpisode;
        }else{
            return episode;
        }
    }
}