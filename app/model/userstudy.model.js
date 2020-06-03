module.exports = (sequelize, Sequelize) => {
    const UserStudy = sequelize.define('userstudy', {
        /*
        *   StudyStatus 
        *       0 : Clicked
        *       1 : Known
        *       2 : Unknown
        *       3 : Reviewed
        *       4 : Familiar
        */
        StudyStatus: {
            type: Sequelize.INTEGER
        }
    });
	
	return UserStudy;
}
