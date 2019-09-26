const express = require('express');
const path = require('path');
let _ = require('lodash')

let reactController = require('../../handlers/controllers/reactController');
let { registerController, loginController, logoutController } = require('../../handlers/controllers/authUserController');
let { auth, auth_semi } = require('../../handlers/middlewares/auth');

module.exports = function (app) {
    const router = express.Router();

    router.post('/register', registerController);

    router.post('/login', loginController);

    router.get('/logout', auth, logoutController);

    app.use(router);
}