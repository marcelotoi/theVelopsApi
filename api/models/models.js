'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	email: {type: String,	required: 'E-mail missing'},
	first_name: {type: String, required: 'First name missing'},
	last_name: {type: String,	required: 'Last name missing'},
	personal_phone:{type: String, required: 'Phone number missing'}
});

const RegisteredUserSchema = new Schema({
	username: {type: String, unique: true},
	password: {type: String}
});

module.exports = mongoose.model('Users', UserSchema);
module.exports = mongoose.model('RegisteredUsers', RegisteredUserSchema);
