var independentStudies = angular.module('independentStudies', []);

// Top-level controller
function mainCtrl($scope, $http) {
    $scope.navControls = {selectedPanel: 'dashboard'};
    $scope.sessionData = {name: null, userIsLoggedIn: false};
    $http.get('/sessions').success(function (data) {
        $scope.sessionData.name = data.name;
        CSRF_TOKEN = data.token;
        if ($scope.sessionData.name !== null) {
            $scope.sessionData.userIsLoggedIn = true;
        }
    });
}



