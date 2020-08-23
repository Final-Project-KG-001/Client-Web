import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { isLogin } from '../config/apolloClient'


function Navigation() {

  const [ time, setTime ] = useState('')
  const [ date, setDate ] = useState('')

  useEffect(() => {
    setInterval(updateTime, 1000)
    function updateTime() {
      const newTime = new Date().toLocaleTimeString();
      setTime(newTime)
    }
    setDate(getDate())

  }, [])

  function getDate() {
    const now = new Date()

    const days = [ 'Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu' ]
    const months = [ 'January', 'February', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'December' ]
    const day = days[ now.getDay() ]
    const today = now.getDate()
    const month = months[ now.getMonth() ]
    const year = now.getFullYear()

    return `${ day },   ${ today }   ${ month }   ${ year }`
  }

  return (
    <>
      <div className="div-time container-fluid d-flex" style={ { justifyContent: 'space-between', color: '#838383' } }>
        <div className="div-left">
          <p style={ { fontWeight: 'normal', paddingTop: '10px', fontSize: '20px', fontFamily: 'Merienda' } }>{ date }</p>
        </div>
        <div className="div-right d-flex" style={ { marginRight: '10px' } }>

          <p style={ { fontFamily: 'Londrina Outline', fontSize: '35px', fontWeight: 'bolder' } }>{ time }</p>
          {
            !isLogin() ? <Link to="/monitor"  >Monitor</Link> :
              <Link to="/" style={ { marginTop: '17px' } }>
                <p className="hover-logout" style={ { fontSize: "10px" } }>Logout</p> </Link>
          }
        </div>
      </div>
    </>
  )
}

export default Navigation;