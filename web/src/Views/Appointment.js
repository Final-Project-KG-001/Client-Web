import React, { useState, useEffect } from 'react'
import { gql, useQuery } from '@apollo/client'
import Loading from '../components/Loading'
import Error from '../components/Error'
import Navigation from '../components/Navigation'

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
  const [ date, setDate ] = useState('')
  const { loading, error, data } = useQuery(GET_APPOINTMENTS)

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
  useEffect(() => {
    setDate(getDate)
  }, [ setDate ])


  return (
    <>
      <Navigation />
      <div className='div-information container' >

        {
          error && <Error />
        }
        <h1>Appointments Table</h1>
        <p className='div-date' >{ date }</p>
        {
          loading && <Loading />
        }
        <table className="table">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Pasien</th>
              <th scope="col">Poli</th>
              <th scope="col">Dokter</th>
              <th scope="col">Waktu Pendaftaran</th>
              <th scope="col">Estimasi Giliran</th>
              <th scope="col">Status</th>
              <th scope="col">Antrian</th>
              <th scope="col">Attendance</th>
            </tr>
          </thead>
          <tbody>
            { data &&
              data.appointments.map((data, index) => (
                <tr key={ index } style={ data.doctor[ 0 ].polyclinic === "umum" ? { backgroundColor: "#85a392" } : { backgroundColor: "#dee3e2" } }>
                  <td scope="row">{ index + 1 }</td>
                  <td>{ data.user[ 0 ].name }</td>
                  <td>{ data.doctor[ 0 ].polyclinic }</td>
                  <td>{ data.doctor[ 0 ].name }</td>
                  <td>09.00 WIB</td>
                  <td>11.00 WIB</td>
                  {
                    data.status === 'on process' ? <td style={ { color: "#006a71" } }>{ data.status }</td> : data.status === 'done' ? <td style={ { color: "#ea5455" } }>{ data.status }</td> : <td style={ { color: "#fa7d09" } }>{ data.status }</td>
                  }

                  <td>{ data.queueNumber }</td>
                  <td>on board</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Appointment;