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
    },
    addHistoryRecordToList: async function(screenplayList, userId){
        let response = await axios.get(`http://localhost:3005/history/user-id/${userId}/screenplay-type/episode`)
        let result = response.data
        for(var i in screenplayList){
            if(Object.keys(result).includes(`${screenplayList[i].id}`)){
                screenplayList[i].historyRecord= result[screenplayList[i].id]
            }
        }
    },
    getHistoryRecord: async function(screenplay, userId){
        try {
            let response = await axios.get(`http://localhost:3005/history/user-id/${userId}/screenplay-id/${screenplay.id}/screenplay-type/episode`)
            if(response.status==200){
                screenplay.historyRecord=response.data
            }
        } catch (error) {
            console.log(error.message);
            return screenplay
        }
        
    }
}