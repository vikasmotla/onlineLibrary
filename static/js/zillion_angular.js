var app = angular.module('zillion_app', ['ui.router'])


app.config(function($stateProvider, $urlRouterProvider, $httpProvider, $provide, $locationProvider) {
  $urlRouterProvider.otherwise('/');
});

angular.module('zillion_app').directive('ngEnter', function() {
        return function(scope, element, attrs) {
            element.bind("keydown keypress", function(event) {
                if(event.which === 13) {
                    scope.$apply(function(){
                        scope.$eval(attrs.ngEnter, {'event': event});
                    });

                    event.preventDefault();
                }
            });
        };
    });


app.config(function($stateProvider) {
  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: '/static/ngTemplates/app.home.html',
      controller: 'controller.zillion_home'
    })

    .state('search', {
      url: "/search",
      templateUrl: '/static/ngTemplates/app.search.html',
      controller: 'controller.zillion_search'
    })

    .state('history', {
      url: "/history",
      templateUrl: '/static/ngTemplates/app.history.html',
      controller: 'controller.zillion_history'
    })

    .state('historyImages', {
      url: "/history/:id",
      templateUrl: '/static/ngTemplates/app.historyImages.html',
      controller: 'controller.zillion_historyImages',
      params: {
        id: null,
      }
    })

});


app.controller('controller.zillion_historyImages', function($scope, $rootScope, $timeout, $state, $http) {
  if ($state.params.id) {
    $scope.form = {
      gotData:false
    }
    $http({
      method: 'GET',
      url: '/history/getHistory/' + $state.params.id
    }).then(function(response) {
      console.log(response.data);
      $scope.searchResults = response.data[0].images;
      $scope.keyword = response.data[0].keyword;
      if ($scope.searchResults.length>0) {
        $scope.form.gotData = true;
      }
    })
  }

  $scope.backToHistory = function () {
    setTimeout(function () {
      $state.go('history');
    }, 400);
  }

});

app.controller('zillion_controller', function($scope, $rootScope, $timeout, $state) {
  $rootScope.selectedView = {
    name: ''
  }
  $scope.changeView = function(name) {
    $rootScope.selectedView.name = name
    $state.go($rootScope.selectedView.name)
  }

});

app.controller('controller.zillion_home', function($scope, $rootScope, $timeout) {
  console.log('home');
  $rootScope.selectedView.name = 'home'
  $rootScope.selectedView
});

app.controller('controller.zillion_search', function($scope, $rootScope, $timeout, $http) {
  $rootScope.selectedView.name = 'search'
  $scope.form = {
    value: '',
    showError: '',
    gotData: false
  }
  $scope.search = function() {
    $scope.form.gotData = false;
    if ($scope.form.value == '') {
      $scope.form.showError = 'Please type something..'
      return
    }

    $http({
      method: 'GET',
      url: '/search/searchImage/' + $scope.form.value
    }).then(function(response) {
      $scope.searchResults = response.data;
      $scope.form.gotData = true;
      console.log($scope.searchResults);
      // $scope.form = {
      //   value: '',
      //   showError: ''
      // }
    })
  }

  $scope.$watch('form.value', function(newValue, oldValue) {
    if (newValue.length > 0) {
      $scope.form.showError = '';
    }
  })
});

app.controller('controller.zillion_history', function($scope, $rootScope, $timeout, $http, $state) {
  $rootScope.selectedView.name = 'history'
  $http({
    method: 'GET',
    url: '/history/getHistory'
  }).then(function(response) {
    console.log(response.data);
    $scope.history = response.data
  })

  $scope.getImagesOfThisKey = function(id) {
    $state.go('historyImages', {
      'id': id
    })
  }

});
