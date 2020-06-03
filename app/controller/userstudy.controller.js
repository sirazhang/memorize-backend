const db = require('../config/db.config.js');

exports.UserStudySave = async (req, res) => {
    console.log("UserStudy Controller/ Save Study...")
    try{
        await db.sequelize.query(
            "CALL `testdb`.`Proc_UserStudy_Save` (:i_UserId, :i_WordId, :i_StudyStatus);", 
            {replacements:{i_StudyStatus: req.body.StudyStatus, i_UserId: req.body.UserId, i_WordId: req.body.WordId}}
        );
        res.status(200).send({code:200, msg:"Success"})
    }catch(err){
        console.log(err);
        res.status(500).send({code:500, msg:"Sql error", error: err})
    }
}
