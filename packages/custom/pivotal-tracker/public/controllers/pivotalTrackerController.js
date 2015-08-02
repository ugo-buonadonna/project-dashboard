'use strict';

/* jshint -W098 */
angular.module('mean.pivotal-tracker').controller('PivotalTrackerController', ['$scope', '$http', 'Global', 'PivotalTracker', function ($scope, $http, Global, PivotalTracker) {
  $http.defaults.useXDomain = true;
  $scope.global = Global;
  $scope.projectID = 1398148; //Passparyou project id hardcoded
  $scope['package'] = {
    name: 'pivotal-tracker'
  };

  PivotalTracker.getAllStories($scope.projectID).then(function (stories) {
    $scope.stories = stories;
  });
  PivotalTracker.getAllIterations($scope.projectID).then(function (iterations) {
    $scope.iterations = iterations;
  });
  PivotalTracker.getCurrentIterationStories($scope.projectID).then(function (currentStories) {
    $scope.currentIterationStories = currentStories;
  });
}]);

//# sourceMappingURL=pivotalTrackerController.js.map