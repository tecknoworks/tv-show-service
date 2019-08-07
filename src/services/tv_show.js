const TvShow = require('../models/tv_show');
const CrudService = require('./crud');

module.exports = {
    ...CrudService(TvShow),
}

