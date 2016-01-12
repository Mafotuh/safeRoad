/* Enregistrement des reponse des utilisateurs */

var scoreData = new Firebase('https://boiling-torch-3226.firebaseio.com/vectograph');

app.factory('AuthFactory', function($firebaseAuth){
	return $firebaseAuth(scoreData);

}).factory('MessagesFactory', function($firebaseArray){
	return $firebaseArray(scoreData);

}).controller('quizCtrl', function(AuthFactory, MessagesFactory, $scope){
	
	var score = this;

	score.userData = null;
	score.messages = MessagesFactory;
	
	AuthFactory.$onAuth(function(authData){
		if(authData){
			score.userData = authData.google;
		}
	})
	
	var next = function(min, max) {
		return Math.floor(Math.random() * (max - min) + min);
	}

    var questionnaire=[
		{
			question : 'Y-a-t-il combiens des doigts chez les Simpson ?', 
			reponses : {
				pro1 : '5', 
				pro2 : '3', 
				pro3 : '4'
			}
		},
		{
			question : 'Si on renverse un gan de la main droite, il rentre sur ', 
			reponses : { 
				pro1 : 'La main droite', 
				pro2 : 'La main gauche', 
				pro3 : 'Aucun des deux'
			}
		},
		{
			question : 'Quand un droitier écrit avec la main gauche, il commence ', 
			reponses : {
				pro1 : 'De la gauche vers la droite', 
				pro2 : 'De la droite vers la gauche', 
				pro3 : 'De haut en bas'
			}
		},
		{
			question : 'Si un chien roule à 120Km/h et arrive au feux-rouge', 
			reponses : {
				pro1 : 'Il s’arrête', 
				pro2 : 'Il continue', 
				pro3 : 'Ou autre chose '
			}
		},
		{
			question : 'Si un Tigre en carton menace la ville', 
			reponses : {
				pro1 : 'On le tue', 
				pro2 : 'On le déchire', 
				pro3 : 'On protège en le mettant au Zoo'
			}
		},
		{
			question : 'Un pêcheur pêche des oiseaux, il doit obligatoirement', 
			reponses : {
				pro1 : 'Les remettre à l’eau', 
				pro2 : 'Appeler la garde de côte', 
				pro3 : 'Ou autre chose'
			}
		},
		{
			question : 'Si dans un rêve, tu roule à 200Km/h, et tu trouve un pont cassé, tu va', 
			reponses : {
				pro1 : 'Faire un cross', 
				pro2 : 'Faire un dérapage forcé', 
				pro3 : 'Ou autre chose'
			}
		}
	];	

	var myMax = questionnaire.length;

	next = next(0, myMax);
	var usedIndex = [];

	if (!(next in usedIndex)) {
		usedIndex.push(next);
		$scope.questionencours = questionnaire.slice(next, next+1);
	}

	score.afficheQuestionSuivant = function(){
		//CODE Comes here !!!
	}

    score.sauvegardeResultat = function(){

    	/*Tentative d'envoie des reponse vers le serveur Firebase dès qu'on clique sur suivant */
    	score.messages.$add({
			author: score.userData.displayName,
			status: score.reponse
		}).afficheQuestionSuivant();
    }
});
