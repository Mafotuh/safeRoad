var app = angular.module('safeRoad', ['ui.router', 'firebase']);

// Configuration des routting 
app.config(function($stateProvider, $urlRouterProvider){
	
	$stateProvider
	.state('home', {
		url: '/',
		templateUrl: 'home.html',
		controller: 'connexionCtrl', 
		controllerAs: 'connect'
	})
	.state('quiz', {
		url: '/quiz',
		templateUrl: 'quiz.html',
		controller: 'quizCtrl', 
		controllerAs: 'quiz'
	})
	.state('resultat', {
		url: '/resultat',
		templateUrl: 'resultat.html',
		controller: 'resultatCtrl', 
		controllerAs: 'resultat'
	})
	.state('score', {
		url: '/score',
		templateUrl: 'score.html',
		controller: 'scoreCtrl', 
		controllerAs: 'score'
	}); 

	$urlRouterProvider.otherwise('/');
});

var tchatRef = new Firebase('https://radiant-heat-2931.firebaseio.com/tchat');