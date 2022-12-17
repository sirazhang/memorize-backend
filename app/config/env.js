const env = {
  database: 'memorize',
  username: 'root',
  password: '123456',
  host: 'localhost',
  dialect: 'mysql',
  pool: {
	  max: 5,
	  min: 0,
	  acquire: 30000,
	  idle: 10000
  },
  sg_api_key: "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",
  //sg_api_key: "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",
  url_front: "http://localhost:3000"
};
 
module.exports = env;
