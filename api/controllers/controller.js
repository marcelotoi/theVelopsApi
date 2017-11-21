'use strict';

const mongoose = require('mongoose'),
	User = mongoose.model('Users');
	const RegisteredUser = mongoose.model('RegisteredUsers');


exports.list_all_users = function(req, res) {
	if(!req.session.registeredUser)
		return res.json({message: 'You need to log in first!'});
	User.find({}, function(err, user) {
		if (err){
		  res.send(err);
		}
		res.json(user);
		return res.status(200).send();
	});
};


exports.create_an_user = function(req,res){
	if(!req.session.registeredUser)
		return res.json({message: 'You need to log in first!'});
	const new_user = new User(req.body);
	new_user.save(function(err,user){
		if(err){
			res.send(err);
		}
		return res.status(201).send();
		res.json(user);

	});
};

exports.read_an_user = function(req, res) {
	if(!req.session.registeredUser)
		return res.json({message: 'You need to log in first!'});
	User.findById({_id: req.params.id}, function(err, user) {
		if (err){
			res.send(err);
		}
		res.json(user);
		return res.status(200).send();
	});
};


exports.update_an_user = function(req, res) {
	if(!req.session.registeredUser)
		return res.json({message: 'You need to log in first!'});
	User.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, user) {
		if (err){
			res.send(err);
		}
		res.json(user);
		return res.status(200).send();
	});
};


exports.delete_an_user = function(req, res) {
	if(!req.session.registeredUser)
		return res.json({message: 'You need to log in first!'});
	User.remove({
		_id: req.params.id
	}, function(err, user) {
		if (err){
			res.send(err);
		}
		return res.status(200).send();
		res.json({ message: 'User successfully deleted' });
	});
};

exports.register = function(req,res){
	const username = req.body.username;
	const password = req.body.password;
	const newUser = new RegisteredUser();
	newUser.username = username;
	newUser.password = password;
	newUser.save(function(err,savedUser){
		if(err){
			console.log(err);
		}
		res.json({message: 'User successfully registered' })
	})
};

exports.login = function(req,res){
	const username = req.body.username;
	const password = req.body.password;

	RegisteredUser.findOne({username: username, password: password}, function(err,registeredUser){
		if(err){
			res.json(err);
		}
		if(!registeredUser){
			return res.status(404).send();
		}
		req.session.registeredUser = registeredUser;
		res.json({message: 'User successfully logged in' })
	})
};
