'use strict';

angular.module('mean.pivotal-tracker').factory('PivotalTracker', ['$http','$q',
  function($http,$q) {
      return {
          name: 'pivotal-tracker',
          getEpics: (projectId) => {
            let response = $q.defer();
            $http.get(`https://www.pivotaltracker.com/services/v5/projects/${projectId}/epics`)
                .success( (epics) => { response.resolve(epics)})
                .error( (message) => { response.reject(message)})
            return response.promise;
          },

          getAllStories : (projectID) => {
              let response = $q.defer();
              $http.get(`https://www.pivotaltracker.com/services/v5/projects/${projectID}/stories`,
              {
                      headers: {
                          'X-TrackerToken': '222069cee93cc9a8651bb4bcccc2c5d7'
                      }
                  })
                  .success( (stories) => { response.resolve(stories)})
                  .error( (message) => { response.reject(message)})
              return response.promise;
          },

          getAllIterations : (projectID) => {
              let response = $q.defer();
              $http.get(`https://www.pivotaltracker.com/services/v5/projects/${projectID}/iterations`,
                  {
                      headers: {
                          'X-TrackerToken': '222069cee93cc9a8651bb4bcccc2c5d7'
                      }
                  })
                  .success( (iterations) => {
                      iterations = iterations.map(
                              x => { x.start = (new Date(x.start)).toDateString();
                              x.finish = (new Date(x.finish)).toDateString();
                              return x;});
                      response.resolve(iterations.filter(x => x.length>0))})
                  .error( (message) => { response.reject(message)})
              return response.promise;
          },

          getCurrentIterationStories : (projectID) => {
              let response = $q.defer();
              $http.get(`https://www.pivotaltracker.com/services/v5/projects/${projectID}/iterations`,
                  {
                      headers: {
                          'X-TrackerToken': '222069cee93cc9a8651bb4bcccc2c5d7'
                      }
                  })
                  .success( (iterations) => {
                      response.resolve(iterations[iterations.length-1].stories)})
                  .error( (message) => { response.reject(message)})
              return response.promise;
          }


      }
  }
]);

