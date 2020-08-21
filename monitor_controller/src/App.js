import React from 'react';
import './scss/index.css'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import Login from './components/Login'
import ShowMonitor from './components/ShowMonitor'
import Navigation from './components/Navigation'
import { ApolloProvider } from '@apollo/client'
import client from './config/apolloClient'


function App() {
  return (
    <ApolloProvider client={ client }>
      <div className="App">
        <Router>
          <Navigation />
          <Switch>
            <Route path="/monitor">
              <ShowMonitor />
            </Route>
            <Route path="/">
              <Login />
            </Route>
          </Switch>
        </Router>
      </div>
    </ApolloProvider>
  );
}

export default App;