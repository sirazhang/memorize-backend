const verifySignUp = require('./verifySignUp');
const authJwt = require('./verifyJwtToken');

module.exports = function(app) {

    const controller = require('../controller/user.controller.js');
	const wordDataController = require('../controller/worddata.controller.js');

	app.post('/api/auth/signup', [verifySignUp.checkDuplicateUserNameOrEmail, verifySignUp.checkRolesExisted], controller.signup);
	
	app.post('/api/auth/signin', controller.signin);
	
	app.get('/api/latitude/getall', [authJwt.verifyToken, authJwt.isPmOrAdmin], wordDataController.getAllLatitudes)

	app.get('/api/longitude/getall', [authJwt.verifyToken, authJwt.isPmOrAdmin], wordDataController.getAllLongtudes)

	app.post('/api/worddata/selectlist', [authJwt.verifyToken, authJwt.isPmOrAdmin], wordDataController.wordSelectList)

	app.get('/api/test/user', [authJwt.verifyToken], controller.userContent);
	
	app.get('/api/test/pm', [authJwt.verifyToken, authJwt.isPmOrAdmin], controller.managementBoard);
	
	app.get('/api/test/admin', [authJwt.verifyToken, authJwt.isAdmin], controller.adminBoard);
}
