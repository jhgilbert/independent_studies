var independentStudies = angular.module('independentStudies', []);

independentStudies.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/dashboard', {templateUrl: 'templates/dashboard.html'}).
        when('/courses', {templateUrl: 'templates/courses.html'}).
        when('/admin', {templateUrl: 'templates/admin.html'}).
        when('/transcript', {templateUrl: 'templates/transcript.html'}).
        otherwise({redirectTo: '/courses'});
}]);

// Top-level controller
function mainCtrl($scope, $http) {
    $scope.navControls = {selectedPanel: 'dashboard'};
    $scope.sessionData = {name: null, userIsLoggedIn: false};
    $http.get('/sessions').success(function (data) {
        $scope.sessionData.name = data.name;
        if ($scope.sessionData.name !== null) {
            $scope.sessionData.userIsLoggedIn = true;
        }
    });
}



