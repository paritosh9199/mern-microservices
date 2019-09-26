let initEnv = (env = process.env.NODE_ENV) => {
  env = (env == null) ? "development" : env;

  if (env === 'development' || env === 'test' || env === 'production') {
    var config = require('./config.json');
    var envConfig = config[env];

    Object.keys(envConfig).forEach((key) => {
      process.env[key] = envConfig[key];
    });

    if (env === 'production') {
      process.env.JWT_SECRET = makeid(32);
    }
  }
  process.env.NODE_ENV = env;
  return env
}


let makeid = (len = 6) => {
  var text = "";
  var possible = "abcdefghijklmnopqrstuvwxyz0123456789";
  var possible2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ.!@#$%^&*";

  for (var i = 0; i < len / 2; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
    text += possible2.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

module.exports = { initEnv, makeid };