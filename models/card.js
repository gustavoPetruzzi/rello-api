const Sequelize = require("sequelize");

const sequelize = require("../utils/database");

const Card = sequelize.define("card", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  content: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  image: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  deleted: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Card;

// const mongoose = require('mongoose');

// const Schema = mongoose.Schema;

// const cardSchema = new Schema({
//     title: {
//         type: String,
//         required: true
//     },
//     content: {
//         type: String,
//         required: true
//     },
//     // userOwner:{
//     //     type: Schema.Types.ObjectId,
//     //     ref: 'User',
//     //     required: true
//     // }
// });

// module.exports = mongoose.model('Card', cardSchema);

// export interface Card{
//     id: string;
//     title: string;
//     content: string;
//     userOwner: User;
//     relatedUsers: User[];
// }
