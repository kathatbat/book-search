import React from 'react';
import './App.css';
import { ApolloProvider } from '@apollo/client';
import { Outlet } from 'react-router-dom';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import Navbar from './components/Navbar';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Navbar />
        <Outlet />
      </div>
    </ApolloProvider>
  );
}

export default App;
