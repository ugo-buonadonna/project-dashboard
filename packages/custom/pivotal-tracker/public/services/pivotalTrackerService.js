'use strict';

angular.module('mean.pivotal-tracker').factory('PivotalTracker', ['$http', '$q', function ($http, $q) {

    var addMandaysCategoryToStories = function addMandaysCategoryToStories(stories) {
        return stories.map(function (story) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {

                for (var _iterator = story.labels[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var label = _step.value;

                    if (label.name.includes('m:')) story.mandays = parseInt(label.name.substring(2));
                    if (label.name.includes('c:')) story.category = label.name.substring(2);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator['return']) {
                        _iterator['return']();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return story;
        });
    };

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

        getAllStories: function getAllStories(projectID) {
            var response = $q.defer();
            $http.get('https://www.pivotaltracker.com/services/v5/projects/' + projectID + '/stories', {
                headers: {
                    'X-TrackerToken': '222069cee93cc9a8651bb4bcccc2c5d7'
                }
            }).success(function (stories) {
                response.resolve(addMandaysCategoryToStories(stories));
            }).error(function (message) {
                response.reject(message);
            });
            return response.promise;
        },

        getAllIterations: function getAllIterations(projectID) {
            var response = $q.defer();
            $http.get('https://www.pivotaltracker.com/services/v5/projects/' + projectID + '/iterations', {
                headers: {
                    'X-TrackerToken': '222069cee93cc9a8651bb4bcccc2c5d7'
                }
            }).success(function (iterations) {
                iterations = iterations.map(function (x) {
                    x.start = new Date(x.start).toDateString();
                    x.finish = new Date(x.finish).toDateString();
                    return x;
                });
                response.resolve(iterations.filter(function (x) {
                    return x.length > 0;
                }));
            }).error(function (message) {
                response.reject(message);
            });
            return response.promise;
        },

        getCurrentIterationStories: function getCurrentIterationStories(projectID) {
            var response = $q.defer();
            $http.get('https://www.pivotaltracker.com/services/v5/projects/' + projectID + '/iterations', {
                headers: {
                    'X-TrackerToken': '222069cee93cc9a8651bb4bcccc2c5d7'
                }
            }).success(function (iterations) {
                response.resolve(addMandaysCategoryToStories(iterations[iterations.length - 1].stories));
            }).error(function (message) {
                response.reject(message);
            });
            return response.promise;
        },
        getStoryTasks: function getStoryTasks(projectID, storyID) {
            var response = $q.defer();
            $http.get('https://www.pivotaltracker.com/services/v5/projects/' + projectID + '/stories/' + storyID + '/tasks', {
                headers: {
                    'X-TrackerToken': '222069cee93cc9a8651bb4bcccc2c5d7'
                }
            }).success(function (tasks) {
                response.resolve(tasks);
            }).error(function (message) {
                response.reject(message);
            });
            return response.promise;
        }

    };
}]);

//# sourceMappingURL=pivotalTrackerService.js.map