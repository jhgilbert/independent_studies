function coursesCtrl($scope, $http) {
    $scope.navControls.selectedPanel = 'courses';
    $scope.params = ["HTML"];

    function refreshCourses() {
        $http({
            url: '/courses',
            method: 'GET',
            //TODO: This is awkward -- how can I use Angular to pass a real array as a GET parameter?
            params: {tags: $scope.params.join(",")}
        }).success(function (data) {
                $scope.courses = data.courses;
                var enrollmentKey = data.enrollment_key;
                for (var i=0;i<$scope.courses.length;i++) {
                    var course_id = $scope.courses[i].id;
                    if (enrollmentKey[course_id]) {
                        $scope.courses[i].enrolled = true;
                    }
                }
        });
    }
    refreshCourses();

    $scope.createEnrollment = function(index, course_id) {
        $http.post('/enrollments', {'enrollment': { 'course_id': course_id}}).success(function () {
            $scope.courses[index].enrolled = true;
        });
    };
}
