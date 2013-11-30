function transcriptCtrl($scope) {
    $scope.navControls.selectedPanel = 'transcript';
    $scope.transcript = [
        {'title':'Course 1', 'url': 'http://www.course1.com', 'date': '11/30/13'},
        {'title':'Course 2', 'url': 'http://www.course2.com', 'date': '11/31/13'}
    ];
}