const { gql } = require('apollo-server-express');

module.exports = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    role: String!
    posts: [Post]
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    user: User
  }

  type Query {
    users: [User]
    posts: [Post]
  }

  type Mutation {
    register(name: String!, email: String!, password: String!): String
    login(email: String!, password: String!): String
    addPost(title: String!, content: String!): Post
  }
`;
