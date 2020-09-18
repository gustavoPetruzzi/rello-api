const express = require('express');
const cardRoutes = require('./routes/card');

const app = express();


app.use(cardRoutes);

app.listen(3001, () => {
    console.log('App listening on port 3001!');
});