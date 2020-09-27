const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cardRoutes = require('./routes/card');
const session = require('express-session');
const MongoDbStore = require('connect-mongodb-session')(session);

// const store = new MongoDbStore({
//     uri: 'mongodb+srv://yusti:y1161544761c@cluster0.ej3hr.mongodb.net/shop?retryWrites=true&w=majority',
//     collection: 'sessions'
// });
const app = express();
app.use(bodyParser.urlencoded({extended: false}));
// app.use(session({
//     secret: 'my secret',
//     resave: false,
//     saveUninitialized: false,
//     store: store
// }));
app.use((req,res, next) =>{
    res.setHeader('Access-Control-Allow-Origin',  '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
})

app.use(cardRoutes);

mongoose
    .connect(
        'mongodb+srv://yusti:y1161544761c@cluster0.ej3hr.mongodb.net/rello?retryWrites=true&w=majority',
        { 
            useNewUrlParser: true,
            useUnifiedTopology: true, 
        }
    )
    .then(() =>{
        app.listen(3000,() =>{
            console.log('App running!');
        })
    })
    .catch(err =>console.log("mongo error", err));
