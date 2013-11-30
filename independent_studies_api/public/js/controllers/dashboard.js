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
        });
    }

    function getNotebookIndex() {
        $http.get('/notebook/index').success(function (data) {
            $scope.notebookIndex = data.notebook;
            getNotebookDetail($scope.notebookIndex[0]['id']);
            buildProgressBars();
        });
    }

    getNotebookIndex();

    $scope.selectNotebookItem = function(index) {
        $scope.uiControls.selectedNotebookItem = index;
        getNotebookDetail($scope.notebookIndex[index]['id']);
    }

    // PROGRESS BAR CREATION =======================================================================================

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

}