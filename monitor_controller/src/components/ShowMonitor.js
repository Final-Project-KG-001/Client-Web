import React, { useState, useEffect } from 'react'
import AntrianCard from "./AntrianCard"
import DokterCard from './DokterCard'
import { gql, useQuery } from '@apollo/client'
import Loading from '../components/Loading'
import Error from '../components/Error'
import Navigation from '../components/Navigation'
import slide1 from '../assets/quotes/slide1.jpg'
import slide2 from '../assets/quotes/slide2.jpg'
import slide3 from '../assets/quotes/slide3.jpg'
import slide4 from '../assets/quotes/slide4.jpg'


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
  const [ option, setOption ] = useState(null)
  const [ image, setImage ] = useState("")

  function handleOption() {
    const randomImage = [ slide1, slide2, slide3, slide4 ]
    setImage(randomImage[ Math.floor(Math.random() * 5) ])
  }

  function handleTextArea(event) {

  }

  useEffect(() => {
    if (option === "quotes") {
      setInterval(handleOption, 10000)
    }
  }, [ option ])


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
            <select onChange={ (event) => setOption(event.target.value) } style={ { color: '#838383', marginRight: "10px", outline: "none", borderColor: "#838383", width: "20px", height: "20px", borderRadius: "50%" } }>
              <option value="">Pilih kategori:</option>
              <option data-toggle="modal" data-target="#exampleModalCenter" value="informasi">informasi</option>
              <option value="quotes">quotes</option>
            </select>

            {
              option === "quotes" ?

                <div className="bottom-left col-5">
                  {
                    image === "" && <h1>Have a wonderful day</h1>
                  }
                  {
                    image === undefined && <h1>Have a wonderful day</h1>
                  }
                  {
                    image && <img src={ image } alt="Have a good day" style={ { width: '400px', height: '200px', margin: 'auto', borderRadius: "10px" } } />
                  }
                </div> : option === "informasi" ?
                  <div className="bottom-left col-5">
                    <textarea onChange={ (event) => handleTextArea(event.target.value) } placeholder="Input your information here!" cols="35" spellCheck="false"></textarea>
                  </div> :
                  <div className="bottom-left col-5"><h1>Have a wonderful day</h1>
                  </div>
            }

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