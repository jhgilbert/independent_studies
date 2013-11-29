function coursesCtrl($scope, $http) {
    $scope.navControls.selectedPanel = 'courses';

    function refreshCourses() {
        $http.get('/courses').success(function (data) {
            $scope.courses = data;
        });
    }
    refreshCourses();
}