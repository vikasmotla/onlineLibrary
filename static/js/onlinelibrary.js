var app = angular.module('online_library', ['ui.router'])


app.config(function($urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
});

app.config(function($stateProvider) {
  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: '/static/ngTemplates/app.home.html',
      controller: 'controller.home'
    })
    .state('user', {
      url: "/user",
      templateUrl: '/static/ngTemplates/app.user.html',
      controller: 'controller.user'
    })
    .state('library', {
      url: "/library",
      templateUrl: '/static/ngTemplates/app.library.html',
      controller: 'controller.library'
    })
    .state('book', {
      url: "/book",
      templateUrl: '/static/ngTemplates/app.book.html',
      controller: 'controller.book'
    })
    .state('swapbook', {
      url: "/swap",
      templateUrl: '/static/ngTemplates/app.swapbook.html',
      controller: 'controller.swapbook'
    })
    .state('order', {
      url: "/order",
      templateUrl: '/static/ngTemplates/app.order.html',
      controller: 'controller.order'
    })
    .state('data', {
      url: "/data",
      templateUrl: '/static/ngTemplates/app.data.html',
      controller: 'controller.data'
    })
});

app.controller('controller.home', function($scope, $rootScope, $timeout, $state, $http) {
  $rootScope.selectedView = {
    name: ''
  }
  $scope.changeView = function(name) {
    $rootScope.selectedView.name = name;
    $state.go($rootScope.selectedView.name);
  }
});


app.controller('controller.user', function($scope, $rootScope, $timeout, $state, $http) {
  $rootScope.selectedView.name = 'user';

  $scope.form = {
    username: '',
    first_name: '',
    password: '',
    email: '',
    is_superuser: false,
    is_library_admin: false,
    is_customer: false,
    is_staff: false
  }

  $http({
    method: 'GET',
    url: '/api/auth/allUsers'
  }).then(function(response) {
    console.log(response.data);
    $scope.users = response.data
  })


  $scope.createUser = function() {
    console.log($scope.form);
    $http({
      method: 'POST',
      url: '/api/auth/register',
      data: $scope.form
    }).then(function(response) {
      console.log(response.data);
      $scope.users.push(response.data);

      $scope.form = {
        username: '',
        first_name: '',
        password: '',
        email: ''
      }
    })
  }
});


app.controller('controller.library', function($scope, $rootScope, $timeout, $state, $http) {
  $rootScope.selectedView.name = 'library';

  $scope.form = {
    name: '',
    library_code: '',
    library_admin: '',
    books: ''
  }

  $scope.getLibraries = function () {
    $http({
      method: 'GET',
      url: '/api/library'
    }).then(function(response) {
      console.log(response.data);
      $scope.libraries = response.data
    })

  }

  $scope.getLibraries()


  $scope.createLibrary = function() {
    $http({
      method: 'POST',
      url: '/api/library',
      data: $scope.form
    }).then(function(response) {
      console.log(response.data);
      $scope.libraries.push(response.data);

      $scope.form = {
        name: '',
        library_code: '',
        library_admin: '',
        books: ''
      }
    })
  }

  $scope.addBookForm = {
    libraryId:'',
    books:''
  }

  $scope.addBooks = function () {
    $http({
      method: 'POST',
      url: '/api/library/addBooks/'+$scope.addBookForm.libraryId,
      data: {bookIds:$scope.addBookForm.books}
    }).then(function(response) {
        $scope.getLibraries()
        $scope.addBookForm = {
          libraryId:'',
          books:''
        }
    });
  }

});


app.controller('controller.book', function($scope, $rootScope, $timeout, $state, $http) {
  $rootScope.selectedView.name = 'book';


  $scope.form = {
    name: '',
    author: '',
    qr_code: '',
    book_code: ''
  }

  $http({
    method: 'GET',
    url: '/api/book'
  }).then(function(response) {
    console.log(response.data);
    $scope.books = response.data
  })


  $scope.createBook = function() {
    $http({
      method: 'POST',
      url: '/api/book',
      data: $scope.form
    }).then(function(response) {
      console.log(response.data);
      $scope.books.push(response.data);

      $scope.form = {
        name: '',
        author: '',
        qr_code: '',
        book_code: ''
      }
    })
  }

});


app.controller('controller.swapbook', function($scope, $rootScope, $timeout, $state, $http) {
  $rootScope.selectedView.name = 'swapbook';

  $scope.userForm = {
    library:'',
    user:'',
    bookIdsOne:'',
    bookIdsTwo:''
  }
  $scope.libraryForm = {
    libraryOne:'',
    libraryTwo:'',
    bookIdsOne:'',
    bookIdsTwo:''
  }

  $scope.swapWithUser = function () {
    $http({
      method: 'POST',
      url: '/api/swapbook/withuser',
      data: $scope.userForm
    }).then(function(response) {
      console.log(response.data);

      $scope.userForm = {
        library:'',
        user:'',
        bookIdsOne:'',
        bookIdsTwo:''
      }
    });
  }

  $scope.swapWithLib = function () {
    $http({
      method: 'POST',
      url: '/api/swapbook/withlibrary',
      data: $scope.libraryForm
    }).then(function(response) {
      console.log(response.data);

      $scope.libraryForm = {
        libraryOne:'',
        libraryTwo:'',
        bookIdsOne:'',
        bookIdsTwo:''
      }
    });
  }




});

app.controller('controller.order', function($scope, $rootScope, $timeout, $state, $http) {
  $rootScope.selectedView.name = 'order';


  $scope.form = {
    user: '',
    ordered_books: '',
    library: ''
  }

  $http({
    method: 'GET',
    url: '/api/bookOrder'
  }).then(function(response) {
    console.log(response.data);
    $scope.orders = response.data
  })

  $scope.createOrder = function () {

    $http({
      method: 'POST',
      url: '/api/bookOrder',
      data: $scope.form
    }).then(function(response) {
      console.log(response.data);
      $scope.orders.push(response.data);

      $scope.form = {
        user: '',
        ordered_books: '',
        library: ''
      }

    });

  }

});


app.controller('controller.data', function($scope, $rootScope, $timeout, $state, $http) {
  $rootScope.selectedView.name = 'data';

  $scope.dataForm = {
    libraryId:'',
    userId:''
  }

    $scope.getAllSwappedBooksWithUser = function () {
      $http({
        method: 'POST',
        url: '/api/data/getSwappedBooks',
        data:{withUser:true,getAll:true}
      }).then(function(response) {
        console.log(response.data);
        $scope.data = response.data
      })
    }

    $scope.getParticularSwappedBooksWithUser = function () {
      $http({
        method: 'POST',
        url: '/api/data/getSwappedBooks',
        data:{withUser:true,getParticular:$scope.dataForm.userId}
      }).then(function(response) {
        console.log(response.data);
        $scope.data = response.data
        $scope.dataForm = {
          libraryId:'',
          userId:''
        }
      })
    }


    $scope.getAllSwappedBooksWithLib = function () {
      $http({
        method: 'POST',
        url: '/api/data/getSwappedBooks',
        data:{withLibrary:true,getAll:true}
      }).then(function(response) {
        console.log(response.data);
        $scope.data = response.data
      })
    }



    $scope.getParticularSwappedBooksWithLib = function () {
      $http({
        method: 'POST',
        url: '/api/data/getSwappedBooks',
        data:{withLibrary:true,getParticular:$scope.dataForm.libraryId}
      }).then(function(response) {
        console.log(response.data);
        $scope.data = response.data
        $scope.dataForm = {
          libraryId:'',
          userId:''
        }
      })
    }


});
