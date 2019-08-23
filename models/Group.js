const mongoose = require('mongoose')

GroupSchema = new mongoose.Schema({
    name:String,
    sectionId:mongoose.Schema.Types.ObjectId,
    sort:Number,
    userElement:Boolean,
    version:Number
})

module.exports = mongoose.model('Groups', GroupSchema, 'Groups')
