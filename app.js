const express = require('express');
const bodyParser = require('body-parser');

//MODELS
const User = require('./models/user');
const Card = require('./models/card');
const Column = require('./models/column');
const Board = require('./models/board');

// ROUTES
const cardRoutes = require('./routes/card');
const authRoutes = require('./routes/auth');

const app = express();
const sequelize = require('./utils/database');
app.use(bodyParser.urlencoded({extended: false}));
app.use((req,res, next) =>{
    res.setHeader('Access-Control-Allow-Origin',  '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
})



app.use('/board',cardRoutes);
app.use('/auth', authRoutes);

app.use( (error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({
        message: message,
        data: data
    });
})


Column.hasMany(Card);
Board.hasMany(Column);
User.hasMany(Board);

sequelize.sync()
.then( () => console.log('se conecto'))
.catch( (error) => console.log('che, se rompio esto', error));

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
