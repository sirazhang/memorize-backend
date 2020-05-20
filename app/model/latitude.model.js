module.exports = (sequelize, Sequelize) => {
    const Latitude = sequelize.define('latitude', {
        LatitudeName: {
            type: Sequelize.STRING
        },
        LatitudeAffix: {
            type: Sequelize.STRING
        },
        LatitudeMeaning: {
            type: Sequelize.STRING
        }
    });
	
	return Latitude;
}
