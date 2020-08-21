import React, { useState, useEffect } from 'react'
import AntrianCard from "./AntrianCard"
import DokterCard from './DokterCard'


function ShowMonitor() {
  const [ time, setTime ] = useState('')

  useEffect(() => {
    setInterval(updateTime, 1000)
    function updateTime() {
      const newTime = new Date().toLocaleTimeString();
      setTime(newTime)
    }
  })
  return (
    <>
      <div className="div-time container-fluid">
        <p>{ time }</p>
        <p></p>
      </div>
      <div className="container container-monitor">
        <div className="container d-flex div-top">
          <div className="col-5 div-antrian_kiri">
            <DokterCard />
          </div>
          <div className="col-7 div-antrian_kanan">
            <div className="div-antrian_title">
              <p>Antrian</p>
            </div>
            <div className="div-antrian_number">
              <p>006</p>
            </div>
            <div className="div-antrian_poli">
              <p>Poli Umum</p>
            </div>
          </div>
        </div>
        <div className="container col-7 d-flex div-bottom">
          <AntrianCard />
        </div>
      </div>

    </>
  )
}

export default ShowMonitor;