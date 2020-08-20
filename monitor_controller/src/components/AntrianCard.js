import React from 'react'

function AntrianCard() {

  return (
    <div className="card card-antrian d-flex">
      <div className="div-active_antrian">
        <h3>Antrian Selanjutnya:</h3>
        <h1>008</h1>
      </div>
      <div className="card-body">
        <p className="card-title">Poli Umum</p>
        <h5 className="card-title">Dr. Fatimah</h5>
        <hr />
        <p>Nomor Antrian:</p>
        <h2>006</h2>
      </div>
    </div>
  )
}

export default AntrianCard;