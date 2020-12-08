const Sequelize = require("sequelize");

const sequelize = require("../utils/database");

const User = sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  // add bcrypt to store password
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = User;

// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const userSchema = new Schema({
//     email: {
//         type: String,
//         required: true,
//     },
//     password: {
//         type: String,
//         required: true,
//     },
//     name: {
//         type: String,
//         required: true,
//     },
//     lastName: {
//         type: String,
//         required: true,
//     }
// });

// module.exports = mongoose.model('User', userSchema);
