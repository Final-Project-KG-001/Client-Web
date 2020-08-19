import React from 'react'
import Date from '../components/Date'
import AntrianCard from '../components/AntrianCard'
import Time from '../components/Time'

function ShowMonitor() {

  return (
    <>
      <div className="container-fluid div-monitor">
        <div className="d-flex div-time">
          <Date />
          <Time />
        </div>
        <div>
          <div className="div-active_antrian">
            <h4>Antrian Selanjutnya:</h4>
            <h1>008</h1>
          </div>
          <div className="container div-antrian_card d-flex">
            <AntrianCard />
            <AntrianCard />
            <AntrianCard />
            <AntrianCard />
          </div>
        </div>

      </div>
      <div className=" div-share_monitor d-flex">
        <p style={ { marginRight: '10px' } }>share</p>
        <p>stop</p>
      </div>
    </>
  )
}

export default ShowMonitor;