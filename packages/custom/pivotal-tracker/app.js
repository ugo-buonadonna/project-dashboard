'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var PivotalTracker = new Module('pivotal-tracker');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
PivotalTracker.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  PivotalTracker.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  PivotalTracker.menus.add({
    title: 'pivotalTracker example page',
    link: 'pivotalTracker example page',
    roles: ['authenticated'],
    menu: 'main'
  });
  
  PivotalTracker.aggregateAsset('css', 'pivotalTracker.css');


  return PivotalTracker;
});
