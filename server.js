const express = require('express');
const session = require('express-session');
	app = express();
	port = process.env.PORT || 3000;
mongoose = require('mongoose'),
User = require('./api/models/models'), //created model loading here
bodyParser = require('body-parser');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Tododb');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({secret:"hsadiuh323ujwqijsj1ijks", resave: false, saveUnitialized: true}));

const routes = require('./api/routes/routes'); //importing route
routes(app); //register the route

app.listen(port);


console.log('RESTful API server started on: ' + port);
