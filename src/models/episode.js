const mongoose = require('mongoose');
const schemaBuilder = require('../helpers/schema_builder').schemaBuilder;

module.exports = mongoose.model('episode', schemaBuilder({
    title: String,
    description: String,
    seasonNo: Number,
    episodeNo: Number,
    tvShowId: { type: mongoose.Schema.Types.ObjectId, ref: 'tvShow' },
    releaseDate: Date,
    createdAt: Date,
    runtime: Number
}))