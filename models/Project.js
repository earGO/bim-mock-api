const mongoose = require('mongoose')

ProjectSchema = new mongoose.Schema({
    stage:String,
    dateCreated:Date,
    dateChange:Date,
    dateClosingStage:Date,
    objectName:String,
    addressGenerated:String
})

module.exports = mongoose.model('Projects', ProjectSchema, 'Projects')
