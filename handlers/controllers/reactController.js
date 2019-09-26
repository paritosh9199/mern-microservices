let path = require('path');

module.exports = async (req,res) => {
    // res.send(`<code>App is running on port: ${process.env.PORT}</code>`);
    // res.sendFile(path.join(__dirname + '/index.html'));
    res.sendFile(path.join(__dirname + '/index.html'));

}