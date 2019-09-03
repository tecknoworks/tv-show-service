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
    },
    populateModelList: async function(screenplayList){
        let screenplaysDetails = {}
        screenplayList.forEach((screenplay)=>{
            let details={};
            for(property in screenplay){
                if(foreignModels.includes(property)){
                    details[property]=screenplay[property];
                }
            }   
            screenplaysDetails[screenplay.id]=details;
        });

        let response = await axios.post('http://localhost:3001/details/populate/list',screenplaysDetails);

        let result = response.data;
        
        screenplayList.forEach((screenplay, index)=>{
            for(property in screenplay){
                if(foreignModels.includes(property)){
                    screenplayList[index][property]=result[screenplay.id][property];
                }
            }
        });
    }
}