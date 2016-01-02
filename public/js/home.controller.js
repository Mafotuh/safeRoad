// Sauvegarge d'une reference pointant vers les donnée du noeud 'that' de l'app Firebase 
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
				console.log('autentification reussi Youpiiiiii !!!', authData)
				score.userData = authData.google;
			})
			.catch(function(error){
				console.error('Autentification raté Ha Ha Ha !!! ', error)
				score.authError = error;
			})
	}
	// Fin de la fonction signWithGoogle()

	score.signOut = function(){
		AuthFactory.$unauth();
	}
	
	AuthFactory.$onAuth(function(authData){
		if(!authData){
			score.userData = null;
		}
	})

	score.addMessage = function(){
		score.messages.$add({
			from: score.userData.displayName,
			msgaa: score.messageText,
			msg2aaa: score.messageText2,
		});
		score.messageText ='';
		score: score.messageText2='';
	}

	score.scorespg = function() {
		window.location = '#/quiz';
    }

    score.commanceparti = function(){
    	console.log('Validation OK');
    	score.messages.$add({
			author: score.userData.displayName,
			status: score.accepted
		});
    	console.log('La, je devais passer dans une autre page !!!');
    }
})

// Autre Controlleur de test
app.controller('homeCtrl', function(){

})
