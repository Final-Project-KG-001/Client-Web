import React, { useState, useEffect } from 'react'
import AntrianCard from "./AntrianCard"
import { gql, useQuery } from '@apollo/client'
import Loading from '../components/Loading'
import Error from '../components/Error'
import Navigation from '../components/Navigation'
import slide1 from '../assets/quotes/slide1.jpg'
import slide2 from '../assets/quotes/slide2.jpg'
import slide3 from '../assets/quotes/slide3.jpg'
import slide4 from '../assets/quotes/slide4.jpg'
import DokterCard from "../components/DokterCard"


const GET_DOCTOR = gql`
  query GetDoctor($access_token:String){
    doctors(access_token:$access_token){
      _id
      name
      polyclinic
    }
}
`


function ShowMonitor() {

  const { loading, error, data } = useQuery(GET_DOCTOR, { variables: { access_token: localStorage.getItem("access_token") } })
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

          <div className="col-5 div-left">
            <div className="container div-left_top">
              <DokterCard />
            </div>
            <div className="container div-left_bottom">
              <select onChange={ (event) => setOption(event.target.value) } style={ { color: '#838383', marginRight: "10px", outline: "none", borderColor: "#838383", width: "20px", height: "20px", borderRadius: "50%" } }>
                <option value="">Choose categori:</option>
                <option data-toggle="modal" data-target="#exampleModalCenter" value="informasi">information</option>
                <option value="quotes">quotes</option>
              </select>

              {
                option === "quotes" ?

                  <div className="bottom-left">
                    {
                      image === "" && <h1>Have a wonderful day</h1>
                    }
                    {
                      image === undefined && <h1>Have a wonderful day</h1>
                    }
                    {
                      image && <img src={ image } alt="Have a good day" style={ { width: '390px', height: '180px', margin: 'auto', borderRadius: "10px" } } />
                    }
                  </div> : option === "informasi" ?
                    <div className="bottom-left">
                      <textarea onChange={ (event) => handleTextArea(event.target.value) } placeholder="Input your information here!" cols="35" spellCheck="false"></textarea>
                    </div> :
                    <div className="bottom-left"><h1>Have a wonderful day</h1>
                    </div>
              }
            </div>

          </div>
          <div className="div-right col-7">
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
      }

    </>
  )
}

export default ShowMonitor;