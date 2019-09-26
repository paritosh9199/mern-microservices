let _= require('lodash');
let {User} = require('../../database/models/user');
let registerController = (req, res) => {
    var body = _.pick(req.body, ['email', 'password', 'confpassword']);
    var user = new User(body);
    // if (process.env.REG_MODE == 1) {
        User.accountExists(body.email).then(function (data) {
            if (!data) {
                if (body.confpassword == body.password) {
                    user.save().then(() => {
                        return user.generateAuthToken();
                    }).then((token) => {
                        req.session.xAuth = token;
                        req.session.uid = user._id;
                        req.session.name = user.email;
                        // console.log({user});
                        res.setHeader('x-auth', token);
                        res.send({success: true, user: user.toJSON(),token})
                        // res.redirect('/me');
                        // res.header('x-auth', token).redirect(200, '/me', user);
                    }).catch((e) => {
                        var msg = { "msg": e };
                        res.status(400).send({success: false, error: e});                        
                    })
                } else {
                    var msg = { "msg": "Passwords do not match!" };
                    res.status(400).send({success: false, error: msg.msg});
                }
            } else {
                var msg = { "msg": "Account already exists with given credentials!" };
                res.status(400).send({success: false, error: msg.msg});                        
            }
        })
}


let loginController = (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    // console.log({ "body": req.body, "query": req.query });

    User.findByCredentials(body.email, body.password).then((user) => {
        return user.generateAuthToken().then((token) => {
            req.session.xAuth = token;
            req.session.uid = user._id;
            req.session.name = user.email;
            res.setHeader('x-auth', token);
            res.send({success: true, user: user.toJSON(),token})
            // res.header('x-auth', token).redirect('/me');
        });
    }).catch((e) => {
        // res.status(400).send("Invalid login credentials");
        console.log(e)
        var msg = { "msg": "Invalid login credentials" };
        res.status(400).send({success: false, error: msg.msg});                        
    });
}


let logoutController = (req, res) => {
    User.removeToken(req.token).then(() => {
        // res.status(200).send();
        req.session.destroy();

        res.redirect('/login');
    }, () => {
        res.status(400).send({success: false, error: 'Bad Request'});                        
    });
}

module.exports = {registerController,loginController,logoutController}