const express = require('express')
const connection = require("./dbconnect")
const mentors = require('./router/auth')
const quote = require('./router/quote')
const app = express()

connection.then(() => {
    console.log('Connection successful');
  }).catch(err => console.log('Connection failed', err));
  

app.use(express.json())

app.use(mentors)
app.use(quote)
const port = process.env.PORT || 3011
app.listen(port,()=>{console.log(`running in ${port}`)})
