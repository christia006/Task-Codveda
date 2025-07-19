const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user');
const Post = sequelize.define('Post', {
  title: DataTypes.STRING,
  content: DataTypes.TEXT
});
User.hasMany(Post);
Post.belongsTo(User);
module.exports = Post;
