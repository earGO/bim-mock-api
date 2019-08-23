const mongoose = require('mongoose')

FieldSchema = new mongoose.Schema({
    name:String,
    value:String,
    type:String,
    groupId:mongoose.Schema.Types.ObjectId,
    sort:Number,
    userElement:Boolean
})

module.exports = mongoose.model('Fields', FieldSchema, 'Fields')
