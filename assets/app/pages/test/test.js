'use strict';

/**
 * Home page controller
 *
 * @author Øyvind Hellenes
 */


angular.module('assetsApp')
	.controller('TestCtrl',['$scope', '$log', '$http', '$rootScope', 'userService', 'authService', '$cookieStore', 'submitService','$state',
		function($scope, $log, $http, $rootScope, userService, authService, $cookieStore, submitService, $state) {

			$scope.question = {
				text: 'Hvor lang tid tar det å sette n tall inn i et binært søketre i verste tilfelle (worst-case)?',
				choices: [
					{
						text: 'O(n log n) and a longer answer to fix mulitple lines problem',
						selected: false,
						points: 1
					},
					{
						text: 'O(n)',
						selected: false,
						points: 1
					},
					{
						text: 'O(n^2)',
						selected: false,
						points: 1
					},
					{
						text: 'O(n^3)',
						selected: false,
						points: 1
					},
					{
						text: 'Pass',
						selected: false,
						points: 0
					}
				]
			}

	}]);