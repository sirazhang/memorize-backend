const db = require('../config/db.config.js');

exports.getSynonymWords = async (req, res) => {
    console.log("BrainStorm Controller/ Get Synonym 2 Words...");
    try{
        let records = await db.sequelize.query("CALL `testdb`.`Proc_BrainStorm_Words` (:i_Nth);", {replacements:{i_Nth: req.body.i_Nth}});
        //console.log(records);
        res.status(200).send({code:200, msg:"Success", data: records})
    }catch(err){
        console.log(err);
        res.status(500).send({code:500, msg:"Sql error", error: err})
    }
}

exports.updateUserBCredit = async (req, res) => {
    console.log("BrainStorm Controller/ Update BCredit...");
    try{
        await db.sequelize.query("CALL `testdb`.`Proc_BrainStorm_Credit`(:user_id, :b_credit, @o_bcredit);", {replacements:{user_id: req.userId, b_credit: req.body.bcredit}});
        let o_bcredit = await db.sequelize.query("SELECT @o_bcredit;")
        res.status(200).send({code:200, msg:"Success", data: o_bcredit[0][0]["@o_bcredit"]})
    }catch(err){
        console.log(err);
        res.status(500).send({code:500, msg:"Sql error", error: err})
    }
}

exports.getUserBCredit = async (req, res) => {
    console.log("BrainStorm Controller/ Get BCredit...");
    try{
        let bcredit = await db.sequelize.query("CALL `testdb`.`Proc_BrainStorm_Get_Credit`(:user_id);", {replacements:{user_id: req.userId}});
        res.status(200).send({code:200, msg:"Success", data: bcredit[0]["bcredit"]})
    }catch(err){
        console.log(err);
        res.status(500).send({code:500, msg:"Sql error", error: err})
    }
}
