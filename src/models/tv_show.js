const mongoose = require('mongoose');
const schemaBuilder = require('../helpers/schema_builder').schemaBuilder;

module.exports = mongoose.model('tvShow', schemaBuilder({
    title: String,
    producer: String,
    description: String,
    releaseDate: Date,
    createdAt: Date,
    genre: String,
    contentRating: String,
    userRating: Number,
    actorList: [String],
    poster: String,
    trailer: String,
    seasonsNo: Number,
}))
