const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const Board = sequelize.define('board', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
    }
});

module.exports = Board;
// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const boardSchema = new Schema({
//     name: {
//         type: String,
//         required: true,
//     },
//     userOwner: {
//         type: Schema.Types.ObjectId,
//         ref: 'User',
//         required: true,
//     }
// });

// module.exports = mongoose.model('Board', boardSchema);

