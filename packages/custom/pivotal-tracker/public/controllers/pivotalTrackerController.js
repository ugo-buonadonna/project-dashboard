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

  //Per prendere i task di una storia, vedo l'attibuto 'data-story-id' del bottone premuto
  $scope.getStoryTasks = function (element) {
    PivotalTracker.getStoryTasks($scope.projectID, element.target.getAttribute('data-story-id')).then(function (tasks) {
      $scope.tasks = tasks;
    });
  };
}]);

//# sourceMappingURL=pivotalTrackerController.js.map