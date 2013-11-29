var independentStudies = angular.module('independentStudies', []);

independentStudies.config([
    "$httpProvider", function($httpProvider) {
        $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
    }
]);

// Top-level controller
function mainCtrl($scope) {
    $scope.navControls = {selectedPanel: 'dashboard'};
}

