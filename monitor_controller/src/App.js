import React from 'react';
import './scss/index.css'
import {
  BrowserRouter as Router,
  Link,
  Switch,
  Route
} from 'react-router-dom'
import Login from './components/Login'
import ShowMonitor from './components/ShowMonitor'
import Navigation from './components/Navigation'


function App() {
  return (
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
  );
}

export default App;