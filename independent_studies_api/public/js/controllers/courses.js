function coursesCtrl($scope, $http) {
    $scope.navControls.selectedPanel = 'courses';

    function refreshCourses() {
        $http.get('/courses').success(function (data) {
            $scope.courses = data.courses;
            $scope.enrollmentKey = data.enrollment_key;
        });
    }
    refreshCourses();

    $scope.createEnrollment = function(index, course_id) {
        $http.post('/enrollments', {'enrollment': { 'course_id': course_id}}).success(function (){
            $scope.courses[index].enrolled = true;
        });
    };
}