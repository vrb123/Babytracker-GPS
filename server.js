const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const config = require('./config');
const routes = require('./routes');


const app = express();

app.use(cors());
// // parse application/json
app.use(bodyParser.json());

// app.use(express.json())
app.use(bodyParser.urlencoded({
    extended: false
}));

//Connect to DB
mongoose.connect(config.dbConnection, {useUnifiedTopology: true, useNewUrlParser: true } ,() => {
    console.log('Connected to database');
});

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));
    app.get('*', (req, res) => { 
         res.sendFile(path.join(__dirname+'/client/public/index.html'));
    });
}

app.get('/', (req,res) => {
    res.send('Hello world');
});

app.use('/auth',routes.auth);
app.use('/car',routes.car);
app.use('/manager',routes.manager);
app.use('/driver',routes.driver);
app.use('/user',routes.user);
app.use('/location',routes.location);


app.listen(config.PORT,() => {
    console.log(`Listening to ${config.PORT} port`);
});