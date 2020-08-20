import React from 'react'
import Date from './Date'
import AntrianCard from "./AntrianCard"
import Time from './Time'
import Entertainment from "./Entertainment"

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
    </>
  )
}

export default ShowMonitor;