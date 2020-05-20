const env = require('./env.js');
 
const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  operatorsAliases: false,
 
  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle
  }
});
 
const db = {};
 
db.Sequelize = Sequelize;
db.sequelize = sequelize;
 
db.user = require('../model/user.model.js')(sequelize, Sequelize);
db.role = require('../model/role.model.js')(sequelize, Sequelize);
db.latitude = require('../model/latitude.model')(sequelize, Sequelize);
db.longitude = require('../model/longitude.model')(sequelize, Sequelize);
db.worddetailedinformation = require('../model/worddetailedinformation.model')(sequelize, Sequelize);

db.role.belongsToMany(db.user, { through: 'user_roles', foreignKey: 'roleId', otherKey: 'userId'});
db.user.belongsToMany(db.role, { through: 'user_roles', foreignKey: 'userId', otherKey: 'roleId'});
db.worddetailedinformation.belongsTo(db.latitude, {as: 'Latitude', foreignKey: 'LatitudeId'});
db.worddetailedinformation.belongsTo(db.longitude, {as: 'Longitude', foreignKey: 'LongitudeId'});

module.exports = db;