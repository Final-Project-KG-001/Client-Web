import React from 'react'
import { Link } from 'react-router-dom'


function Navigation() {

  return (
    <>
      <Link to="/monitor" style={ { margin: '20px' } }>
        Controller
        </Link>
      <Link to="/" style={ { margin: '20px' } }>
        Logout
        </Link>
    </>
  )
}

export default Navigation;