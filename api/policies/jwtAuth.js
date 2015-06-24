var expressJwt = require('express-jwt');
var secret = 'f21d2a33f219fbec04bcc71e08877073';

module.exports = expressJwt({secret: secret});