'use strict';

angular.module('mean.pivotal-tracker').factory('PivotalTracker', ['$http', '$q', function ($http, $q) {
    return {
        name: 'pivotal-tracker',
        getEpics: function getEpics(projectId) {
            var response = $q.defer();
            $http.get('https://www.pivotaltracker.com/services/v5/projects/' + projectId + '/epics').success(function (epics) {
                response.resolve(epics);
            }).error(function (message) {
                response.reject(message);
            });
            return response.promise;
        },

        getStories: function getStories(projectID, epicID) {
            var response = $q.defer();
            $http.get('https://www.pivotaltracker.com/services/v5/projects/' + projectID + '/stories', {
                headers: {
                    'X-TrackerToken': '222069cee93cc9a8651bb4bcccc2c5d7'
                }
            }).success(function (epics) {
                response.resolve(epics);
            }).error(function (message) {
                response.reject(message);
            });
            return response.promise;
        }

    };
}]);

//# sourceMappingURL=pivotalTrackerService.js.map