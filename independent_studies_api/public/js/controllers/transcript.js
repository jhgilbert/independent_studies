function transcriptCtrl($scope, $http) {
    $scope.navControls.selectedPanel = 'transcript';
    $http.get("/enrollments/transcript").success(function (data) {
        $scope.transcript = data['transcript'];
    });
}