const env = {
  database: 'testdb',
  username: 'root',
  password: 'root',
  host: 'localhost',
  dialect: 'mysql',
  pool: {
	  max: 5,
	  min: 0,
	  acquire: 30000,
	  idle: 10000
  },
  sg_api_key: "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",
  url_front: "http://localhost:3000"
};
 
module.exports = env;
