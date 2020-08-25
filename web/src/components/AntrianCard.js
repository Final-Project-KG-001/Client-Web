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
  const { data } = useQuery(GET_DATA)
  const [ changeAppointmentStatus ] = useMutation(SET_STATUS)
  const [ onProcess, setOnProcess ] = useState(0)
  const [ idChange, setIdChange ] = useState(null)
  const [ isAllDone, setIsAllDone ] = useState(false)
  const [ noList, setNoList ] = useState(false)

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
    if (idChange) {
      changeAppointmentStatus({
        variables: {
          _id: idChange,
          status: "on process"
        },
        refetchQueries: [ "GetData" ]
      })
    }
    setIsAllDone(false)
    setNoList(false)
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
      } else {
        setNoList(true)
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
  }, [ data, doctor._id ])

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
            <p style={ { backgroundColor: "#3797a4" } } onClick={ () => handlePrevious() }>Previous</p>
            <p style={ { backgroundColor: "#f8b24f" } } onClick={ () => handleNext() }>Next</p>
            {
              onProcess === 0 && <p onClick={ (e) => handleStart(e) }>Start</p>
            }

          </div>
        </div>
        { isAllDone && <p style={ { color: '#24a19c' } }>All done</p> }
        { noList && <p style={ { color: '#24a19c' } }>Tidak ada daftar pasien!!</p> }
      </div>
    </>
  )
}

export default AntrianCard;