const TvShow = require('../models/tv_show');

const uploadFile = require('../helpers/upload_file');
const deleteFile = require('../helpers/delete_file');

const assetsServiceUrl = "http://localhost:3002/assets";
const videoServiceUrl = "http://localhost:3003/videos";


module.exports = {
    getAll: async function () {
        let resultList = await TvShow.find()
        return resultList.map(doc => doc.toObject())
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

        var deleteImageUrl = `${assetsServiceUrl}/image/delete`;
        var deleteVideoUrl = `${videoServiceUrl}/delete`;

        await deleteFile(deleteImageUrl, {key: 'imageFileName', value: tvShow.poster});
        await deleteFile(deleteVideoUrl, {key: 'videoFileName', value: tvShow.trailer});

        return tvShow.toObject()
    },
    getTvShowsByGenre: async function(){
        let resultList = await TvShow.find()
        let tvShows= resultList.map(doc => doc.toObject())

        let sorted = {}
        for(var i in tvShows){
            if(Object.keys(sorted).includes(tvShows[i].genre)){
                sorted[tvShows[i].genre].push(tvShows[i])
            }else{
                sorted[tvShows[i].genre]=[tvShows[i]]
            }
        }
        return sorted
    },
    saveMediaFiles: async function(tvShow, files){
        if(Object.keys(files)!=0){
            //image upload
            var imageBuffer =  files.poster.data;
            imageBuffer.name= files.poster.name;
            var uploadImageUrl = `${assetsServiceUrl}/image/upload`

            var imageUploadResponse = await uploadFile(uploadImageUrl, {key: 'image', value: imageBuffer});
            tvShow.poster = imageUploadResponse == null ? null : imageUploadResponse.imageFileName;

            //video upload
            var videoBuffer =  files.trailer.data;
            videoBuffer.name =  files.trailer.name;
            var uploadVideoWithPosterUrl =`${videoServiceUrl}/upload`

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

