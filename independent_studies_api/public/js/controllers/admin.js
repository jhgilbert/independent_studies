// Controller for the resource management page (admins only)
function adminCtrl($scope, $http) {
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

    $scope.resetTagForms = function () {
        $scope.newTag = null;
        $scope.uiControls.formData.tagAddInProgress = false;
        for (var i=0;i<$scope.resources.length;i++) {
            $scope.resources[i].tagAddInProgress = false;
        }
    };

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
    }

    resetFormData();

    $scope.newTag = null;

    // CRUD ========================================================================================================

    $scope.addResource = function () {
        delete $scope.uiControls.formData['tags'];
        delete $scope.uiControls.formData['tagAddInProgress'];
        delete $scope.uiControls.formData['hasUnsavedChanges'];
        $http.post('/courses', {'course': $scope.uiControls.formData}).success(function (){
            resetFormData();
            resetSavedChanges();
            refreshCourses();
        });
    };

    $scope.deleteResource = function (id) {
        $http.delete('/courses/' + id).success(function (){
            refreshCourses();
        });
    };

    $scope.updateResource = function (index) {
        delete $scope.resources[index]['tags'];
        delete $scope.resources[index]['tagAddInProgress'];
        delete $scope.resources[index]['hasUnsavedChanges'];
        $http.put('/courses/' + $scope.resources[index]['id'], {'course': $scope.resources[index]}).success(function (){
            resetFormData();
            resetSavedChanges();
            refreshCourses();
        });
    };
}