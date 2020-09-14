const express = require('express');
require('dotenv').config()
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const Boom = require('boom');
const app = express();
const db = require("./database");

const routes = require('./routes');
const interceptors = require('./interceptors');
const port = 3001;

app.use(cors());
interceptors.init();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

app.use((req, res, next) => next({status: 404}));

app.use((error, req, res) => {
    console.log(error.stack);

    if (error.status === 404) res.json(Boom.notFound('Not found!'));
    res.json(Boom.badImplementation('An internal server error occurred!'));
});

db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to the database!");
        app.listen(port, () => console.log(`App is listening on port: ${port}`));
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });

module.exports = app;
