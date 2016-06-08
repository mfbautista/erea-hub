var ereaHubApp = angular.module('ereaHubApp');

ereaHubApp.controller('MenuCtrl', function ($scope, $location) {
  $scope.go = function (target) {
    $location.path(target);
  };
});

ereaHubApp.controller('MsgCtrl', function ($scope, auth) {
  $scope.message = {text: ''};
  $scope.errorMessage = {text: ''};
});

ereaHubApp.controller('HomeCtrl', function (auth, $scope, $http) {
  $scope.auth = auth;
  $scope.$watch('auth.profile.name', function(name) {
    if (!name) {
      return;
    }
    $scope.message.text = 'Hola, ' + auth.profile.name + '!';
  });

  $http.
    get('dashboards.json').
    success(function(data) {
      $scope.dashboards = data.dashboards;
    });
    
});

ereaHubApp.controller('LoginCtrl', function (auth, $scope, $location, store) {
  $scope.user = '';
  $scope.pass = '';

  if(auth.isAuthenticated){
    $location.path('/');
    return;
  }

  function onLoginSuccess(profile, token) {
    $scope.message.text = '';
    store.set('profile', profile);
    store.set('token', token);
    $location.path('/');
    $scope.loading = false;
  }

  function onLoginFailed() {
    console.log($scope);
    $scope.message.text = '';
    $scope.errorMessage.text = 'Credenciales inválidas';
    $scope.loading = false;
  }

  $scope.reset = function() {
    auth.reset({
      email: 'hello@bye.com',
      password: 'hello',
      connection: 'Username-Password-Authentication'
    });
  };

  $scope.submit = function () {
    $scope.message.text = 'loading...';
    $scope.loading = true;
    auth.signin({
      connection: 'Username-Password-Authentication',
      username: $scope.user,
      password: $scope.pass,
      authParams: {
        scope: 'openid name email'
      }
    }, onLoginSuccess, onLoginFailed);

  };

  $scope.doGoogleAuthWithPopup = function () {
    $scope.message.text = 'loading...';
    $scope.loading = true;

    auth.signin({
      popup: true,
      connection: 'google-oauth2',
      scope: 'openid name email'
    }, onLoginSuccess, onLoginFailed);
  };

});

ereaHubApp.controller('LogoutCtrl', function (auth, $scope, $location, store) {
  auth.signout();
  $scope.$parent.message = '';
  store.remove('profile');
  store.remove('token');
  $location.path('/login');
});
