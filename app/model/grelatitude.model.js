module.exports = (sequelize, Sequelize) => {
    const GRELatitude = sequelize.define('grelatitude', {
        LatitudeId: {
            type: Sequelize.INTEGER
        }
    });
	
	return GRELatitude;
}
