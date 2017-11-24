/**
 * @fileOverview Funções a serem ligadas às rotas
 * @author Marcelo Peres Toi
 * @version 1.0.0
 */
'use strict';

const mongoose = require('mongoose'),
	User = mongoose.model('Users');
const RegisteredUser = mongoose.model('RegisteredUsers');

/**
*Lista todos os usuários do banco de dados.
*/
exports.list_all_users = function(req, res) {
	if(!req.session.registeredUser)
		return res.json({message: 'You need to log in first!'});
	User.find({}, function(err, user) {
		if (err){
		  res.send(err);
		}
		res.json(user);
	});
};

/**
*Cria um usuário no banco de dados.
*/
exports.create_an_user = function(req,res){
	if(!req.session.registeredUser) //Verifica se o usuario esta logado
		return res.json({message: 'You need to log in first!'});
	const new_user = new User(req.body);
	new_user.save(function(err,user){
		if(err){
			res.status(400).send('Something went wrong! Make sure that the request has a first_name, a last_name, an email and a personal_phone');
		}
		res.json(user);

	});
};

/**
*Procura por um usário no banco de dados pela ID.
*/
exports.read_an_user = function(req, res) {
	if(!req.session.registeredUser) //Verifica se o usuario esta logado
		return res.json({message: 'You need to log in first!'});
	User.findById({_id: req.params.id}, function(err, user) { //Procura a ID inserida na url no banco de dados
		if (err){
    	if (err.message.indexOf('Cast to ObjectId failed') !== -1){ //Identifica se o erro é: ID não foi reconhecida
				console.log(err);
				res.status(404).send('User not found');
			}else{
				res.send(err);
			}
		}
		res.json(user);
	});
};

/**
*Atualiza as informações de um usuário do banco de dados.
*/
exports.update_an_user = function(req, res) {
	if(!req.session.registeredUser) //Verifica se o usuario esta logado
		return res.json({message: 'You need to log in first!'});
	User.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, user) {
		if (err){
    	if (err.message.indexOf('Cast to ObjectId failed') !== -1){ //Identifica se o erro é: ID não foi reconhecida
				console.log(err);
				res.status(404).send('User not found');
			}else{
				res.send(err);
			}
		}
		res.json(user);
	});
};

/**
*Deleta um usuário do banco de dados a partir da ID.
*/
exports.delete_an_user = function(req, res) {
	if(!req.session.registeredUser) //Verifica se o usuario esta logado
		return res.json({message: 'You need to log in first!'});
	User.remove({_id: req.params.id}, function(err, user) {
		if (err){
    	if (err.message.indexOf('Cast to ObjectId failed') !== -1){ //Identifica se o erro é: ID não foi reconhecida
				console.log(err);
				res.status(404).send('User not found');
			}else
				res.send(err);
		}else{
			res.json({ message: 'User successfully deleted' });
		}
	});
};

/**
*Registra o usuário para Basic Auth.
*/
exports.register = function(req,res){
	const username = req.body.username;
	const password = req.body.password;
	const newUser = new RegisteredUser();
	newUser.username = username;
	newUser.password = password;
	newUser.save(function(err,savedUser){
		if(err){
			res.json(err);
		}
		res.json({message: 'User successfully registered' });
	});
};

/**
*Faz o login do usuário na Basic Auth.
*/
exports.login = function(req,res){
	const username = req.body.username;
	const password = req.body.password;

	RegisteredUser.findOne({username: username, password: password}, function(err,registeredUser){
		if (err){
    	if (err.message.indexOf('Cast to ObjectId failed') !== -1){
				console.log(err);
				res.status(401).send('User not registered');
			}else{
				res.send(err);
			}
		}else{
			if(!registeredUser){
				res.status(401).json('User not registered');
			}else{
				req.session.registeredUser = registeredUser;
				res.json('User successfully logged in');
			}
		}
	});
};
