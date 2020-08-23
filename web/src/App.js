import React from 'react';
import './scss/index.css'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import HospitalProfile from './Views/HospitalProfile'
import Appointment from './Views/Appointment'
import Navigation from './components/Navigation'
import Controller from './Views/Controller';
import Login from './components/Login';
import { ApolloProvider } from '@apollo/client';
import client from './config/apolloClient'

function App() {
  return (
    <ApolloProvider client={ client }>
      <div className="App">
        <Router>
          <Switch>
            <Route path='/appointment'>
              <Appointment />
            </Route>
            <Route path='/controller'>
              <Controller />
            </Route>
            <Route path='/home'>
              <HospitalProfile />
            </Route>
            <Route path='/'>
              <Login />
            </Route>
          </Switch>
        </Router>
      </div>
    </ApolloProvider>
  );
}

export default App;
