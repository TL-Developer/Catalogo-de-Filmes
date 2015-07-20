var express = require('express'),
	app = express(),
	path = require('path'),
	routes = require('./routes'),
	bodyParser = require('body-parser');


app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', routes.index);
app.get('/lista', routes.lista);
app.post('/grava', routes.grava);
app.delete('/filme/:id', routes.deleta);
app.put('/filme', routes.atualiza);

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function(){
	console.log('Servidor foi startado na porta ' + server.address().port)
})