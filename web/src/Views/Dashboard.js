import React from 'react'
import Date from '../components/Date'

function Dashboard() {


  return (
    <div className='div-information container' >
      <h1>Appointments Table</h1>
      <Date />
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Nama Pasien</th>
            <th scope="col">Poli Tujuan</th>
            <th scope="col">Nama Dokter</th>
            <th scope="col">Waktu Pendaftaran</th>
            <th scope="col">Estimasi Giliran</th>
            <th scope="col">Status</th>
            <th scope="col">No Antrian</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Umum</td>
            <td>Dr.Fatimah</td>
            <td>09.00 WIB</td>
            <td>11.00 WIB</td>
            <td>Done</td>
            <td>001</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Dashboard;