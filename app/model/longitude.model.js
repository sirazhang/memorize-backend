module.exports = (sequelize, Sequelize) => {
    const Longitude = sequelize.define('longitude', {
        LongitudeName: {
            type: Sequelize.STRING
        },
        LongitudeAffix: {
            type: Sequelize.STRING
        },
        LongitudeMeaning: {
            type: Sequelize.STRING
        }
    });
	
	return Longitude;
}
