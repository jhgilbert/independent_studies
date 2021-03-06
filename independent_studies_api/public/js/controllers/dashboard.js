// Dashboard controller
function dashCtrl($scope, $http) {
    $scope.navControls.selectedPanel = 'dashboard';

    console.log($.cookie());

    if ($.cookie('selected_notebook_item')) {
        $scope.uiControls.selectedNotebookItem = parseInt($.cookie('selected_notebook_item'));
    } else {
        $scope.uiControls.selectedNotebookItem = 0;
        $.cookie('selected_notebook_item', 0);
    }

    function buildProgressBars() {
        for (var i=0;i<$scope.notebookIndex.length;i++) {
            $scope.notebookIndex[i].completedArray = buildCompletedArray($scope.notebookIndex[i]['percentage']);
            $scope.notebookIndex[i].remainderArray = buildRemainderArray($scope.notebookIndex[i]['percentage']);
            $scope.notebookIndex[i].displayPercentage = $scope.notebookIndex[i]['percentage'];
            $scope.notebookIndex[i].updateInProgress = false;
        }
    }

    function getNotebookDetail(enrollment_id) {
        if (!enrollment_id) {
            return true;
        }
        $http.get('/notebook/detail?enrollment_id=' + enrollment_id).success(function (data){
            $scope.notebookDetail = data.detail;
            $scope.advancementAmount = $scope.notebookDetail.percentage;
            $(function () {
                $('#progressChart').highcharts({
                    chart: {
                        type: 'column'
                    },
                    title: {
                        text: ''
                    },
                    subtitle: {
                        text: ''
                    },
                    xAxis: {
                        type: 'datetime',
                        dateTimeLabelFormats: {
                            millisecond: '%b %d',
                            second: '%b %d %H:%M',
                            minute: '%m/%d %H:%M',
                            hour: '%m/%d %H:%M',
                            day: '%b %d',
                            month: '%b %Y',
                            year: '%Y'
                        }
                    },
                    yAxis: {
                        title: {
                            text: 'Progress made (in %)'
                        },
                        min: 0
                    },
                    tooltip: {
                        formatter: function() {
                            return Highcharts.dateFormat('%b %d %Y', this.x) +': '+ this.y +'%';
                        }
                    },
                    plotOptions: {
                        column: {
                            color: '#1eb69b'
                        }
                    },
                    series: [{
                        showInLegend: false,
                        name: '',
                        data: $scope.notebookDetail.advancements
                    }]
                });
            });
        });
    }

    function refreshNotebook() {
        $http.get('/notebook/index').success(function (data) {
            $scope.advancementInProgress = false;
            $scope.notebookIndex = data.notebook;
            if ($scope.notebookIndex.length > 0){
                getNotebookDetail($scope.notebookIndex[$scope.uiControls.selectedNotebookItem]['id']);
                buildProgressBars();
            }
        });
    }

    refreshNotebook();

    $scope.selectNotebookItem = function(index) {
        $scope.uiControls.selectedNotebookItem = index;
        $.cookie('selected_notebook_item', index);
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
    $scope.totalUnits = null;
    $scope.completedUnits = null;

    $scope.calculateAdvancement = function () {
        $scope.advancementAmount = parseInt((parseInt($scope.completedUnits) * 100) / parseInt($scope.totalUnits));
    };

    $scope.createAdvancement = function(enrollment_id) {
        $http.post('/advancements', {'advancement': {'enrollment_id': enrollment_id, 'amount': (parseInt($scope.advancementAmount) - $scope.notebookDetail.percentage)}}).success(function () {
            refreshNotebook();
            if (parseInt($scope.advancementAmount) === 100) {
                $scope.uiControls.activeAlert = true;
                $scope.uiControls.graduationAlert = true;
            }
        });
    };

    // INDIVIDUAL NOTES ================================================================================================

    $scope.initNote = function (enrollment_id) {
        $scope.navControls.globalNavIsVisible = false;
        $scope.noteInProgress = {
            'enrollment_id': enrollment_id,
            'text': ""
        }
    };

    $scope.createNote = function() {
        $http.post('/notes', {'note': $scope.noteInProgress}).success(function(){
            $scope.noteInProgress = null;
            $scope.navControls.globalNavIsVisible = true;
            refreshNotebook();
        });
    };

    $scope.exitNote = function() {
        $scope.noteInProgress = null;
        $scope.navControls.globalNavIsVisible = true;
    };

}