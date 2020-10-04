const mongoose = require('mongoose');
const { schema } = require('./card');
const Schema = mongoose.Schema;

const userSchena = new Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('User', userSchena);