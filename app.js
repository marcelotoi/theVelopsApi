/**
 * @fileOverview Criação do server e do aplicativo
 * @author Marcelo Peres Toi
 * @version 1.0.0
 */
const express = require('express');
const session = require('express-session');
var swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./swagger.json');

app = express();
port = process.env.PORT || 3000;
mongoose = require('mongoose'),
User = require('./api/models/models'),
bodyParser = require('body-parser');

//Conexao do mongoose
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({secret:"hsadiuh323ujwqijsj1ijks", resave: false, saveUnitialized: true}));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const routes = require('./api/routes/routes'); //Importa as rotas
routes(app); //Implementa as rotas no app

app.listen(port);


console.log('RESTful API server started on: ' + port);
