angular.module('catagolo').controller('FilmesController', function($scope, $http){

	$scope.filmes = [];

	$http.get('/lista')
	.success(function(retorno){
		$scope.filmes = retorno.filmes;
		console.log($scope.filme);
	})
	.error(function(erro){
		console.log(erro);
	});

	function Filme(){
		this.titulo = '';
		this.diretor = '';
		this.ano = '';
	};

	$scope.filme = new Filme();

	var adicionaFilme = function(){
		$http.post('/grava', $scope.filme)
		.success(function(retorno){
			console.log(retorno);
			$scope.filmes.push(retorno);

			$scope.filme = new Filme();
		});
	};	

	var atualizarFilme = function(){
		$http.put('/filme', $scope.filme).success(function(){
			$scope.filme = new Filme();
		});
	};


	$scope.mostraFilme = function(filme){
		$scope.filmeSelecionado = filme;
	};

	$scope.deletaFilme = function(filme){
		$http.delete('/filme/' + filme._id).success(function(retorno){
			$scope.filmeSelecionado = null;

			var index = $scope.filmes.indexOf(filme);
			$scope.filmes.splice(index, 1);
		});
	};

	$scope.editaFilme = function(filme){
		$scope.filme = filme;
			
	};

	$scope.enviaFilme = function(){
		if($scope.filme._id){
			atualizarFilme();
		}else{
			adicionaFilme();
		}
	};
});