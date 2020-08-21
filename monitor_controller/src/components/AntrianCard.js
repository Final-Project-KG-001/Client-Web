import React from 'react'
import { gql, useQuery } from '@apollo/client'
import Loading from '../components/Loading'
import Error from '../components/Error'

const GET_APPOINTMENTS = gql`
  query GetAppointments{
    appointments{
      userId
      doctorId
      queueNumber
      status
    },
    doctors{
      _id
      name
      polyclinic
    }
}
`

function AntrianCard() {
  // const [ doctor, setDoctor ] = useState('')
  const { loading, error, data } = useQuery(GET_APPOINTMENTS)

  return (
    <>
      { loading && <Loading /> }
      { error && <Error /> }
      {/* { data &&
        data.appointments.filter(e => {
          e.status === 'onProcess' &&
            setDoctor(data.doctors.filter(d => d._id === e.doctorId))
            <div className= "card card-antrian d-flex" >
              <div className="card-body">

                <p>Nomor Antrian:</p>
                <h1>{ e.queueNumber }</h1>
                <hr />
                <p className="card-title">Poli { doctor.polyclinic }</p>
                <h5 className="card-title">{ doctor.name }</h5>
              </div>
            </div>
        })
      } */}
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