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

        $scope.cormen = '';

        $http.get('pages/home/content.json').then(function(data){
            $scope.cormen = data.data;
            console.log(data.data);
        })

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


	}]);