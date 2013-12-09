function coursesCtrl($scope, $http) {
    $scope.navControls.selectedPanel = 'courses';
    $scope.searchParams = {
        language: "any",
        environment: "any",
        format: "any",
        cost: "any",
        difficulty: "any",
        framework: "any"
    };

    $scope.refreshCourses = function() {
        $http({
            url: '/courses',
            method: 'GET',
            params: $scope.searchParams
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
    };

    $scope.refreshCourses();

    /**
     * This is for later ...
    $scope.toggleTag = function(tag) {
        var index = $scope.tags.indexOf(tag);
        if (index === -1) {
            $scope.tags.push(tag);
        }
        else {
            $scope.tags.splice(index, 1);
        }
        console.log("Scope tags are " + $scope.tags);
    };
     */

    $scope.createEnrollment = function(index, course_id) {
        $http.post('/enrollments', {'enrollment': { 'course_id': course_id}}).success(function () {
            $scope.courses[index].enrolled = true;
        });
    };
}
