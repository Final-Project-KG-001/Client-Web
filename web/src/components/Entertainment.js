import React from 'react'
import entertainment from '../quotes.json'

function Entertainment() {
  const [ { entertainments } ] = entertainment

  return (

    <div className="container div-entertainment">
      <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img className="d-block w-100" src="https://www.savondebali.com/wp-content/uploads/2017/09/31.jpg" alt="First slide" />
          </div>
          {
            entertainments.map((data, index) => (
              <div
                key={ index }
                className="carousel-item">
                {/* <div className="div-carousel_quotes">
                  <p>{ data.location }</p>
                  <p>{ data.quotes } by: { data.author }</p>
                </div> */}
                <img className="d-block w-100" src={ data.backgorund_image } alt={ data.slide } />
              </div>
            ))
          }
        </div>
        <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="sr-only">Previous</span>
        </a>
        <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
    </div>
  )
}

export default Entertainment;