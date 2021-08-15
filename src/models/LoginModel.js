const mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment')

const LoginSchema = mongoose.Schema({
    user: { type: Array, required: true },
    token: { type: String, required: true },
    created: { type: Date, default: Date.now }
})

module.exports = mongoose.model('logins', LoginSchema);