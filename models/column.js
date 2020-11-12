const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const Column = sequelize.define('column', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    }
});

module.exports = Column;

// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const columnSchema = new Schema({
//     name: {
//         type: String,
//         required: true,
//     },
//     boardId: {
//         type: Schema.Types.ObjectId,
//         ref: 'Column',
//         required: true
//     }
// });

// module.exports = mongoose.model('Column', columnSchema);