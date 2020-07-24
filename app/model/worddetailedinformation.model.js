module.exports = (sequelize, Sequelize) => {
	const worddetailedinformation = sequelize.define('worddetailedinformations', {
        Word: {
            type: Sequelize.STRING
        },
        Pronuncation: {
            type: Sequelize.STRING
        },
        Root: {
            type: Sequelize.STRING
        },
        Tale: {
            type: Sequelize.STRING
        },
        ConnectedWordIds:{
            type: Sequelize.STRING
        },
        MeaningCount:{
            type: Sequelize.INTEGER
        },
        EnglishMeaning:{
            type: Sequelize.STRING
        },
        ChineseMeaning:{
            type:Sequelize.STRING
        },
        ExampleSentences:{
            type: Sequelize.STRING
        },
	});
	return worddetailedinformation;
}
