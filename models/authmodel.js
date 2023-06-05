const mongoose = require('mongoose')

const authSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        required: "Email should be unique and mandatory"
    },
    flag:{
        type: Number,
        default: 0
    },
    hashedPassword:{
        type: String,
        required: true
    }
})
const Authmodel = mongoose.model('Authmodel', authSchema)
module.exports = Authmodel