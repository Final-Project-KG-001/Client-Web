import React, { useEffect, useState } from 'react'
import DokterCard from "../components/DokterCard"
import { gql, useQuery, useSubscription } from '@apollo/client'

const GET_DATA = gql`
  query GetData{
    appointments{
      _id
      queueNumber
      status
      doctorId
      doctor{
        polyclinic
      }
    },
    doctors{
      _id
      polyclinic
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
      doctor{
        name
        polyclinic
        
      }
    }
  }
`;



function TopCard() {
  const [ newData, setNewData ] = useState({})
  const [ doctor, setDoctor ] = useState({})
  const { data, subscribeToMore } = useQuery(GET_DATA)
  const { data: subscription } = useSubscription(SUBSCRIBE_NEW_APPOINTMENT)

  // if (data && setNewData) {
  //   const found = data.doctors.find(doctor => doctor._id === newData.doctorId)

  //   setDoctor(found)
  // }

  useEffect(() => {

    subscribeToMore({
      document: SUBSCRIBE_NEW_APPOINTMENT,
      updateQuery(prev, { subscriptionData }) {
        if (!subscriptionData.data) {
          return prev;
        }

        const newAppointment = subscriptionData.data.newAppointment;

        setNewData(newAppointment)


        return {
          ...prev,
          dentals: [ ...prev.appointments, newAppointment ],
        };
      },
    });
  }, [ subscribeToMore ]);


  return (

    <div className="container d-flex div-top">

      <div className="col-5 div-antrian_kiri">
        <DokterCard />
      </div>
      <div className="col-7 div-antrian_kanan">
        <div className="div-antrian_title">
          <p>Antrian</p>
        </div>
        <div className="div-antrian_number">
          <p>B{ newData.queueNumber }</p>
        </div>

        <div className="div-antrian_poli">
          <p>Poli Umum</p>
        </div>
      </div>

    </div>
  )
}

export default TopCard;