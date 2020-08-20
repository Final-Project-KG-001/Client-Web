import React from 'react';
import './scss/index.css'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import HospitalProfile from './Views/HospitalProfile'
import Dashboard from './Views/Dashboard'
import Navigation from './components/Navigation'
import ShowMonitor from './Views/ShowMonitor';
import Login from './components/Login';

function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <Switch>
          <Route path='/dashboard'>
            <Dashboard />
          </Route>
          <Route path='/monitor'>
            <ShowMonitor />
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
  );
}

export default App;
