module.exports = (sequelize, Sequelize) => {
    const GREMap = sequelize.define('gremap', {
        GRELatId: {
            type: Sequelize.INTEGER
        },
        GRELonId: {
            type: Sequelize.INTEGER
        },
    });
	
	return GREMap;
}
