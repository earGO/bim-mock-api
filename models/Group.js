const mongoose = require('mongoose')

GroupSchema = new mongoose.Schema({
    name:String,
    tabId:mongoose.Schema.Types.ObjectId,

})

module.exports = mongoose.model('Groups', GroupSchema, 'Groups')
