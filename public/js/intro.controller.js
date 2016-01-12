/*Enregistremennt des signatures des utilisateurs 
sur les condition d'utilisation du services.*/

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
			score.userData = authData.google;
		})
		.catch(function(error){
			score.authError = error;
		})
	}
	
	AuthFactory.$onAuth(function(authData){
		if(authData){
			score.userData = authData.google;
		}
	})

    score.commanceparti = function(){

    	/*En cochant sur le bouton "Accepter les mention legale", la valeur 'true'
    	sela enregistrement en base pour la confirmation des mention legale*/
    	score.messages.$add({
			author: score.userData.displayName,
			status: score.accepted
		});

    	// redirection vers la page des question
    	window.location.assign("#/quiz");
    }
});
