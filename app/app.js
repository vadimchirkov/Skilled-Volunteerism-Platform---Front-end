import angular from 'angular';
//import marked from 'marked';
//import jsyaml from 'js-yaml';
import 'angular-sanitize';
import 'angular-ui-router';

var app = angular.module('app', [
    'ui.router', 'ngSanitize'
])

app.controller('projectsCtrl', function ($scope, $parse, $http, $rootScope) {

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
            "name": "Task 2", // Second task Name
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

app.controller('indexCtrl', function ($scope, $parse, $http, $rootScope) {

});

app.controller('profileCtrl', function ($scope, $parse, $http, $rootScope) {

});

app.controller('orgCtrl', function ($scope, $parse, $http, $rootScope) {

    // Import the prerequisites
    const { providers, Wallet } = require('ethers');
    const { default: EthersAdapter } = require('@colony/colony-js-adapter-ethers');
    const { TrufflepigLoader } = require('@colony/colony-js-contract-loader-http');

    // Import the ColonyNetworkClient
    const { default: ColonyNetworkClient } = require('@colony/colony-js-client');

    // Create an instance of the Trufflepig contract loader
    const loader = new TrufflepigLoader();

    // Create a provider for local TestRPC (Ganache)
    const provider = new providers.JsonRpcProvider('http://localhost:8545/');

    // Get the private key from the first account from the ganache-accounts
    // through trufflepig
    const { privateKey } = loader.getAccount(0);

    // Create a wallet with the private key (so we have a balance we can use)
    const wallet = new Wallet(privateKey, provider);

    // Create an adapter (powered by ethers)
    const adapter = new EthersAdapter({
        loader,
        provider,
        wallet,
    });

    // Connect to ColonyNetwork with the adapter!
    const networkClient = new ColonyNetworkClient({ adapter });
    networkClient.init();

    // Let's deploy a new ERC20 token for our Colony.
    // You could also skip this step and use a pre-existing/deployed contract.
    const tokenAddress = networkClient.createToken({
        name: 'Cool Colony Token',
        symbol: 'COLNY',
    });
    console.log('Token address: ' + tokenAddress);

    // Create a cool Colony!
    const {
        eventData: { colonyId, colonyAddress },
    } = networkClient.createColony.send({ tokenAddress });

    // Congrats, you've created a Colony!
    console.log('Colony ID: ' + colonyId);
    console.log('Colony address: ' + colonyAddress);

    // For a colony that exists already, you just need its ID:
    const colonyClient = networkClient.getColonyClient(colonyId);

    // Or alternatively, just its address:
    // const colonyClient = await networkClient.getColonyClientByAddress(colonyAddress);

    // You can also get the Meta Colony:
    const metaColonyClient = networkClient.getMetaColonyClient();
    console.log('Meta Colony address: ' + metaColonyClient.contract.address);

    $scope.colonies = [{
        "org": { // Meta Colony
            "name": "Meta Colony", // Organization Name
            "desc": "Donec maximus dolor sed leo faucibus, at tincidunt odio ornare. Vestibulum ac congue elit." // Organization Description
        },
        "org": { // First Project in list
            "name": "Organization 1", // Organization Name
            "desc": "Donec maximus dolor sed leo faucibus, at tincidunt odio ornare. Vestibulum ac congue elit." // Organization Description
        },
    }]

});

/* Ui Router */
app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state('main', {
            url: "/",
            templateUrl: 'templates/main.html',
            controller: 'indexCtrl'
        })
        .state('projects', {
            url: "/projects",
            templateUrl: 'templates/projects.html',
            controller: 'projectsCtrl'
        })
        .state('organisation', {
            url: "/organisation",
            templateUrl: 'templates/organisation.html',
            controller: 'orgCtrl'
        })
        .state('profile', {
            url: "/profile",
            templateUrl: 'templates/profile.html',
            controller: 'profileCtrl'
        })
});