const mongoose = require('mongoose')

let Schema = new mongoose.Schema({
    guildid : String,
    livechat : String,
})

module.exports = mongoose.model('setchannel', Schema)