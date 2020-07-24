const verifySignUp = require('./verifySignUp');
const authJwt = require('./verifyJwtToken');

module.exports = function(app) {

    const controller = require('../controller/user.controller.js');
	const wordDataController = require('../controller/worddata.controller.js');
	const userStudyController = require('../controller/userstudy.controller');
	const brainStorm = require('../controller/brainstorm.controller');
	/* auth */
	app.post('/api/auth/signup', [verifySignUp.checkDuplicateUserNameOrEmail, verifySignUp.checkRolesExisted], controller.signup);
	
	app.post('/api/auth/update-password', controller.updatepassword);

	app.post('/api/auth/signin', controller.signin);
	
	app.post('/api/auth/reset-password-mail', controller.sendResetPasswordLink);
	/* word */
	app.get('/api/latitude/getall', wordDataController.getAllLatitudes)

	app.get('/api/latitude/zoom', wordDataController.getLatitudeZoom)

	app.get('/api/longitude/getall', wordDataController.getAllLongitudes)

	app.get('/api/longitude/zoom', wordDataController.getLongitudeZoom)

	app.post('/api/worddata/select', wordDataController.wordSelect)

	app.post('/api/worddata/selectlist', [authJwt.verifyToken], wordDataController.wordSelectList)

	app.post('/api/worddata/selectlist_zoom', [authJwt.verifyToken], wordDataController.wordSelectListZoom)

	app.get('/api/worddata/selectlist_zoom0', wordDataController.wordSelectListZoom0)

	app.get('/api/worddata/selectlist_zoom1', wordDataController.wordSelectListZoom1)

	app.get('/api/worddata/selectlist_zoom2', wordDataController.wordSelectListZoom2)
	
	//GRE Word Map SelectList
	app.post('/api/worddata/selectlist_gre', wordDataController.wordSelectListGRE)

	//GRE Latitude SelectList
	app.post('/api/worddata/latitude_gre', wordDataController.getLatitudeGRE)

	//GRE Longitude SelectList
	app.post('/api/worddata/longitude_gre', wordDataController.getLongitudeGRE)

	/* user study */
	app.post('/api/userstudy/save', [authJwt.verifyToken], userStudyController.UserStudySave)

	app.post('/api/userstudy/selectlist', [authJwt.verifyToken], userStudyController.UserStudySelectList)
	
	/* BrainStorm */
	app.post('/api/brainstorm/synonymwords', [authJwt.verifyToken], brainStorm.getSynonymWords) 

	app.post('/api/brainstorm/updatebcredit', [authJwt.verifyToken], brainStorm.updateUserBCredit)
 
	app.get('/api/brainstorm/getbcredit', [authJwt.verifyToken], brainStorm.getUserBCredit)
	/* test */
	app.get('/api/test/user', [authJwt.verifyToken], controller.userContent);
	
	app.get('/api/test/pm', [authJwt.verifyToken, authJwt.isPmOrAdmin], controller.managementBoard);
	
	app.get('/api/test/admin', [authJwt.verifyToken, authJwt.isAdmin], controller.adminBoard);
}
