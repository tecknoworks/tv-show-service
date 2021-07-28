const TvShow = require('../models/tv_show');
const Mapper = require('../helpers/mapper');

const uploadFile = require('../helpers/upload_file');
const deleteFile = require('../helpers/delete_file');
const config = require("../config")

module.exports = {
    getAll: async function () {
        let resultList = await TvShow.find()
        resultList = resultList.map(doc => doc.toObject())
        await Mapper.populateModelList(resultList)
        return resultList
    },
    getById: async function (id) {
        let result = await TvShow.findById(id);
        return result.toObject();
    },
    insert: async function (TvShowMap) {
        TvShowMap.createdAt=new Date()
        let result = await TvShow.create(TvShowMap)
        return result
    },
    delete: async function (id) {
        let tvShow = await TvShow.findByIdAndDelete(id)

        var deleteImageUrl = `${config.assetServiceUrl}/image/delete`;
        var deleteVideoUrl = `${config.videoServiceUrl}/delete`;

        await deleteFile(deleteImageUrl, {key: 'imageFileName', value: tvShow.poster});
        await deleteFile(deleteImageUrl, {key: 'imageFileName', value: tvShow.landscapePoster});
        await deleteFile(deleteVideoUrl, {key: 'videoFileName', value: tvShow.trailer});

        return tvShow.toObject()
    },
    getTvShowsByGenre: async function(){
        let resultList = await TvShow.find()
        let tvShows= resultList.map(doc => doc.toObject())
        await Mapper.populateModelList(tvShows)
        let sorted = {}
        for(var i in tvShows){
            if(Object.keys(sorted).includes(tvShows[i].genre.id)){
                sorted[tvShows[i].genre.id].push(tvShows[i])
            }else{
                sorted[tvShows[i].genre.id]=[tvShows[i]]
            }
        }
        return sorted
    },
    saveMediaFiles: async function(tvShow, files){
        if(Object.keys(files)!=0){
            //portrait image upload
            var portraitImageBuffer =  files.poster.data;
            portraitImageBuffer.name= files.poster.name;

            var uploadImageUrl = `${config.assetServiceUrl}/image/upload`

            var portraitImageUploadResponse = await uploadFile(uploadImageUrl, {key: 'image', value: portraitImageBuffer});
            tvShow.poster = portraitImageUploadResponse == null ? null : portraitImageUploadResponse.imageFileName;

            //landscape
            var landscapeImageBuffer =  files.landscapePoster.data;
            landscapeImageBuffer.name= files.landscapePoster.name;

            var uploadImageUrl = `${config.assetServiceUrl}/image/upload`

            var landscapeImageUploadResponse = await uploadFile(uploadImageUrl, {key: 'image', value: landscapeImageBuffer});
            tvShow.landscapePoster = landscapeImageUploadResponse == null ? null : landscapeImageUploadResponse.imageFileName;

            //video upload
            var videoBuffer =  files.trailer.data;
            videoBuffer.name =  files.trailer.name;
            var uploadVideoWithPosterUrl =`${config.videoServiceUrl}/upload`

            var videoUploadResponse = await uploadFile(uploadVideoWithPosterUrl, {key: 'video', value: videoBuffer});                
            tvShow.trailer = videoUploadResponse!=null ? videoUploadResponse.videoFileName : null;

            //update tv show
            var updatedTvShow = tvShow.save();

            return updatedTvShow;
        }else{
            return tvShow;
        }
    }
}

