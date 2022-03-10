const express = require('express')
const app = express()
const mongoose = require('mongoose')

//connexion database with server
const mongoUrl ="mongodb+srv://walid123:walid123@user.8kzjw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
// parse the data

app.use(express.json());
app.use('/contact',require('./Routes/contactRoutes'))
mongoose.connect(mongoUrl, (err)=>{
    err?console.log(err):console.log('database is connected')
    });


const port = 5000
app.listen(port,(err)=> {
    err ? console.log(err) : console.log ('server is running on port 5000')
})