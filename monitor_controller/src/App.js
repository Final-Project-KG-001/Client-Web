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


function App() {
  return (
    <div className="App">
      <Router>
        <Link to="/monitor" style={ { margin: '20px' } }>
          Controller
        </Link>
        <Link to="/" style={ { margin: '20px' } }>
          Logout
        </Link>
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