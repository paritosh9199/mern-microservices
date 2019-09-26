let express = require('express');
let path = require('path');
let cors = require('cors');

module.exports = (app, env, _dir = __dirname) => {
    if (env == "production") {
        //react-path
        app.use(express.static(path.join(_dir, '/build')));
    } else if (env == "development") {
        app.use(cors({ origin: true }));
        // app.use(express.static(path.join(_dir, '/public')));
    }else{
        //test maybe or something else
    }
}