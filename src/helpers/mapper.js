const axios = require('axios').default

const foreignModels=['actor', 'actorList', 'genre','genreList', 'contentRating', 'contentRatingList', 'producer', 'producerList'];

module.exports= {
    populateModel: async function(ModelObj){
        let idMap={}
        for(property in ModelObj){
            if(foreignModels.includes(property)){
                idMap[property]=ModelObj[property]
            }
        }
        let response = await axios.post('http://localhost:3001/details/populate/map',idMap)
        let result =response.data
        for(property in ModelObj){
            if(foreignModels.includes(property)){
                ModelObj[property]=result[property];
            }
        }
        return ModelObj
    }
}