

const mongoose = require('mongoose')

const connection = mongoose.connect("mongodb://localhost:27017/auth")
.then(()=>{
    console.log('connection successful')
}).catch(err => console.log('connection failed', err))

module.exports = connection;