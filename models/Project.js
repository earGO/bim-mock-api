const mongoose = require('mongoose')

ProjectSchema = new mongoose.Schema({
    stage:String,
    dateCreated:Date,
    dateChange:Date,
    dateClosingStage:Date,
    objectName:String,
    objectNum:String,
    type:String,
    progress:String,
    addressGenerated:String,
    versions:[Number]
})

module.exports = mongoose.model('Projects', ProjectSchema, 'Projects')
