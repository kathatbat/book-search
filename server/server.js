const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const typeDefs = require('./graphql/typeDefs.js'); 
const resolvers = require('./graphql/resolvers.js');

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  context: ({ req }) => {
    const token = req.headers.authorization || '';
    return { token };
  },
});

// server.applyMiddleware({ app });

const PORT = process.env.PORT || 4000;
app.get('/', (_, res) => res.redirect('/graphql'));

app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}${server.graphqlPath}`)
);
