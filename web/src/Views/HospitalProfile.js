import React from 'react'
import Footers from '../components/Footers'


function Profile() {
  const docters = [ 'Fatimah', 'Tantowi' ]

  return (
    <>
      <div className='container-fluid div-hospital_profile'>
        <div className="jumbotron div-profile_info">
          <h1 className="display-4">A g i l e - H o s p i t a l</h1>
          <p className="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
          <hr className="my-4" />
          <p>It uses utility classNamees for typography and spacing to space content out within the larger container.</p>

        </div>
        <div className="container div-docter_profile">
          {
            docters.map((docter, index) => (
              index % 2 === 0 || index === 0 ?
                <> <div key={ index } className="div-card_dokter">
                  <div className="card-dokter d-flex">
                    <img className="card-img-top" src="https://imgcdn.femaledaily.com/2017/08/Hilwa.jpg" alt="Card cap" />
                    <div className="card-body">
                      <h5 className="card-title">Dr. Fatimah</h5>
                      <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                  </div>
                </div>  <hr /> </> : <><div
                  key={ index } className="div-card_dokter2">
                  <div className="card-dokter d-flex">
                    <img className="card-img-top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSzoJzGAp9YTMAiY27Uk1wuwMUICrEfPSDh9g&usqp=CAU" alt="not available" />
                    <div className="card-body">
                      <h5 className="card-title">Dr. Song</h5>
                      <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                  </div>
                </div>
                  <hr /></>
            ))
          }
        </div>
      </div>
      <Footers />
    </>
  )
}

export default Profile;