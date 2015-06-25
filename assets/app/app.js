'use strict';


  angular
    .module('assetsApp', ['ngCookies', 'ngResource', 'ui.router'])
    .constant('config', {
        baseUrl: 'http://localhost:1337/'
      })
    .config(['$httpProvider','$urlRouterProvider', '$stateProvider',
    function($httpProvider, $urlRouterProvider, $stateProvider) {

      $urlRouterProvider.otherwise('/login');
      
      $stateProvider
          .state('home', {
          url: '/home',
          templateUrl: 'pages/home/home.html',
          controller: 'HomeCtrl'
          })
          .state('login', {
          url: '/login',
          templateUrl: 'pages/login/login.html',
          controller: 'LoginCtrl'
          })          
          .state('topscores', {
          url: '/topscores',
          templateUrl: 'pages/topscores/topscores.html',
          controller: 'TopscoresCtrl'
          })          
          .state('profile', {
          url: '/profile/:id',
          templateUrl: 'pages/profile/profile.html',
          controller: 'ProfileCtrl'
          })          
          .state('submit', {
          url: '/submit',
          templateUrl: 'pages/submit/submit.html',
          controller: 'SubmitCtrl'
          })          
          .state('test', {
          url: '/test/:id',
          templateUrl: 'pages/test/test.html',
          controller: 'TestCtrl'
          })

      $httpProvider.interceptors.push('httpInterceptor');
    }
  ])
    .run(['$rootScope', '$injector','$location','authService', '$cookieStore', 'userService','$state', 
      function ($rootScope, $injector, $location, authService, $cookieStore, userService, $state) {

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
                  $state.go('home');

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