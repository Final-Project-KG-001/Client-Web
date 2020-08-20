import React from 'react'
import Date from '../components/Date'
import AntrianCard from '../components/AntrianCard'
import Time from '../components/Time'
import Entertainment from '../components/Entertainment'

function ShowMonitor() {

  return (
    <>
      <div className="container-fluid div-monitor">
        <div className="d-flex div-time">
          <Date />
          <Time />
        </div>
        <div>
          <div className="container div-antrian_card d-flex">
            <AntrianCard />
            <AntrianCard />
          </div>
        </div>
        <Entertainment />
      </div>
      <div className="div-share_monitor d-flex">
        <p style={ { marginRight: '10px' } }>share</p>
        <p>stop</p>
      </div>
    </>
  )
}

export default ShowMonitor;