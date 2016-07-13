angular.module('starter.controllers', [])

  .value('rurl','http://gdsc.cmshop.net/xapi/index.php')
  ///Topic/findSec //秒抢

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})
  .controller('index',function($scope,$ionicSlideBoxDelegate){
    $scope.myActiveSlide = 1;
  })
  .controller('taocan',function($scope, $location, $anchorScroll, $ionicScrollDelegate,$animate,rurl,lzh_ajax){
      $scope.jumper=function(key){
        $location.hash(key);
        $anchorScroll(true)
      }
    $scope.scrollTop = function() {
      $ionicScrollDelegate.scrollTop(true);
    };
    $scope.taocan=[];
    $scope.ajx=lzh_ajax;
    $scope.rurl=rurl;
    $scope.data={};
    $scope.ajx.get(rurl+'/Topic/findSale','get',$scope.data,function(json){
      console.log(json);
      var l=json.data.result.data;
      for(var i=0;i< l.length;i++){
           //l[i]
        $scope.taocan.push(l[i]);
      }
      console.log($scope.taocan);
    })

})
  .controller('taocan_content',function($scope, $ionicHistory,$stateParams){
    $scope.goods_id=$stateParams.goods_id;
    console.log($scope.goods_id);
      $scope.gback=function(){
        history.back(-1);
        //$ionicHistory.goBack();
        //$scope.$ionicGoBack();
      }
  })
  .controller('dingdan_list',function($scope){

  })
  .controller('dingdan_list_content',function($scope,$ionicHistory){
    $scope.gback=function(event){
      //event.stopPropagation();
      history.back(-1);
      //$ionicHistory.goBack();
      //$scope.$ionicGoBack();
    }
  })
//function jumper(key, $location, $anchorScroll){
//  $location.hash(key);
//  $anchorScroll(500)
//}


