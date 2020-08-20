import React, { useEffect, useState } from 'react'

function AntrianCard() {


  return (
    <>

      <div className="card card-antrian d-flex">
        <div className="card-body">
          <p>Nomor Antrian:</p>
          <h1>006</h1>
          <hr />
          <p className="card-title">Poli Umum</p>
          <h5 className="card-title">Dr.Fatimah Hidayani</h5>
        </div>
      </div>
      <div className="card card-antrian2 d-flex">
        <div className="card-body">
          <p>Nomor Antrian:</p>
          <h1>007</h1>
          <hr />
          <p className="card-title">Poli Gigi</p>
          <h5 className="card-title">Dr.Hary Tungadi</h5>
        </div>
      </div>
    </>
  )
}

export default AntrianCard;