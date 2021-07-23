const localVars = require('../config/localVars')
const mongoose = require('mongoose');
const SpotSchema = new mongoose.Schema({
    thumbnail: String,
    company: String,
    price: String,
    techs: [String],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    toJSON:{
        virtuals: true,
    }
});

SpotSchema.virtual('thumbnail_url').get(
    function(){
        return `${localVars.local}:${localVars.port}/files/${this.thumbnail}`
    }
)

module.exports = mongoose.model('Spot', SpotSchema);