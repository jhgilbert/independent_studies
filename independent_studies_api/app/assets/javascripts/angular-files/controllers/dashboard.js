// Dashboard controller
function dashCtrl($scope) {
    $scope.uiControls = {selectedResourceIndex: null};

    // For prototyping only -- will be provided by API
    $scope.resources = [
        {name: "UX class", percentage: 42},
        {name: "JavaScript class", percentage: 23},
        {name: "Security book", percentage: 98}
    ];

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

    function buildProgressBars() {
        for (var i=0;i<$scope.resources.length;i++) {
            $scope.resources[i].completedArray = buildCompletedArray($scope.resources[i]['percentage']);
            $scope.resources[i].remainderArray = buildRemainderArray($scope.resources[i]['percentage']);
            $scope.resources[i].displayPercentage = $scope.resources[i]['percentage'];
            $scope.resources[i].updateInProgress = false;
        }
    }

    buildProgressBars();

    // FORM CONTROLS ===============================================================================================

    $scope.submitResourceForm = function() {
        // post will go here
        // get will go here
        buildProgressBars();
        for (var i=0;i<$scope.resources.length;i++) {
            $scope.resources[i].updateInProgress = false;
        }
    };

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