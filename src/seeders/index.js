const TvShow = require('../models/tv_show')
const Episode = require('../models/episode')
const axios = require('axios')
const faker = require('faker')

module.exports={
    seed: async function(){
        await TvShow.deleteMany()
        await Episode.deleteMany()

        var response1 = await axios.get('http://localhost:3001/details/genre/all');
        var genreList= Array.from(response1.data);
        
        var response2 = await axios.get('http://localhost:3001/details/actor/all');
        var actorList= Array.from(response2.data);

        
        var response3 = await axios.get('http://localhost:3001/details/content-rating/all');
        var contentRatingList= Array.from(response3.data);

        var response4 = await axios.get('http://localhost:3001/details/producer/all');
        var producerList= Array.from(response4.data);

        for(var i=0;i<=5;i++){
            await TvShow.create({
                title: faker.name.title(),
                description: faker.lorem.paragraphs(2,'.'),
                producer: producerList[faker.random.number(producerList.length-1)].id,
                releaseDate: faker.date.past(),
                createdAt: faker.date.recent(1),
                genre: genreList[faker.random.number(genreList.length-1)].id,
                contentRating: contentRatingList[faker.random.number(contentRatingList.length-1)].id,
                userRating: faker.random.number(10),
                actorList: [ 
                    actorList[faker.random.number(actorList.length-1)].id,
                    actorList[faker.random.number(actorList.length-1)].id,
                    actorList[faker.random.number(actorList.length-1)].id
                ],
                poster: `mv${(faker.random.number(3))+1}`,
                video: 'no-avaiable',
                trailer: 'https://www.youtube.com/embed/LoebZZ8K5N0',
                seasonsNo: 12
            }).then(async (tvshow)=>{
                for(var j=1;j<=12;j++){
                    for(var k=1;k<=3;k++){
                        await Episode.create({
                            title: faker.name.title(),
                            description: faker.lorem.paragraphs(2,'.'),
                            seasonNo: j,
                            episodeNo: k,
                            tvShowId: tvshow._id,
                            releaseDate: faker.date.past(10),
                            createdAt: new Date(),
                            runtime: faker.random.number(10000)
                        })
                    }
                }
            })
        }
    }
}