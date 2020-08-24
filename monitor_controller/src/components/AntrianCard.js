import React from 'react'
import { gql, useQuery } from '@apollo/client'

const GET_DATA = gql`
  query GetData{
    appointments{
      _id
      queueNumber
      status
      doctorId
    }
}
`

function AntrianCard({ doctor }) {
  const { data } = useQuery(GET_DATA)
  let findOnProcess = null

  if (data) {
    findOnProcess = data.appointments.find(appointment => (appointment.doctorId === doctor._id && appointment.status === "on process"))
  }


  return (

    <div
      key={ doctor._id }
      className={ doctor.polyclinic === "umum" ? "card card-antrian d-flex" : "card card-antrian2 d-flex" }>
      <div className="card-body">
        <p>Nomor Antrian:</p>
        { doctor.polyclinic === "umum" &&
          <>
            { data &&
              <h1>A { findOnProcess ? findOnProcess.queueNumber : 0 }</h1>
            }
          </>
        }
        { doctor.polyclinic === "gigi" &&
          <>
            { data &&
              <h1>B { findOnProcess ? findOnProcess.queueNumber : 0 }</h1>
            }
          </>
        }

        <hr />
        <p className="card-title">Poli { doctor.polyclinic }</p>
        <h5 className="card-title">{ doctor.name }</h5>
      </div>
    </div>
  )
}

export default AntrianCard;