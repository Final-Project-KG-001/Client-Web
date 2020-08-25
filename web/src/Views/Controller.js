import React from 'react'
import AntrianCard from '../components/AntrianCard'
import { useQuery, gql } from '@apollo/client'
import Loading from '../components/Loading'
import Error from '../components/Error'

const GET_INFO = gql`
  query GetInfo{
    doctors{
      _id
      name
      polyclinic
    }
  }
`

function Controller() {
  // console.log(isLogin())
  const { loading, error, data } = useQuery(GET_INFO)

  return (
    <>
      { loading && <Loading /> }
      { error && <Error /> }
      { data &&
        <div className="coba-nyambung container-fluid div-controller">
          <div className="container div-antrian_card d-flex">
            {
              data.doctors.map(doctor => (
                <AntrianCard
                  key={ doctor._id }
                  doctor={ doctor }
                />
              ))
            }
          </div>
        </div>
      }

    </>
  )
}

export default Controller;