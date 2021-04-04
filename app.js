const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');

const app = express();

// Added for Pug
app.set('view engine', 'pug');
app.set('views', 'views');

const btcChartRoute = require('./routes/btcChart');

// Body parser, reading data from body into req.body
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(btcChartRoute);
app.use(errorController.get404);

mongoose.connect('mongodb+srv://cem92:Cem.2010405084@cluster0.b7ysd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority').then(result => {
    app.listen(3000);
}).catch(err => {
    console.log(err);
});