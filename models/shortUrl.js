const mongoose = require('mongoose')
const shortId = require('shortid')

const shortUrlSchema = new mongoose.Schema({
    full:{
        type: String,
        required: true
    },
    short: {
        type: String,
        required: true,
        default: shortId.generate
    },
    Clicks: {
        type: Number,
        required: true,
        default: 0
    },
    Notes:{
        type: String,
        required: true,
        default: "not added"
    }
})

module.exports = mongoose.model('shortUrl', shortUrlSchema)
