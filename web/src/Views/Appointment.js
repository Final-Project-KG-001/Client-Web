import React from 'react'
import { gql, useQuery } from '@apollo/client'
import Loading from '../components/Loading'
import Error from '../components/Error'

const GET_APPOINTMENTS = gql`
  query Appointments{
    appointments{
      userId
      doctorId
      queueNumber
      status
      doctor{
        name
        polyclinic
      }
      user{
        name
      }
    }
  }
`

function Appointment() {

  const { loading, error, data } = useQuery(GET_APPOINTMENTS)

  // console.log(data)

  return (

    <div className='div-information container' >
      {
        loading && <Loading />
      }
      {
        error && <Error />
      }
      <h1>Appointments Table</h1>
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
          { data &&
            data.appointments.map((data, index) => (
              <tr key={ index }>
                <th scope="row">{ index + 1 }</th>
                <td>{ data.user[ 0 ].name }</td>
                <td>{ data.doctor[ 0 ].polyclinic }</td>
                <td>{ data.doctor[ 0 ].name }</td>
                <td>09.00 WIB</td>
                <td>11.00 WIB</td>
                <td>{ data.status }</td>
                <td>{ data.queueNumber }</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default Appointment;