const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('neurosordb', 'neurosord_user', 'Sayabag', {
  host: 'localhost',
  dialect: 'postgres'
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./user')(sequelize, Sequelize);
db.Post = require('./post')(sequelize, Sequelize);

// Relasi: 1 User banyak Post
db.User.hasMany(db.Post, { foreignKey: 'userId' });
db.Post.belongsTo(db.User, { foreignKey: 'userId' });

module.exports = db;
