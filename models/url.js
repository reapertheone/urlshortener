const mongoose = require('mongoose')
const {Schema}=mongoose
const urlSchema = new mongoose.Schema({
    word:{
        type:String,
        required:true
    },
    url:{
        type:String,
        required:true
    }
})

const Url=mongoose.model('Url',urlSchema);
module.exports = Url;