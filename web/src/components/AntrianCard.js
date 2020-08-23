import React, { useState, useEffect } from 'react'
import { useQuery, gql, useMutation } from '@apollo/client'
import Navigation from './Navigation'



const GET_DATA = gql`
  query GetData{
    appointments{
      _id
      userId
      doctorId
      queueNumber
      status
      user{
        name
      }
      doctor{
        name
      }
    }
}
`

const SET_STATUS = gql`
  mutation SetStatus($_id:ID,$status:String){
    changeAppointmentStatus(_id:$_id, status:$status){
      message
      status
  }
}
`


function AntrianCard({ doctor }) {
  const { loading, error, data } = useQuery(GET_DATA)
  const [ changeAppointmentStatus ] = useMutation(SET_STATUS)
  const [ onProcess, setOnProcess ] = useState(0)
  const [ idChange, setIdChange ] = useState(null)
  const [ isAllDone, setIsAllDone ] = useState(false)

  function handleNext() {
    if (idChange) {
      changeAppointmentStatus({
        variables: {
          _id: idChange,
          status: "done"
        },
        refetchQueries: [ "GetData" ]
      })
    }

    if (data) {
      const nextOnProcess = data.appointments.find(appointment => (
        appointment.doctorId === doctor._id && appointment.status === "waiting"
      ))
      if (nextOnProcess) {
        changeAppointmentStatus({
          variables: {
            _id: nextOnProcess._id,
            status: "on process"
          },
          refetchQueries: [ "GetData" ]
        })
      } else {
        setOnProcess(0)
        setIsAllDone(true)
      }

    }



  }

  function handlePrevious() {

  }

  function handleStart() {
    if (data) {
      const findOnProcess = data.appointments.find(appointment => (
        appointment.queueNumber === 1 && appointment.doctorId === doctor._id && appointment.status === "waiting"
      ))
      if (findOnProcess) {

        changeAppointmentStatus({
          variables: {
            _id: findOnProcess._id,
            status: "on process"
          },
          refetchQueries: [ "GetData" ]
        })
      }
    }

  }

  useEffect(() => {
    if (data) {
      const onProcessFound = data.appointments.find(appointment => (
        appointment.doctorId === doctor._id && appointment.status === "on process"
      ))

      if (onProcessFound) {
        setOnProcess(onProcessFound.queueNumber)
        setIdChange(onProcessFound._id)
      }
    }
  })

  return (
    <>
      <Navigation />
      <div>
        <div className="card card-poli d-flex">
          <div className="card-body">
            <h3 className="card-title">Poli { doctor.polyclinic }</h3>
            <h5 className="card-title">{ doctor.name }</h5>
            <hr />
            <p>Nomor Antrian:</p>

            {
              doctor.polyclinic === 'umum' ? <h1>A { onProcess }</h1> : <h1>B { onProcess }</h1>
            }

            <hr />
          </div>
          <div className="button_controller d-flex">
            <p onClick={ () => handlePrevious() }>Previous</p>
            <p onClick={ () => handleNext() }>Next</p>
            <p onClick={ (e) => handleStart(e) }>Start</p>
          </div>
        </div>
        { isAllDone && <p style={ { color: '#24a19c' } }>All done. Tidak ada daftar pasien!!</p> }
      </div>
    </>
  )
}

export default AntrianCard;