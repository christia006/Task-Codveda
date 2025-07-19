const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('./models');

const SECRET = 'graphql_secret';

module.exports = {
  Query: {
    users: () => db.User.findAll({ include: db.Post }),
    posts: () => db.Post.findAll({ include: db.User })
  },
  Mutation: {
    register: async (_, { name, email, password }) => {
      await db.User.create({ name, email, password });
      return "User registered";
    },
    login: async (_, { email, password }) => {
      const user = await db.User.findOne({ where: { email } });
      if (!user) throw new Error('User not found');
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) throw new Error('Wrong password');
      const token = jwt.sign({ userId: user.id, role: user.role }, SECRET);
      return token;
    },
    addPost: async (_, { title, content }, { user }) => {
      if (!user) throw new Error('Not authenticated');
      return db.Post.create({ title, content, userId: user.userId });
    }
  },
  User: {
    posts: (parent) => db.Post.findAll({ where: { userId: parent.id } })
  },
  Post: {
    user: (parent) => db.User.findByPk(parent.userId)
  }
};
