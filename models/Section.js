const mongoose = require('mongoose')

SectionsSchema = new mongoose.Schema({
    name:String,
    tabId:mongoose.Schema.Types.ObjectId,

})

module.exports = mongoose.model('Sections', SectionsSchema, 'Sections')
