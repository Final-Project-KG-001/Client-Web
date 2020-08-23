import React from 'react'
import AntrianCard from "./AntrianCard"
import DokterCard from './DokterCard'
import { gql, useQuery } from '@apollo/client'
import Loading from '../components/Loading'
import Error from '../components/Error'
import Navigation from '../components/Navigation'

const GET_DOCTOR = gql`
  query GetDoctor{
    doctors{
      _id
      name
      polyclinic
    }
}
`


function ShowMonitor() {

  const { loading, error, data } = useQuery(GET_DOCTOR)

  return (
    <>
      <Navigation />
      { loading && <Loading /> }
      { error && <Error /> }
      { data &&
        <div className="container container-monitor">
          <div className="container d-flex div-top">
            <div className="col-5 div-antrian_kiri">
              <DokterCard />
            </div>
            <div className="col-7 div-antrian_kanan">
              <div className="div-antrian_title">
                <p>Antrian</p>
              </div>
              <div className="div-antrian_number">
                <p>A 4</p>
              </div>
              <div className="div-antrian_poli">
                <p>Poli Umum</p>
              </div>
            </div>
          </div>
          <div className="container d-flex div-bottom">
            <div className="bottom-left col-5">
              <h1 style={ { margin: '30px auto', textAlign: 'center' } }>Hospital Brief Info</h1>
            </div>
            <div className="bottom-right col-7 d-flex">
              {
                data &&
                data.doctors.map((doctor) => (
                  <AntrianCard
                    key={ doctor._id }
                    doctor={ doctor }
                  />
                ))
              }
            </div>
          </div>
        </div>
      }

    </>
  )
}

export default ShowMonitor;