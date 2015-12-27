'use strict';
/**
 * @ngdoc overview
 * @name sp1r0s
 * @description
 * Main module of the application.
 */
angular.module('sp1r0s', ['ui.bootstrap']);

particlesJS.load('particles-js', 'resources/particles-conf.json', function() {
  console.log('particles-js config loaded');
});