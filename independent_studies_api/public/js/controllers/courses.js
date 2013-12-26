function coursesCtrl($scope, $http) {
    $scope.navControls.selectedPanel = 'courses';

    $http.get("/tags").success(function (data) {
        $scope.tags = data['tags'];
    });

    $scope.searchTags = [];

    $scope.refreshCourses = function() {
        $http({
            url: '/courses',
            method: 'GET',
            //TODO: This is awkward -- how can I use Angular to pass a real array as a GET parameter?
            params: {tags: $scope.searchTags.join(",")}
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

    $scope.toggleTag = function(tagID) {
        var index = $scope.searchTags.indexOf(tagID);
        if (index === -1) {
            $scope.searchTags.push(tagID);
        }
        else {
            $scope.searchTags.splice(index, 1);
        }
        console.log("Search tags are " + $scope.searchTags);
    };

    $scope.createEnrollment = function(index, course_id) {
        $http.post('/enrollments', {'enrollment': { 'course_id': course_id}}).success(function () {
            $scope.courses[index].enrolled = true;
        });
    };
}
