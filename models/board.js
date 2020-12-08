const Sequelize = require("sequelize");

const sequelize = require("../utils/database");
const User = require("./user");

const Board = sequelize.define("board", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
  },
  deleted: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: "id",
    },
    allowNull: false,
  },
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
