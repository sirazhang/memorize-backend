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
db.userstudy = require('../model/userstudy.model')(sequelize, Sequelize);
db.gremap = require('../model/gremap.model')(sequelize, Sequelize);
db.grelatitude = require('../model/grelatitude.model')(sequelize, Sequelize);
db.grelongitude = require('../model/grelongitude.model')(sequelize, Sequelize);
db.brainstorm = require('../model/brainstorm.model')(sequelize, Sequelize);

db.role.belongsToMany(db.user, { through: 'user_roles', foreignKey: 'roleId', otherKey: 'userId'});
db.user.belongsToMany(db.role, { through: 'user_roles', foreignKey: 'userId', otherKey: 'roleId'});

db.worddetailedinformation.belongsTo(db.latitude, {as: 'Latitude', foreignKey: 'LatitudeId'});
db.worddetailedinformation.belongsTo(db.longitude, {as: 'Longitude', foreignKey: 'LongitudeId'});

db.userstudy.belongsTo(db.user, {as: 'User', foreignKey: 'UserId'});
db.userstudy.belongsTo(db.worddetailedinformation, {as: 'WordDetailedInformation', foreignKey: 'WordId'});

db.gremap.belongsTo(db.latitude, {as: 'Latitude', foreignKey: 'LatitudeId'});
db.gremap.belongsTo(db.longitude,{as: 'Longitude', foreignKey: 'LongitudeId'});
db.gremap.belongsTo(db.worddetailedinformation, {as: 'Word', foreignKey: 'WordId'});

module.exports = db;
