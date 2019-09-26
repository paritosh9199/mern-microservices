const express = require('express');
const path = require('path');

let reactController = require('../../handlers/controllers/reactController');

module.exports = function (app) {
    const router = express.Router();

    router.get('/', reactController);
    //   app.use('/swagger/api', express.static('./public/swagger.yaml'));
    //   app.use('/explorer', express.static('./public/swagger-ui'));
    app.use(router);
}