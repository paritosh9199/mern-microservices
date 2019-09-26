/* Env config and Env Initialiser */
let argv = require('minimist')(process.argv.slice(2));
// console.log(argv);

let { initEnv, makeid } = require('./config/config');
const env = initEnv(argv.env)

/* dependencies */
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
/*  Database handlers */
let { mongoose } = require('./database/mongoose');

let session = require('express-session');
const MongoStore = require('connect-mongo')(session);
let path = require('path');

/* body parser */
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

/* Session */
app.use(session({
    secret: makeid(12),
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}))


/* view engine */
// app.set('views', __dirname + '/views');
// app.set('view engine', 'ejs');

/* Env Controller */
let controlEnv = require('./handlers/middlewares/controllEnv');
controlEnv(app, env, __dirname);

/* Services */
let { Service, serviceInit, addService } = require('./services/initService');
let service = (argv.service == null) ? Service.All() : argv.service.split(',');
serviceInit(app, service);


app.set('port', (process.env.PORT || 5000))

app.get('*', (req, res) => {
    // res.sendFile(path.join(__dirname + '/client/public/index.html'));
    res.send('404')
});

app.listen(app.get('port'), process.env.IP, function () {
    console.log(`Server started at ${app.get('port')}`);
    console.log(`env: ${process.env.NODE_ENV}`);
});