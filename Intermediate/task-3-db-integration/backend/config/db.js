const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('neurosordb', 'neurosord_user', 'Sayabag', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false, // nonaktifkan log query
});

module.exports = sequelize;
