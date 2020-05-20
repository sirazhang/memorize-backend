const db = require('../config/db.config.js');
const Latitude = db.latitude;

exports.getAllLatitudes = async (req, res) => {
    console.log("Word Data Controller/Get All Latitudes...");
    try{
        let records = await db.sequelize.query("CALL `testdb`.`Proc_Latitude_GetAll` (@o_Result);")
        let o_Result = await db.sequelize.query("SELECT @o_Result;")
        console.log("---+", o_Result);
        res.status(200).send({code:200, msg:"Success", data: records})
    }catch(err){
        console.log(err);
        res.status(500).send({code:500, msg:"Sql error", error: err})
    }
}

exports.getAllLongtudes = async(req, res) => {
    console.log("Word Data Controller/ Get All Longitude...");
    try{
        let records = await db.sequelize.query("CALL `testdb`.`Proc_Longitude_GetAll` (@o_Result);")
        let o_Result = await db.sequelize.query("SELECT @o_Result;")
        console.log("---+", o_Result);
        res.status(200).send({code:200, msg:"Success", data: records})
    }catch(err){
        console.log(err);
        res.status(500).send({code:500, msg:"Sql error", error: err})
    }
}

exports.wordSelectList = async(req, res) => {
    console.log("Word Data Controller/ Get Word SelectList...");
    try{
        let records = await db.sequelize.query(
            "CALL `testdb`.`Proc_Word_SelectList`(:i_PageNo, :i_PageSize, :i_SearchValue, @o_TotalRowCount, @o_Result);", 
            {replacements:{i_PageNo: req.body.PageNo, i_PageSize: req.body.PageSize, i_SearchValue: req.body.SearchValue}});
        let o_TotalRowCount = await db.sequelize.query("SELECT @o_TotalRowCount;")
        let o_Result = await db.sequelize.query("SELECT @o_Result;")
        console.log("---+", o_TotalRowCount);
        res.status(200).send({code:200, msg:"Success", data:{records: records, totalRowCount: o_TotalRowCount}})
    }catch(err){
        console.log(err);
        res.status(500).send({code:500, msg:"Sql error", error: err})
    }
}

