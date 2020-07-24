module.exports = (sequelize, Sequelize) => {
    const BrainStorm = sequelize.define('brainstorm', {
        Word: {
            type: Sequelize.STRING
        },
        ChineseMeaning:{
            type: Sequelize.STRING
        },
        Kind:{
            type: Sequelize.INTEGER
        }
    });
	
	return BrainStorm;
}

