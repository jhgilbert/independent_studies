// Dashboard controller
function dashCtrl($scope, $http) {
    $scope.navControls.selectedPanel = 'dashboard';

    $scope.uiControls = {selectedNotebookItem: 0};


    function buildProgressBars() {
        for (var i=0;i<$scope.notebookIndex.length;i++) {
            $scope.notebookIndex[i].completedArray = buildCompletedArray($scope.notebookIndex[i]['percentage']);
            $scope.notebookIndex[i].remainderArray = buildRemainderArray($scope.notebookIndex[i]['percentage']);
            $scope.notebookIndex[i].displayPercentage = $scope.notebookIndex[i]['percentage'];
            $scope.notebookIndex[i].updateInProgress = false;
        }
    }

    function getNotebookDetail(enrollment_id) {
        $http.get('/notebook/detail?enrollment_id=' + enrollment_id).success(function (data){
            $scope.notebookDetail = data.detail;
            $scope.advancementAmount = $scope.notebookDetail.percentage;
        });
    }

    function refreshNotebook() {
        $http.get('/notebook/index').success(function (data) {
            $scope.advancementInProgress = false;
            $scope.notebookIndex = data.notebook;
            getNotebookDetail($scope.notebookIndex[$scope.uiControls.selectedNotebookItem]['id']);
            buildProgressBars();
        });
    }

    refreshNotebook();

    $scope.selectNotebookItem = function(index) {
        $scope.uiControls.selectedNotebookItem = index;
        getNotebookDetail($scope.notebookIndex[index]['id']);
    };

    // PROGRESS BAR CREATION ===========================================================================================

    // Builds array to allow ng-repeat to build "completed" portion of progress bar
    function buildCompletedArray(percentage) {
        var arr = [];
        for (var i=0;i<percentage;i++) {
            arr.push(i);
        }
        return arr;
    }

    // Builds array to allow ng-repeat to build "remaining" portion of progress bar
    function buildRemainderArray(percentage) {
        var arr = [];
        for (var i=0;i<(100-percentage);i++) {
            arr.push(i);
        }
        return arr;
    }

    getNotebookDetail($scope.note);

    // PROGRESS UPDATES ================================================================================================

    $scope.createAdvancement = function(enrollment_id) {
        $http.post('/advancements', {'advancement': {'enrollment_id': enrollment_id, 'amount': (parseInt($scope.advancementAmount) - $scope.notebookDetail.percentage)}}).success(function () {
            refreshNotebook();
        });
    };

}