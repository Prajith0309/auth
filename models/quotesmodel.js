const mongoose = require('mongoose')

const quoteSchema = new mongoose.Schema({
    quote:{
        type: String,
        required: true,
        trim: true
    },
    created_at:{
        type: String,
        required: true,
        trim: true
    }
})
const Quotemodel = mongoose.model('Quotemodel', quoteSchema)
module.exports = Quotemodel