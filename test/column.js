// const Column = require("../models/column");
// const expect = require("chai").expect;
// const columnController = require("../controller/column");
// const sequelize = require("../utils/database");
// const User = require("../models/user");
// const Board = require("../models/board");
// const Card = require("../models/card");
// const users = require("./dummy/dummy-users");
// describe("Column Controller", () => {
//   const columnName = "My column";
//   let dummyColumn = {
//     name: "My column"
//   };
//   let dummyUser;
//   let dummyBoard;
//   before((done) => {
//     Column.hasMany(Card);
//     Board.hasMany(Column);
//     User.hasMany(Board, {
//       onUpdate: "CASCADE",
//     });
//     sequelize
//       .sync({ force: true })
//       .then(() => {
//         console.log("connected")
//       })
//       .then(() => {
//         return User.create(users.firstDummyUser, {
//           raw: true,
//         });
//       })
//       .then((createdUser) => {
//         dummyUser = createdUser.dataValues;
//         return dummyUser.id;
//       })
//       .then((userId) => {
//         console.log('userId', userId);
//         done();
//       })
//       .catch((error) => console.log(error));
//   });
//   it("Should create a column", () => {
//     console.log('first column id');
//   })
//   after(() => {
//     return Column.destroy({})
//   })
// })