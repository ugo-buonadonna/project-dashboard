'use strict';

/* jshint -W098 */
angular.module('mean.pivotal-tracker').controller('PivotalTrackerController', ['$scope', '$http', 'Global', 'PivotalTracker', function ($scope, $http, Global, PivotalTracker) {
  $http.defaults.useXDomain = true;
  $scope.global = Global;
  $scope.projectID = 1398148; //Passparyou project id hardcoded
  $scope['package'] = {
    name: 'pivotal-tracker'
  };

  PivotalTracker.getStories($scope.projectID).then(function (stories) {
    alert(stories);$scope.stories = stories;
  });
}]);

//# sourceMappingURL=pivotalTrackerController.js.map