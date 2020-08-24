import React, {useEffect} from 'react'
import { gql, useQuery, useSubscription } from '@apollo/client'

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
const SUBSCRIBE_NEW_APPOINTMENT = gql`
  subscription newAppointment {
    newAppointment {
      _id
      userId
      doctorId
      queueNumber
      status
    }
  }
`;


function AntrianCard({ doctor }) {
  const { data, subscribeToMore } = useQuery(GET_DATA)
  const {data: subscription} = useSubscription(SUBSCRIBE_NEW_APPOINTMENT)
  let findOnProcess = null

  useEffect(() => {
    subscribeToMore({
      document: SUBSCRIBE_NEW_APPOINTMENT,
      updateQuery(prev, { subscriptionData }) {
        if (!subscriptionData.data) {
          return prev;
        }

        const newAppointment = subscriptionData.data.newAppointment;
        // console.log(prev);

        // console.log(newAppointment)
        return {
          ...prev,
          dentals: [...prev.appointments, newAppointment],
        };
      },
    });
  }, [subscribeToMore]);

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