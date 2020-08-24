import React from 'react'
import { Link } from 'react-router-dom'
import { isLogin } from '../config/apolloClient';

function Navigation() {

  function handleClick() {
    isLogin(false)
    // console.log(isLogin())
  }

  return (

    <div className='container-fluid div-nav'>
      <div className="nav-left">
        <Link to="/home">
          <p>Agile Hospital</p>
        </Link>
      </div>
      <div className="nav-right">

        <Link to="/appointment" >
          <p>Appointment</p>
        </Link>
        <Link to="/controller">
          <p>Controller</p>
        </Link>
        <Link to="/">
          <p onClick={ () => handleClick() }>Logout</p>
        </Link>
      </div>
    </div>
  )
}

export default Navigation;