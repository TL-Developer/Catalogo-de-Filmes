var Filme = require('../models/filme.js');

exports.index = function(req, res){
	res.render('index');
}

exports.lista = function(req, res){
	Filme.find({}, function(erro, filmes){
		if (erro) console.log(erro);

		res.json({filmes: filmes});
	});
};

exports.grava = function(req, res){
	var filme = new Filme(req.body);

	filme.save(function(erro, filme){
		console.log(filme);

		res.send(filme);
	});	
};

exports.deleta = function(req, res){
	var id = req.params.id;

	Filme.findByIdAndRemove(id, function(erro, filme){

		res.send('Filme '+ filme.titulo + ' removido com sucesso!');
	});
};

exports.atualiza = function(req, res){
	var id = req.body._id;
	delete req.body._id;

	Filme.findByIdAndUpdate(id, req.body, function(error, filme){
		res.send('Filme '+ filme.titulo + ' atualizado com sucesso');
	});
};