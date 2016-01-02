// Permet d'enregistrer les signatures des utilisateurs sur les condition d'utilisation du services. 
var scoreData = new Firebase('https://boiling-torch-3226.firebaseio.com/vectograph');

app.factory('AuthFactory', function($firebaseAuth){
	return $firebaseAuth(scoreData);
}).factory('MessagesFactory', function($firebaseArray){
	return $firebaseArray(scoreData);
}).controller('valitationCtrl', function(AuthFactory, MessagesFactory){
	
	var score = this;

	score.userData = null;
	score.messages = MessagesFactory;

	score.signWithGoogle = function(){
		AuthFactory
			.$authWithOAuthPopup('google')
			.then(function(authData){
				console.log('autentification reussi Youpiiiiii !!!', authData)
				score.userData = authData.google;
			})
			.catch(function(error){
				console.error('Autentification raté Ha Ha Ha !!! ', error)
				score.authError = error;
			})
	}
	// Fin de la fonction signWithGoogle()
	
	AuthFactory.$onAuth(function(authData){
		if(authData){
			score.userData = authData.google;
		}
	})

    score.commanceparti = function(){
    	// Premiere opperation 
    	console.log('Validation OK');

    	// Deusieme opperation 
    	score.messages.$add({
			author: score.userData.displayName,
			status: score.accepted
		});

    	// Troisieme opperation 
    	console.log('La, je devais passer dans une autre page !!!');
    	window.location.assign("#/quiz");
    }
});
