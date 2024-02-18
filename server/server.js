const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const typeDefs = require('./graphql/typeDefs.js'); 
const { expressMiddleware } = require('@apollo/server/express4');
const resolvers = require('./graphql/resolvers.js');

const db = require('./config/connection');
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

const PORT = process.env.PORT || 3001;
// app.get('/', (_, res) => res.redirect('/graphql'));


const startApolloServer = async () => {
  await server.start();
  
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  
  app.use('/graphql', expressMiddleware(server));

  // if we're in production, serve client/dist as static assets
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  } 

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

startApolloServer();

