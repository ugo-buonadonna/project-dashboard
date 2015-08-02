'use strict';

/* jshint -W098 */
angular.module('mean.pivotal-tracker').controller('PivotalTrackerController', ['$scope','$http', 'Global', 'PivotalTracker',
  function($scope,$http, Global, PivotalTracker) {


    $http.defaults.useXDomain = true;
    $scope.global = Global;
    $scope.projectID = 1398148; //Passparyou project id hardcoded
    $scope.andreaID = 1748762;
    $scope.davideID = 1748768;
    $scope.ugoID = 1748750;
    $scope.nextDemoDay = new Date('08/13/2015');
    $scope.teamMembers = 3; //per ora

    $scope.package = {
      name: 'pivotal-tracker'
    };

    // Get all project stories
    PivotalTracker.getAllStories($scope.projectID).then( (stories) => { $scope.allStories = stories});

    // Get all sprint stories
    PivotalTracker.getAllIterations($scope.projectID).then( (iterations) => { $scope.allIterations = iterations});

    // Get current sprint
    // and its stories
    // and calculates remaining mandays
    PivotalTracker.getCurrentIteration($scope.projectID).then( (currentIteration) => {
      $scope.currentIterationStories = currentIteration.stories;
      $scope.currentIteration = currentIteration
    });


    PivotalTracker.getCurrentIterationUserAssignedStories($scope.projectID,$scope.ugoID).then( (stories) => {
      $scope.storiesUgo = stories;
    });
    PivotalTracker.getCurrentIterationUserAssignedStories($scope.projectID,$scope.davideID).then( (stories) => {
      $scope.storiesDavide = stories;
    });
    PivotalTracker.getCurrentIterationUserAssignedStories($scope.projectID,$scope.andreaID).then( (stories) => {
      $scope.storiesAndrea = stories;
    });


    //Per prendere i task di una storia, vedo l'attibuto 'data-story-id' del bottone premuto
    $scope.getStoryTasks = (element) => {
      PivotalTracker.getStoryTasks($scope.projectID,element.target.getAttribute("data-story-id"))
          .then((tasks) => { $scope.tasks = tasks})
    }


    $scope.getRemainingMandays = (demoDay,teamMembers) => PivotalTracker.getRemainingMandays(demoDay,teamMembers)

  }]);
