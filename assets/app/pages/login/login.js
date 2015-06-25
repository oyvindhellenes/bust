'use strict';

/**
 * Login controller
 *
 * @author Øyvind Hellenes
 */

var app = angular.module('assetsApp');

app.controller('LoginCtrl', ['$scope', '$location','$log','authService','$cookieStore', '$state', '$rootScope','userService',
    function($scope, $location, $log, authService, $cookieStore, $state, $rootScope, userService) {

            $scope.loginCredentials = {};
            $scope.registerCredentials = {};
            $scope.validationErrors = [];
            $scope.email = "";
            $scope.showEmailForm = false;
            $scope.isRegister = true;

            $scope.show = {
                sendEmailSuccess: false
            }

            $scope.login = function(credentials){
                var success = function(data){
                    if (!data.success) {
                        $scope.validationErrors = [];
                        $scope.validationErrors.push("Incorrect username/password combination.");
                    }
                    else {

                        console.log('data' + angular.toJson(data));
                        $rootScope.isLoggedIn = true;

                        // Store the oauth data
                        $rootScope.oauth = data;

                        // Also store it in cookie
                        $cookieStore.put('oauth', data);

                        userService.user(data.user[0].id)
                        .success(function (resp){
                            console.log('resp' + angular.toJson(resp));
                            $rootScope.user = resp;

                        })
                        .error(function (resp){
                            $log.info('Not working');
                        });
                        
                    }
                };

                var loginError = function(err) {
                    $scope.validationErrors = [];
                    $scope.validationErrors.push("Incorrect username/password combination.");
                };

                // Sends credentials with responses to the authentication service
                authService.login(credentials).success(success).error(loginError);
            };  


            $scope.register = function(credentials){

                var success = function(data) {

                    $scope.login(credentials);
                };

                var registerError = function(err) {
                    $scope.validationErrors = [];
                    if (err.status == 500) {
                        $scope.validationErrors.push("This email is already taken.")
                    } 
                    else {
                        $scope.validationErrors.push(err.summary + ". Try again")  
                    }

                };

                // Sends credentials with responses to the authentication service
                authService.register(credentials).success(success).error(registerError);
            };

            $scope.sendNewPassword = function(email) {
                authService.newPassword(email, $scope.show);
                $scope.showEmailForm = false;

            }

            $scope.isLogin = function(value){
                return value == 'leadText';
            }

            $scope.isValidEmail = function(email){
                var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(email);
            }
		}
	]);
