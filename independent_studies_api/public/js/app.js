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
    $scope.navControls = {selectedPanel: null, globalNavIsVisible: true};
    $scope.uiControls = {activeAlert: false, graduationAlert: false};
    $scope.sessionData = {name: null, userIsLoggedIn: false};
    function refreshUserData() {
        $http.get('/sessions').success(function (data) {
            $scope.sessionData.name = data.name;
            if ($scope.sessionData.name !== null) {
                $scope.sessionData.userIsLoggedIn = true;
            } else {
                $scope.sessionData.userIsLoggedIn = false;
            }
        });
    }

    refreshUserData();

    $scope.logout = function() {
        $http.get('sessions/logout').success(function(){
            refreshUserData();
        });
    };

}



