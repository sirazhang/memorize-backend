const db = require('../config/db.config.js');

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
function replaceAll(string, search, replace) {
    return string.split(search).join(replace);
}

function getRandomDouble(mini, maxm){
    return Math.random()*(maxm-mini)+mini;
}

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

exports.getLatitudeZoom = async (req, res) => {
    console.log("Word Data Controller/Get Latitudes Zoom...");
    var maxl = getRandomInt(79);
    try{
        let records = await db.sequelize.query("CALL `testdb`.`Proc_Latitude_Zoom` (:i_Nth);", {replacements:{i_Nth: maxl}});
        res.status(200).send({code:200, msg:"Success", data: records})
    }catch(err){
        console.log(err);
        res.status(500).send({code:500, msg:"Sql error", error: err})
    }
}

exports.getAllLongitudes = async(req, res) => {
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

exports.getLongitudeZoom = async (req, res) => {
    console.log("Word Data Controller/Get Longitudes Zoom...");
    var maxl = getRandomInt(79);
    try{
        let records = await db.sequelize.query("CALL `testdb`.`Proc_Longitude_Zoom` (:i_Nth);", {replacements:{i_Nth: maxl}});
        res.status(200).send({code:200, msg:"Success", data: records})
    }catch(err){
        console.log(err);
        res.status(500).send({code:500, msg:"Sql error", error: err})
    }
}

exports.wordSelect = async(req, res) => {
    console.log("Word Data Controller / Get Word Select ...")
    try{
        let records = await db.sequelize.query(
            "CALL `testdb`.`Proc_Word_Select`(:WordId);",
            {replacements:{WordId:req.body.WordId}}
        );
        res.status(200).send({code:0, msg:"success", data:{records: records}});
    }catch(err){
        console.log(err);
        res.status(500).send({code:-1, msg:"sql error", error: err});
    }
}

exports.wordSelectList = async(req, res) => {
    console.log("Word Data Controller/ Get Word SelectList...");
    try{
        let records = await db.sequelize.query(
            "CALL `testdb`.`Proc_Word_SelectList`(:i_PageNo, :i_PageSize, :i_SearchValue, @o_TotalRowCount, @o_Result);", 
            {replacements:{i_PageNo: req.body.PageNo, i_PageSize: req.body.PageSize, i_SearchValue: req.body.SearchValue}}
        );
        let o_TotalRowCount = await db.sequelize.query("SELECT @o_TotalRowCount;")
        res.status(200).send({code:200, msg:"Success", data:{records: records, totalRowCount: o_TotalRowCount}})
    }catch(err){
        console.log(err);
        res.status(500).send({code:500, msg:"Sql error", error: err})
    }
}

exports.wordSelectListZoom = async(req, res) => {
    console.log("Word Data Controller / Get Word SelectList for Zoom ...")
    var lat_min = req.body.lat_min
    var lat_max = req.body.lat_max
    var lon_min = req.body.lon_min
    var lon_max = req.body.lon_max

    try{
        let records = await db.sequelize.query(
            "CALL `testdb`.`Proc_Word_SelectList_Zoom`(:lat_min, :lat_max, :lon_min, :lon_max);",
            {replacements:{lat_min:lat_min, lat_max:lat_max, lon_min:lon_min, lon_max:lon_max}}
        );

        let records_rnd_lat = await db.sequelize.query(
            "CALL `testdb`.`Proc_Word_Random_Lat_SelectList_Zoom`(:lat_min, :lat_max);",
            {replacements:{lat_min:lat_min, lat_max:lat_max}}
        );

        let records_rnd_lon = await db.sequelize.query(
            "CALL `testdb`.`Proc_Word_Random_Lon_SelectList_Zoom`(:lon_min, :lon_max);",
            {replacements:{lon_min:lon_min, lon_max:lon_max}}
        );

        let records_rnd = await db.sequelize.query(
            "CALL `testdb`.`Proc_Word_Random_SelectList_Zoom`();"
        );

        var revised_records = []
        var revised_records_rnd = []
        var revised_records_rnd_lat = []
        var revised_records_rnd_lon = []
        if(records != null) {
            records.map((row, index) => {
                var prefixes = row.LatitudeAffix.toLowerCase();//.replaceAll(" ", "").replaceAll("-", "").replaceAll("/", ",").split(",");
                prefixes = replaceAll(prefixes, " ", "");
                prefixes = replaceAll(prefixes, "-", "");
                prefixes = replaceAll(prefixes, "/", ",");
                prefixes = prefixes.split(",");
                var suffixes = row.LongitudeAffix.toLowerCase();//.replaceAll(" ", "").replaceAll("-", "").replaceAll("/", ",").split(",");
                suffixes = replaceAll(suffixes, " ", "");
                suffixes = replaceAll(suffixes, "-", "");
                suffixes = replaceAll(suffixes, "/", ",");
                suffixes = suffixes.split(",");

                var prefix = "", root = "", suffix = "", tale = "";
                var word = row.Word.toLowerCase();
                //var level = index % 2 + 2;
                if((row.LatitudeId-lat_min)%2 == 0 && (row.LongitudeId-lon_min)%2 == 0){
                    level = 2;
                }else{
                    level = 3;
                }
                var stepForZoom0 = Math.floor(records.length / 7);
                if(stepForZoom0 % 2 == 1) stepForZoom0 -= 1;
                if(stepForZoom0 > 1 && index % stepForZoom0 == 0){
                    level = 1;
                }
                prefixes.map((value) => {
                    var extras = [];
                    var values = [];
                    if(value.includes("(")){
                        extras = value.match(/\((.*)\)/).toString().toLowerCase();//replaceAll(" ", "").replaceAll("-", "").replaceAll("/", ",").split(",");
                        extras = replaceAll(extras, " ", "");
                        extras = replaceAll(extras, "-", "");
                        extras = replaceAll(extras, "/", ",");
                        extras = extras.split(",");
        
                        value = value.substr(0, value.indexOf("("));
                    }
                    values.push(value);
                    if(extras.length > 0){
                        extras.map((value1) => {
                            values.push(value+value1);
                        })
                    }
                    values.map((value2) => {
                        if(word.includes(value2)){
                            prefix = value2;
                        }
                    })
                })

                suffixes.map((value) => {
                    var extras = [];
                    var values = [];
                    if(value.includes("(")){
                        extras = value.match(/\((.*)\)/).toString().toLowerCase();//.replaceAll(" ", "").replaceAll("-", "").replaceAll("/", ",").split(",");
                        extras = replaceAll(extras, " ", "");
                        extras = replaceAll(extras, "-", "");
                        extras = replaceAll(extras, "/", ",");
                        extras = extras.split(",");

                        value = value.substr(0, value.indexOf("("));
                    }
                    values.push(value);
                    if(extras.length > 0){
                        extras.map((value1) => {
                            values.push(value+value1);
                        })
                    }
                    values.map((value2) => {
                        if(word.includes(value2)){
                            suffix = value2;
                        }
                    })
                })
                
                var suffixPos = word.indexOf(suffix);
                if(suffixPos < 0){
                    root = word.substr(prefix.length, word.length-prefix.length);
                }else{
                    root = word.substr(prefix.length, suffixPos-prefix.length);
                    tale = word.substr(prefix.length+suffixPos+suffix.length, word.length-suffixPos-suffix.length-prefix.length);
                }
                tmp_row = {
                    id: row.id,
                    word: word, 
                    config:{prefix:prefix, root:root, suffix:suffix, tale:tale}, 
                    location:{lat:row.LatitudeId-lat_min, lon:row.LongitudeId-lon_min, delta: getRandomDouble(-0.5, 0.5)},
                    details: {
                        pronun: row.Pronuncation,
                        english: replaceAll(row.EnglishMeaning, ":::", ""),
                        chinese: replaceAll(row.ChineseMeaning, ":::", ""),
                        example: replaceAll(row.ExampleSentences, ":::", "")
                    },
                    level: level
                }
                revised_records.push(tmp_row);
            })
        }
        if(records_rnd != null){
            records_rnd.map((row, index) => {
                var prefix = "", root = "", suffix = "", tale = "";
                var word = row.Word.toLowerCase();
                var level;
                if(index % 4 == 0){
                    level = 2;
                }else {
                    level = 3;
                }
                var stepForZoom0 = Math.floor(records.length / 7);
                if(index % (stepForZoom0) == 0){
                    level = 1;
                }
                tmp_row = {
                    id: row.id,
                    word: word, 
                    config:{prefix:prefix, root:word, suffix:suffix, tale:tale}, 
                    location:{lat:Math.random(), lon:Math.random()},
                    details: {
                        pronun: row.Pronuncation,
                        english: replaceAll(row.EnglishMeaning, ":::", ""),
                        chinese: replaceAll(row.ChineseMeaning, ":::", ""),
                        example: replaceAll(row.ExampleSentences, ":::", "")
                    },
                    level: level
                }
                revised_records_rnd.push(tmp_row);
            })
        }
        if(records_rnd_lat != null) {
            records_rnd_lat.map((row, index) => {
                var prefixes = row.LatitudeAffix.toLowerCase();//.replaceAll(" ", "").replaceAll("-", "").replaceAll("/", ",").split(",");
                prefixes = replaceAll(prefixes, " ", "");
                prefixes = replaceAll(prefixes, "-", "");
                prefixes = replaceAll(prefixes, "/", ",");
                prefixes = prefixes.split(",");
                var prefix = "", root = "", suffix = "", tale = "";
                var word = row.Word.toLowerCase();
                if((row.LatitudeId-lat_min)%2 == 0){
                    level = 2;
                }else{
                    level = 3;
                }
                // var stepForZoom0 = Math.floor(records_rnd_lat.length / 7);
                // if(stepForZoom0 > 1 && index % stepForZoom0 == 0){
                //     level = 1;
                // }
                prefixes.map((value) => {
                    var extras = [];
                    var values = [];
                    if(value.includes("(")){
                        extras = value.match(/\((.*)\)/).toString().toLowerCase();//replaceAll(" ", "").replaceAll("-", "").replaceAll("/", ",").split(",");
                        extras = replaceAll(extras, " ", "");
                        extras = replaceAll(extras, "-", "");
                        extras = replaceAll(extras, "/", ",");
                        extras = extras.split(",");
        
                        value = value.substr(0, value.indexOf("("));
                    }
                    values.push(value);
                    if(extras.length > 0){
                        extras.map((value1) => {
                            values.push(value+value1);
                        })
                    }
                    values.map((value2) => {
                        if(word.includes(value2)){
                            prefix = value2;
                        }
                    })
                })

                tmp_row = {
                    id: row.id,
                    word: word, 
                    config:{prefix:"", root:word, suffix:suffix, tale:tale}, 
                    location:{lat:row.LatitudeId-lat_min, lon:Math.random(), delta: getRandomDouble(-1, 1)},
                    details: {
                        pronun: row.Pronuncation,
                        english: replaceAll(row.EnglishMeaning, ":::", ""),
                        chinese: replaceAll(row.ChineseMeaning, ":::", ""),
                        example: replaceAll(row.ExampleSentences, ":::", "")
                    },
                    level: level
                }
                revised_records_rnd_lat.push(tmp_row);
            })
        }

        if(records_rnd_lon != null) {
            records_rnd_lon.map((row, index) => {
                var suffixes = row.LongitudeAffix.toLowerCase();//.replaceAll(" ", "").replaceAll("-", "").replaceAll("/", ",").split(",");
                suffixes = replaceAll(suffixes, " ", "");
                suffixes = replaceAll(suffixes, "-", "");
                suffixes = replaceAll(suffixes, "/", ",");
                suffixes = suffixes.split(",");

                var prefix = "", root = "", suffix = "", tale = "";
                var word = row.Word.toLowerCase();
                //var level = index % 2 + 2;
                if((row.LongitudeId-lon_min)%2 == 0){
                    level = 2;
                }else{
                    level = 3;
                }
                // var stepForZoom0 = Math.floor(records_rnd_lon.length / 7);
                // if(stepForZoom0 > 1 && index % stepForZoom0 == 0){
                //     level = 1;
                // }
                suffixes.map((value) => {
                    var extras = [];
                    var values = [];
                    if(value.includes("(")){
                        extras = value.match(/\((.*)\)/).toString().toLowerCase();//.replaceAll(" ", "").replaceAll("-", "").replaceAll("/", ",").split(",");
                        extras = replaceAll(extras, " ", "");
                        extras = replaceAll(extras, "-", "");
                        extras = replaceAll(extras, "/", ",");
                        extras = extras.split(",");

                        value = value.substr(0, value.indexOf("("));
                    }
                    values.push(value);
                    if(extras.length > 0){
                        extras.map((value1) => {
                            values.push(value+value1);
                        })
                    }
                    values.map((value2) => {
                        if(word.includes(value2)){
                            suffix = value2;
                        }
                    })
                })
                
                var suffixPos = word.indexOf(suffix);
                if(suffixPos < 0){
                    root = word.substr(prefix.length, word.length-prefix.length);
                }else{
                    root = word.substr(prefix.length, suffixPos-prefix.length);
                    tale = word.substr(suffixPos+suffix.length, word.length-suffixPos-suffix.length);
                }
                tmp_row = {
                    id: row.id,
                    word: word, 
                    config:{prefix:prefix, root:root, suffix:suffix, tale:tale}, 
                    location:{lat:Math.random(), lon:row.LongitudeId-lon_min, delta: getRandomDouble(-1, 1)},
                    details: {
                        pronun: row.Pronuncation,
                        english: replaceAll(row.EnglishMeaning, ":::", ""),
                        chinese: replaceAll(row.ChineseMeaning, ":::", ""),
                        example: replaceAll(row.ExampleSentences, ":::", "")
                    },
                    level: level
                }
                revised_records_rnd_lon.push(tmp_row);
            })
        }

        res.status(200).send({code:0, msg:"success", data:{records: revised_records, records_rnd: revised_records_rnd, records_rnd_lat: revised_records_rnd_lat, records_rnd_lon: revised_records_rnd_lon}});
    }catch(err){
        console.log(err);
        res.status(500).send({code:-1, msg:"sql error", error: err});
    }
}

exports.wordSelectListZoom0 = async(req, res) => {
    console.log("Word Data Controller / Get Word SelectList for Zoom0 ...")
    try{
        let records = await db.sequelize.query(
            "CALL `testdb`.`Proc_Word_SelectList_Zoom0`();"
        );
        res.status(200).send({code:0, msg:"success", data:{records: records}});
    }catch(err){
        console.log(err);
        res.status(500).send({code:-1, msg:"sql error", error: err});
    }
}

exports.wordSelectListZoom1 = async(req, res) => {
    console.log("Word Data Controller / Get Word SelectList for Zoom1 ...")
    try{
        let records = await db.sequelize.query(
            "CALL `testdb`.`Proc_Word_SelectList_Zoom1`();"
        );
        res.status(200).send({code:0, msg:"success", data:{records: records}});
    }catch(err){
        console.log(err);
        res.status(500).send({code:-1, msg:"sql error", error: err});
    }
}

exports.wordSelectListZoom2 = async(req, res) => {
    console.log("Word Data Controller / Get Word SelectList for Zoom2 ...")
    try{
        let records = await db.sequelize.query(
            "CALL `testdb`.`Proc_Word_SelectList_Zoom2`();"
        );
        res.status(200).send({code:0, msg:"success", data:{records: records}});
    }catch(err){
        console.log(err);
        res.status(500).send({code:-1, msg:"sql error", error: err});
    }
}
