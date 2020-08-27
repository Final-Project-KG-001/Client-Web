import React, { useState, useEffect } from 'react'
import { useQuery, gql, useMutation } from '@apollo/client'
import Navigation from './Navigation'



const GET_DATA = gql`
  query GetData($access_token:String){
    appointments(access_token:$access_token){
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
    },
    
    dentals(access_token:$access_token){
      _id
    },
    generals(access_token:$access_token){
      _id
    }
}
`

const SET_STATUS = gql`
  mutation SetStatus($_id:ID,$status:String, $access_token:String){
    changeAppointmentStatus(_id:$_id, status:$status, access_token:$access_token){
      message
      status
  }
}
`


function AntrianCard({ doctor }) {

  const { data } = useQuery(GET_DATA, { variables: { access_token: localStorage.getItem("access_token") } })


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
          status: "done",
          access_token: localStorage.getItem("access_token")
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
            status: "on process",
            access_token: localStorage.getItem("access_token")
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
          status: "on process",
          access_token: localStorage.getItem("access_token")
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
            status: "on process",
            access_token: localStorage.getItem("access_token")
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
            <h3 className="card-title">{ doctor.polyclinic === "umum" ? "General Polyclinic" : "Dental Polyclinic" }</h3>
            <h5 className="card-title">{ doctor.name }</h5>
            <hr />
            <p>Queue Number:</p>

            {
              doctor.polyclinic === 'umum' ? <h1>A { onProcess }</h1> : <h1>B { onProcess }</h1>
            }

            <hr />
          </div>
          {
            data.dentals.length === 0 && data.generals.length === 0 ?
              <div className="button_controller d-flex">
                <p>No on boarding patients</p>
              </div> :
              <div className="button_controller d-flex">
                <p style={ { backgroundColor: "#3797a4" } } onClick={ () => handlePrevious() }>Previous</p>
                <p style={ { backgroundColor: "#f8b24f" } } onClick={ () => handleNext() }>Next</p>
                {
                  onProcess === 0 && <p onClick={ (e) => handleStart(e) }>Start</p>
                }
              </div>
          }
        </div>
        { isAllDone && <p style={ { color: '#24a19c' } }>All done</p> }
        { noList && <p style={ { color: '#24a19c' } }>No more patients on waiting list!!</p> }
      </div>
    </>
  )
}

export default AntrianCard;