import React from 'react'
import { useQuery, gql } from '@apollo/client'



const GET_DATA = gql`
  query GetData{
    dentals{
      _id
     appointment{
       status
       queueNumber
     }
    },
    generals{
      _id
     appointment{
       status
       queueNumber
     }
    }
}
`

function AntrianCard({ doctor }) {
  const { loading, error, data } = useQuery(GET_DATA)
  let dentalOnProcess = []
  let generalOnProcess = []

  if (data) {
    dentalOnProcess = data.dentals.filter(dental => dental.appointment.status === 'onProcess')

    generalOnProcess = data.generals.filter(general => general.appointment.status === 'onProcess')

    // console.log(data)
  }


  function handlePrevious(e) {
    e.preventDefault()
    console.log('Prev got click')
  }

  function handleNext(e) {
    e.preventDefault()
    console.log('Next got click')
  }

  return (
    <>
      { data &&
        <div className="card card-poli d-flex">
          <div className="card-body">
            <h3 className="card-title">Poli { doctor.polyclinic }</h3>
            <h5 className="card-title">{ doctor.name }</h5>
            <hr />
            <p>Nomor Antrian:</p>
            <h2>{ doctor.polyclinic === 'gigi' ? dentalOnProcess[ 0 ].appointment.queueNumber : generalOnProcess[ 0 ].appointment.queueNumber }</h2>
          </div>
          <div className="button_controller d-flex">
            <p onClick={ (e) => handlePrevious(e) }>Previous</p>
            <p onClick={ (e) => handleNext(e) }>Next</p>
          </div>
        </div>
      }
    </>
  )
}

export default AntrianCard;