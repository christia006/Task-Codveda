const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user');

const Post = sequelize.define('Post', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { len: [3, 200] }
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  }
});

// Relasi: User memiliki banyak Post
User.hasMany(Post, { onDelete: 'CASCADE' });
Post.belongsTo(User);

module.exports = Post;
