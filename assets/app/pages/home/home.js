'use strict';

/**
 * Home page controller
 *
 * @author Øyvind Hellenes
 */


angular.module('assetsApp')
	.controller('HomeCtrl',['$scope', '$log', '$http', '$rootScope', 'userService', 'authService', '$cookieStore', 'submitService','$state',
		function($scope, $log, $http, $rootScope, userService, authService, $cookieStore, submitService, $state) {

        $scope.loginCredentials = {};
        $scope.registerCredentials = {};
        $scope.validationErrors = [];

        $scope.resource = {
            name: "",
            url: "",
        }

        $rootScope.collection = {
            value: "",
            newname: ""
        }

        $rootScope.loading = {
            value: false
        }

        $scope.logout = function(){
        	authService.logout();
        	$rootScope.user = {};
        	$rootScope.oauth = {};
        	$rootScope.isLoggedIn = false;
        	$cookieStore.remove('oauth');
        	$state.go('home');
        }

        $scope.submit = function() {
            $rootScope.loading.value = true;
            
            submitService.post($scope.resource.url, $scope.resource.name, $rootScope.collection.value).then(function(data){
                if ($rootScope.collection.newname) {
                    submitService.new_collection($rootScope.collection.newname).then(function(result){
                        submitService.add_resource(result, data);
                        submitService.star(result);
                    })
                }
                else {
                    submitService.add_resource($rootScope.collection.value, data);

                }
                window.close();
            })

        	
        };

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

	}]);