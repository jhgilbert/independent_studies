// Controller for the resource management page (admins only)
function adminCtrl($scope, $http, $location) {
    $scope.searchParams = {
        language: "any",
        environment: "any",
        format: "any",
        cost: "any",
        difficulty: "any",
        framework: "any"
    };

    $http.get("/tags").success(function (data) {
        $scope.tags = data['tags'];
    });

    $scope.toggleTag = function(courseID, tagID, isAdding) {
        var postData = { course_id: courseID, tag_id: tagID };
        if (isAdding) {
            $http.post("/tags/add", postData).success(function () {});
        } else {
            $http.post("/tags/remove", postData).success(function () {});
        }
    };

    $scope.selectedRow = null;

    $scope.selectRow = function (index) {
        $scope.selectedRow = index;
    };

    $scope.navControls.selectedPanel = 'admin';

    $scope.uiControls = {showForm: false};
    $scope.resources = [];

    function refreshCourses() {
        $http({
            url: '/courses',
            method: 'GET',
            params: $scope.searchParams
        }).success(function (data, status, headers, config) {
            $scope.resources = data.courses;
        });
    }

    refreshCourses();

    // FORM CONTROLS ===============================================================================================

    function resetSavedChanges() {
        for (var i=0;i<$scope.resources.length;i++) {
            $scope.resources[i].hasUnsavedChanges = false;
        }
    }

    resetSavedChanges();

    function resetFormData() {
        for (var i=0;i<$scope.resources.length;i++) {
            $scope.resources[i].hasUnsavedChanges = false;
        }
        $scope.uiControls.formData = {
            title: null,
            url: null,
            hasUnsavedChanges: false,
            description: null,
            author: null
        };
    }

    resetFormData();

    $scope.initNew = function() {
        $scope.formAction = "new";
        resetFormData();
        $scope.uiControls.showForm = true;
        $scope.selectedRow = null;
    };

    $scope.initEdit = function(courseIndex) {
        $scope.formAction = "edit";
        $scope.uiControls.showForm = true;
        $scope.uiControls.formData = $scope.resources[courseIndex];
        $http.get("/tags?course_id=" + $scope.resources[courseIndex].id).success(function (data) {
            $scope.uiControls.formData.tags = data['tags'];
        });
    };

    // CRUD ========================================================================================================

    $scope.addResource = function () {
        delete $scope.uiControls.formData['hasUnsavedChanges'];
        $http.post('/courses', {'course': $scope.uiControls.formData}).success(function (){
            resetFormData();
            resetSavedChanges();
            refreshCourses();
        }).error(function (){
                $location.path("/");
        });
    };

    $scope.deleteResource = function (id) {
        $http.delete('/courses/' + id).success(function (){
            refreshCourses();
        }).error(function (){
                $location.path("/");
        });
    };

    $scope.updateResource = function (index) {
        delete $scope.resources[index]['hasUnsavedChanges'];
        $http.put('/courses/' + $scope.resources[index]['id'], {'course': $scope.resources[index]}).success(function (){
            resetFormData();
            resetSavedChanges();
            refreshCourses();
        }).error(function (){
                $location.path("/");
        });
    };
}