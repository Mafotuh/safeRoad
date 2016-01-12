// Connexion à l'Application sur Farebase
var scoreData = new Firebase('https://boiling-torch-3226.firebaseio.com/score');

app.factory('AuthFactory', function($firebaseAuth){
	return $firebaseAuth(scoreData);
})

app.factory('MessagesFactory', function($firebaseArray){
	return $firebaseArray(scoreData);
})

app.controller('connexionCtrl', function(AuthFactory, MessagesFactory){
	var score = this;

	score.userData = null;
	score.messages = MessagesFactory;

	score.signWithGoogle = function(){
		AuthFactory
			.$authWithOAuthPopup('google')
			.then(function(authData){
				score.userData = authData.google;
			})
			.catch(function(error){
				score.authError = error;
		})
	}

	score.signOut = function(){
		AuthFactory.$unauth();
	}
	
	AuthFactory.$onAuth(function(authData){
		if(!authData){
			score.userData = null;
		}
	})

	score.scorespg = function() {
		window.location = '#/quiz';
	}
})