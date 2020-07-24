const db = require('../config/db.config.js');

exports.UserStudySave = async (req, res) => {
    console.log("UserStudy Controller/ Save Study...")
    try{
        await db.sequelize.query(
            "CALL `testdb`.`Proc_UserStudy_Save` (:i_UserId, :i_WordId, :i_StudyStatus);", 
            {replacements:{i_StudyStatus: req.body.StudyStatus, i_UserId: req.userId, i_WordId: req.body.WordId}}
        );
        res.status(200).send({code:0, msg:"Success"})
    }catch(err){
        console.log(err);
        res.status(500).send({code:-1, msg:"Sql error", error: err})
    }
}

exports.UserStudySelectList = async(req, res) => {
    console.log("UserStudy Controller/ SelectList...", req.body)
    try{
        let studyResults = await db.sequelize.query(
            "CALL `testdb`.`Proc_UserStudy_SelectList`(:i_UserId, :i_Reviewed);",
            {replacements:{i_UserId: req.userId, i_Reviewed: req.body.reviewed}}
        )
        res.status(200).send({code:0, data: studyResults})
    }catch(err){
        console.log(err)
        res.status(500).send({code:1, msg:"sql error", error: err});
    }
}
