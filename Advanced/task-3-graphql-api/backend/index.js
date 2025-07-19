const express = require('express');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');
const db = require('./models');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const jwt = require('jsonwebtoken');

const SECRET = 'graphql_secret';

(async () => {
  const app = express();
  app.use(cors());

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      const token = req.headers.authorization || '';
      if (token) {
        try {
          const user = jwt.verify(token, SECRET);
          return { user };
        } catch (e) {
          console.error(e);
        }
      }
      return {};
    }
  });

  await server.start();
  server.applyMiddleware({ app });

  db.sequelize.sync().then(() => {
    app.listen({ port: 4000 }, () =>
      console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
    );
  });
})();
