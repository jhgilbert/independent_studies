function coursesCtrl($scope, $http) {
    $scope.navControls.selectedPanel = 'courses';
    $scope.tags = [];
    $scope.langTag = 'any';
    $scope.frameworkTag = 'any';
    $scope.costTag = 'any';
    $scope.topicTag = 'any';
    $scope.difficultyTag = 'any';
    $scope.environmentTag = 'any';
    $scope.formatTag = 'any';

    function setQueryTags() {
        $scope.tags = [];
        if ($scope.langTag !== 'any') {
            $scope.tags.push($scope.langTag);
        }
        if ($scope.frameworkTag !== 'any') {
            $scope.tags.push($scope.frameworkTag);
        }
        if ($scope.costTag !== 'any') {
            $scope.tags.push($scope.costTag);
        }
        if ($scope.topicTag !== 'any') {
            $scope.tags.push($scope.topicTag);
        }
        if ($scope.difficultyTag !== 'any') {
            $scope.tags.push($scope.difficultyTag);
        }
        if ($scope.environmentTag !== 'any') {
            $scope.tags.push($scope.environmentTag);
        }
        if ($scope.formatTag !== 'any') {
            $scope.tags.push($scope.formatTag);
        }
    }

    $scope.refreshCourses = function() {
        setQueryTags();
        $http({
            url: '/courses',
            method: 'GET',
            //TODO: This is awkward -- how can I use Angular to pass a real array as a GET parameter?
            params: {tags: $scope.tags.join(",")}
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

    $scope.createEnrollment = function(index, course_id) {
        $http.post('/enrollments', {'enrollment': { 'course_id': course_id}}).success(function () {
            $scope.courses[index].enrolled = true;
        });
    };
}
