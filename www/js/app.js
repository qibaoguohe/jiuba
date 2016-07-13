// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])
.directive('hideTabs', function($rootScope) {              //隐藏底部导航栏
  return {
    restrict: 'A',
    link: function(scope, element, attributes) {
      scope.$on('$ionicView.beforeEnter', function() {
        scope.$watch(attributes.hideTabs, function(value){
          $rootScope.hideTabs = value;
        });
      });

      scope.$on('$ionicView.beforeLeave', function() {
        $rootScope.hideTabs = false;
      });
    }
  };
})
  .directive('scrollHeight',function($window){   //动态设定高度
    return{
      restrict:'AE',
      link:function(scope,element,attr){
        element[0].style.height=($window.innerHeight)+'px';
      }
    }
  })
  .factory('lzh_ajax',function($http,$q){   //ajax
    return {
      get:function(url2,method2,data2,data3){
        $http({url:url2, method:method2, params:data2})
          .then(function(data){data3(data);})
      }
    };
  })
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId/:gs',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  })

    .state('tab.index', {   //首页index
      url: '/index',
      views: {
        'tab-index': {
          templateUrl: 'templates/tab_index.html',
          controller: 'index'
        }
      }
    })
    .state('tab.taocan',{   //套餐tab_taocan
      url:'/taocan',
      views:{
        'tab-taocan':{
          templateUrl:'templates/tab_taocan.html',
          controller:'taocan'
        }
      }
    })
    .state('tab.taocan_content',{   //套餐tab_taocan
      url:'/taocan_content/:goods_id',
      views:{
        'tab-taocan':{
          templateUrl:'templates/taocan_content.html',
          controller:'taocan_content'
        }
      }
    })
    .state('tab.dingdan_list',{   //订单list
          url:'/dingdan_list',
      views:{
        'dingdan_list':{
          templateUrl:'templates/dingdan_list.html',
          controller:'dingdan_list'
        }
      }
    })
    .state('tab.dingdan_list_content',{   //订单list
      url:'/dingdan_list/:id',
      views:{
        'dingdan_list':{
          templateUrl:'templates/dingdan_list_content.html',
          controller:'dingdan_list_content'
        }
      }
    })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});
