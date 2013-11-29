var independentStudies = angular.module('independentStudies', []);

independentStudies.config([
    "$httpProvider", function($httpProvider) {
        $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
    }
]);

// Top-level controller
function mainCtrl($scope, $http) {
    $scope.navControls = {selectedPanel: 'dashboard'};
    $scope.sessionData = {name: null, userIsLoggedIn: false};
    $http.get('/sessions').success(function(data) {
    	$scope.sessionData.name = data.name;
    	if ($scope.sessionData.name != null) {
    		$scope.sessionData.userIsLoggedIn = true;
    	}
    });
}

