const db = require('../config/db.config.js');
const config = require('../config/config.js');
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

exports.signup = (req, res) => {
	// Save User to Database
	console.log("Processing func -> SignUp");
	
	User.create({
		name: req.body.name,
		username: req.body.username,
		email: req.body.email,
		password: bcrypt.hashSync(req.body.password, 8)
	}).then(user => {
		Role.findAll({
		  where: {
			name: {
			  [Op.or]: req.body.roles
			}
		  }
		}).then(roles => {
			user.setRoles(roles).then(() => {
				res.status(200).send({
					code:200, 
					msg:"User registered successfully!", 
					//data:user
				});
            });
		}).catch(err => {
			res.status(500).send({
				code:500, 
				msg: "Error", 
				error: err
			});
		});
	}).catch(err => {
		res.status(500).send({
			code:500, 
			msg: "Failed err", 
			error: err
		});
	})
}

exports.signin = (req, res) => {
	console.log("Sign-In");
	
	User.findOne({
		where: {
			username: req.body.username
		}
	}).then(user => {
		if (!user) {
			return res.status(404).send({
				code:404, 
				msg: 'User Not Found.'
			});
		}

		var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
		if (!passwordIsValid) {
			return res.status(401).send({ 
				auth: false, 
				accessToken: null, 
				reason: "Invalid Password!" 
			});
		}
		
		var token = jwt.sign({ id: user.id }, config.secret, {
		  expiresIn: 86400 // expires in 24 hours
		});
		
		res.status(200).send({ 
			auth: true, 
			accessToken: token 
		});
		
	}).catch(err => {
		res.status(500).send({
			code:500, 
			msg: "Failed err", 
			error: err
		});
	});
}

exports.userContent = (req, res) => {
	User.findOne({
		where: {id: req.userId},
		attributes: ['name', 'username', 'email'],
		include: [{
			model: Role,
			attributes: ['id', 'name'],
			through: {
				attributes: ['userId', 'roleId'],
			}
		}]
	}).then(user => {
		res.status(200).json({
			code: 500,
			msg: "User Content Page",
			data: user
		});
	}).catch(err => {
		res.status(500).json({
			code: 500,
			msg: "Can not access User Page",
			error : err
		});
	})
}

exports.adminBoard = (req, res) => {
	User.findOne({
		where: {id: req.userId},
		attributes: ['name', 'username', 'email'],
		include: [{
			model: Role,
			attributes: ['id', 'name'],
			through: {
				attributes: ['userId', 'roleId'],
			}
		}]
	}).then(user => {
		res.status(200).json({
			code: 200,
			msg: "Admin Board",
			data: user
		});
	}).catch(err => {
		res.status(500).json({
			code: 500,
			msg: "Can not access Admin Board",
			error: err
		});
	})
}

exports.managementBoard = (req, res) => {
	User.findOne({
		where: {id: req.userId},
		attributes: ['name', 'username', 'email'],
		include: [{
			model: Role,
			attributes: ['id', 'name'],
			through: {
				attributes: ['userId', 'roleId'],
			}
		}]
	}).then(user => {
		res.status(200).json({
			code: 200,
			msg: "Management Board",
			data: user
		});
	}).catch(err => {
		res.status(500).json({
			code: 500,
			msg: "Can not access Management Board",
			error: err
		});
	})
}