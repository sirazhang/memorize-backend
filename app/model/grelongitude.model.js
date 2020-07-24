module.exports = (sequelize, Sequelize) => {
    const GRELongitude = sequelize.define('grelongitude', {
        LongitudeId: {
            type: Sequelize.INTEGER
        },
        Label:{
            type: Sequelize.STRING
        }
    });
	
	return GRELongitude;
}
