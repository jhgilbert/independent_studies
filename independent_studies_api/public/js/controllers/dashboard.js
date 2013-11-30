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

    function getNotebookIndex() {
        $http.get('/notebook/index').success(function (data) {
            $scope.notebookIndex = data.notebook;
            buildProgressBars();
        });
    }

    getNotebookIndex();

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

    // NOTEBOOK ====================================================================================================

    // This will be an API call for the student's full enrollment in a given resource.
    function getResourceDetail() {
        $scope.notebookResource = {
            name: "Javascript class",
            percentage: 42,
            url: "http://www.javascript.com",
            difficulty: 'beginner',
            description: "Just another JS class. Nothing too special about it.",
            code: [],
            profile: null
        };
        $scope.notebookPosts = [
            {date: "11/2/2013", text: "Man, this stuff is awesome!"},
            {date: "8/4/2013", text: "Almost there ..."},
            {date: "7/22/2013", text: "<xmp><p>I keep reminding myself that everyone has to start somewhere.</p></xmp>"},
            {date: "5/17/2013", text: "Getting the hang of it, I think. :)"},
            {date: "1/4/2013", text: "Time to start my JavaScript journey. I'm so excited! http://www.cnn.com"}
        ];
        $scope.recentProgress = [
            {date: "11/2/2013", percentage: 2},
            {date: "8/4/2013", percentage: 5},
            {date: "7/22/2013", percentage: 2},
            {date: "5/17/2013", percentage: 7},
            {date: "1/4/2013", percentage: 3}
        ];
    }

    getResourceDetail();

}