const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cardRoutes = require('./routes/card');
const authRoutes = require('./routes/auth');
const app = express();
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
