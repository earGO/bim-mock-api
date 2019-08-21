const mongoose = require('mongoose')

PrivateNavigationSchema = new mongoose.Schema({
    name:String

})

module.exports = mongoose.model('PrivateNavigation', PrivateNavigationSchema, 'PrivateNavigation')
