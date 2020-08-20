import React from 'react'
import AntrianCard from '../components/AntrianCard'

function ShowMonitor() {

  return (
    <>
      <div className="container-fluid div-monitor">
        <div className="d-flex div-time">
        </div>
        <div>
          <div className="container div-antrian_card d-flex">
            <AntrianCard />
          </div>
        </div>
      </div>
    </>
  )
}

export default ShowMonitor;