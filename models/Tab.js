const mongoose = require('mongoose')

TabsSchema = new mongoose.Schema({
    name:String,
    projectId:mongoose.Schema.Types.ObjectId,

})

module.exports = mongoose.model('Tabs', TabsSchema, 'Tabs')
