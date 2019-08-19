const mongoose = require('mongoose')

ProjectSchema = new mongoose.Schema({
    stage:String,
    dateCreated:Date,
    dateChange:Date,
    dateClosingStage:Date,
    objectName:String,
    addressGenerated:String,
    relatedProjects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Projects'
    }],

})

module.exports = mongoose.model('Projects', ProjectSchema, 'Projects')
