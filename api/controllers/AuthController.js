/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var passport = require("passport");
var jwt = require('jsonwebtoken');
var secret = 'f21d2a33f219fbec04bcc71e08877073';
var util = require('util');
var bcrypt = require('bcrypt-nodejs');

module.exports = {

	login: function(req, res) {
	    passport.authenticate('local', function(err, user, info) {

	        if (!user) {
	            res.send({
	                success: false,
	                message: 'invalidPassword'
	            });
	            return;
	        }else{
	            if (err) {
	                res.send({
	                    success: false,
	                    message: 'unknownError',
	                    error: err
	                });
	            } else {
	                
	                var token = jwt.sign(user, secret, { expiresInMinutes: 60*24 });
	                res.send({
	                    success: true,
	                    user: user,
	                    token: token
	                });
	            }
	        }
	    })(req, res);
	},

	logout: function(req, res) {
	    req.logout();
	    res.send({
	        success: true,
	        message: 'logoutSuccessful'
	    });
	},
	resetpassword: function(req, res, next){
		console.log(util.inspect(req.user[0].id));
		bcrypt.genSalt(10, function(err, salt) {
			bcrypt.hash(req.param('password'), salt, function(){}, function(err, hash) {
				if (err) {
					console.log(err);
					next();
				}else{
					User.findOne(req.user[0].id, function(err, obj){
						if (!err) {

							obj.password = hash;
							obj.save(function(err, result){
								res.send(result);
							})
						}
						else {
							res.send(err)
						}
					})
					
				}
			});
		});
				
	},
	_config: {}
	
};

