import React from 'react'
import { Link } from 'react-router-dom'

function Navigation() {

  return (

    <div className='container-fluid div-nav'>
      <div className="nav-left">
        <Link to="/">
          <p>Agile Hospital</p>
        </Link>
      </div>
      <div className="nav-right">
        <Link to="/dashboard">
          <p>Information</p>
        </Link>
        <Link to="/monitor">
          <p>Monitor</p>
        </Link>
      </div>
    </div>
  )
}

export default Navigation;