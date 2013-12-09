// Controller for the resource management page (admins only)
function adminCtrl($scope, $http, $location) {
    function clearTags() {
        $scope.topicTag = 'any';
    }

    clearTags();

    function setNewTags() {
        var newTags = [];
        if ($scope.topicTag !== 'any') {
            newTags.push($scope.topicTag);
        }
        return newTags;
    }

    $scope.selectedRow = null;

    $scope.selectRow = function (index) {
        $scope.selectedRow = index;
    };

    $scope.navControls.selectedPanel = 'admin';

    $scope.uiControls = {detailEditInProgress: false, selectedResource: null};
    $scope.resources = [];

    function refreshCourses() {
        $http.get('/courses').success(function(data, status, headers, config) {
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
        $scope.uiControls.detailEditInProgress = null;
        $scope.uiControls.selectedResource = null;
        $scope.uiControls.formData = {
            title: null,
            difficulty: null,
            free: false,
            tags: [],
            url: null,
            tagAddInProgress: false,
            hasUnsavedChanges: false,
            description: null,
            author: null
        };
        clearTags();
    }

    resetFormData();

    // CRUD ========================================================================================================

    $scope.addResource = function () {
        delete $scope.resources[index]['tags'];
        delete $scope.uiControls.formData['tagAddInProgress'];
        delete $scope.uiControls.formData['hasUnsavedChanges'];
        $scope.uiControls.formData['tags'] = setNewTags();
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
        console.log("Index is " + index)
        delete $scope.resources[index]['tags'];
        delete $scope.resources[index]['tagAddInProgress'];
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