'use strict';

/**
 * Home page controller
 *
 * @author Øyvind Hellenes
 */


angular.module('assetsApp')
	.controller('SubmitCtrl',['$scope', '$log', '$http', '$rootScope', 'userService', 'authService', '$cookieStore', 'submitService','$state',
		function($scope, $log, $http, $rootScope, userService, authService, $cookieStore, submitService, $state) {

			$scope.cormen = '';

			$http.get('pages/home/content.json').then(function(data){
			    $scope.cormen = data.data;
			    console.log(data.data);
			})
			
			$scope.submitQuestion = function(){

			}
	}]);