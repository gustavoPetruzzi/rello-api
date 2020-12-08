const express = require("express");
const bodyParser = require("body-parser");

//MODELS
const User = require("./models/user");
const Card = require("./models/card");
const Column = require("./models/column");
const Board = require("./models/board");

// ROUTES
const cardRoutes = require("./routes/card");
const authRoutes = require("./routes/auth");
const boardRoutes = require("./routes/board");
const app = express();
const sequelize = require("./utils/database");
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

app.use("/boards", boardRoutes);
app.use("/auth", authRoutes);

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({
    message: message,
    data: data,
  });
});

Column.hasMany(Card);
Board.hasMany(Column);
User.hasMany(Board, {
  onUpdate: "CASCADE",
});

sequelize
  .sync()
  .then(() => {
    console.log("se conecto");
    return app.listen(3000);
  })
  .catch((error) => console.log("che, se rompio esto", error));

module.exports = app;
// mongoose
//     .connect(
//         'mongodb+srv://yusti:y1161544761c@cluster0.ej3hr.mongodb.net/rello?retryWrites=true&w=majority',
//         {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         }
//     )
//     .then(() =>{
//         app.listen(3000,() =>{
//             console.log('App running!');
//         })
//     })
//     .catch(err =>console.log("mongo error", err));
