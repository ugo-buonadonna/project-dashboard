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

          getStories : (projectID,epicID) => {
              let response = $q.defer();
              $http.get(`https://www.pivotaltracker.com/services/v5/projects/${projectID}/stories`,
              {
                      headers: {
                          'X-TrackerToken': '222069cee93cc9a8651bb4bcccc2c5d7'
                      }
                  })
                  .success( (epics) => { response.resolve(epics)})
                  .error( (message) => { response.reject(message)})
              return response.promise;
          }


      }
  }
]);

