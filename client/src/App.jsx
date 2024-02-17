import React from 'react';
import './App.css';
import { ApolloProvider } from '@apollo/client';
import { Outlet } from 'react-router-dom';
import { ApolloClient } from '@apollo/client';
import Navbar from './components/Navbar';

function App() {
  return (
    <ApolloProvider client={ApolloClient}>
      <div className="App">
        <Navbar />
        <Outlet />
      </div>
    </ApolloProvider>
  );
}

export default App;
