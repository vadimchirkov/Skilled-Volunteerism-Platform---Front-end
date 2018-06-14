import angular from 'angular';
import marked from 'marked';
import jsyaml from 'js-yaml';
import 'angular-sanitize';
import 'angular-ui-router';

var app = angular.module('app', [
    'ui.router', 'ngSanitize'
])

app.controller('indexCtrl', function($scope, $parse, $http, $rootScope) {

    // All the projects data stored here
    
    $scope.projects = [{
        "org": { // First Project in list
            "name": "Organization 1", // Organization Name
            "desc": "Donec maximus dolor sed leo faucibus, at tincidunt odio ornare. Vestibulum ac congue elit." // Organization Description
        },
        "name": "Project 1", // Project Name
        "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ", // Project Description
        "tasks": [{ // List of tasks
            "name": "Task 1", // First Task Name
            "desc": "Cras cursus sit amet ante ut laoreet." // Task Description
        }, {
            "name": "Task 2",  // Second task Name
            "desc": "Fusce sed commodo erat." // Second task decription
        }]
    }, {
        "org": { // Second Project
            "name": "Organization 2",
            "desc": " Curabitur vitae venenatis libero, ac tincidunt sapien."
        },
        "name": "Project 2", 
        "desc": "Maecenas faucibus, neque quis eleifend luctus",
        "tasks": [{ 
            "name": "Task 1",
            "desc": "Praesent rutrum aliquam suscipit."
        }, {
            "name": "Task 2",
            "desc": "Curabitur egestas massa in risus scelerisque consectetur."
        }]
    }];


});

/* Ui Router */
app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    return $stateProvider
        .state('main', {
            url: "/",
            templateUrl: 'templates/main.html',
            controller: 'indexCtrl'
        })
});