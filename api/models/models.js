/**
 * @fileOverview Modelos dos tipos dos objetos a serem guardados no banco de dados
 * @author Marcelo Peres Toi
 * @version 1.0.0
 */
'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
*  Esquema de um usuário.
* @constructor
* @param {string} email - O email do usuário.
* @param {string} first_name - O primeiro nome do usuário.
* @param {string} last_name - O último nome do usuário.
* @param {string} personal_phone - O telefone pessoal do usuário.
*/
const UserSchema = new Schema({
	email: {type: String,	required: 'E-mail missing'},
	first_name: {type: String, required: 'First name missing'},
	last_name: {type: String,	required: 'Last name missing'},
	personal_phone:{type: String, required: 'Phone number missing'}
});

/**
*  Esquema de um usuário registrado.
* @constructor
* @param {string} username - O username do usuário registrado.
* @param {string} password - A senha do usuário registrado.
*/
const RegisteredUserSchema = new Schema({
	username: {type: String, unique: true},
	password: {type: String}
});

module.exports = mongoose.model('Users', UserSchema);
module.exports = mongoose.model('RegisteredUsers', RegisteredUserSchema);
