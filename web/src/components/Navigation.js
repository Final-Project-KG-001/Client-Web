import React from 'react'
import { Link } from 'react-router-dom'

function Navigation() {

  return (

    <div className='container-fluid div-nav'>
      <div className="nav-left">
        <Link to="/home">
          <p>Agile Hospital</p>
        </Link>
      </div>
      <div className="nav-right">
        <Link to="/appointment">
          <p>Appointment</p>
        </Link>
        <Link to="/controller">
          <p>Controller</p>
        </Link>
        <Link to="/">
          <p>Logout</p>
        </Link>
      </div>
    </div>
  )
}

export default Navigation;