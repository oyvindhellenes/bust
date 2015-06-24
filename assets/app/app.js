'use strict';


  angular
    .module('assetsApp', ['ngCookies', 'ngResource', 'ui.router'])
    .constant('config', {
        baseUrl: 'http://localhost:1337/'
      })
    .config(['$httpProvider','$urlRouterProvider', '$stateProvider',
    function($httpProvider, $urlRouterProvider, $stateProvider) {

      $urlRouterProvider.otherwise('/home');
      
      $stateProvider
          .state('home', {
          url: '/home',
          templateUrl: 'views/main.html',
          controller: 'HomeCtrl'
          })

      $httpProvider.interceptors.push('httpInterceptor');
    }
  ])
    .run(['$rootScope', '$injector','$location','authService', '$cookieStore', 'userService', 
      function ($rootScope, $injector, $location, authService, $cookieStore, userService) {

      // Injects the authorization header on each api call
      $injector.get("$http").defaults.transformRequest = function(data, headersGetter) {
          if (userService.isLoggedIn()) {
              headersGetter()['Authorization'] = 'Bearer ' + $rootScope.oauth.token;
          }

          if (data) {
              return data;
          }
      };

      // If already logged in
      if ($cookieStore.get('oauth')) {
          $rootScope.isLoggedIn = true;
          console.log('Already logged in. Setting oauth from cookie');
          console.log($cookieStore.get('oauth'));
          $rootScope.oauth = $cookieStore.get('oauth');

          if ($rootScope.oauth.user) {
              userService.user($rootScope.oauth.user[0].id).success(function (resp){
                  console.log('Setting user from userService.user() ');
                  $rootScope.user = resp;

              }).error(function () {
                  console.log('Is already logged in but unable to get userdata');
              });
              
          }
          else {
              $cookieStore.remove('oauth');
              $rootScope.isLoggedIn = false;
          }
      };

  }]);