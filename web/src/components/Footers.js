import React from 'react'


function Footers() {


  return (
    <div className="container-fluid div-footers d-flex">
      <div className="col-2 div-alamat">
        <img className="image" src="https://freeiconshop.com/wp-content/uploads/edd/location-pin-curvy-flat.png" alt="address" />
        <p className="title-info_footer">Alamat</p>
        <p>Jalan Rappocini 2, Jakarta, Indonesia</p>
      </div>
      <div className="col-2 div-contact">
        <img src="https://www.freepngimg.com/download/phone/23118-7-phone-free-download.png" alt="address" />
        <p className="title-info_footer">Hubungi kami</p>
        <p>Phone(+62 411) 3887 645 <br />Emergency 1-500-911</p>
      </div>
      <div className="col-2 div-opening_time">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTVVvMvFH6GV3ZDD9lsSTA5W5_U0ZE3rbF72w&usqp=CAU" alt="address" />
        <p className="title-info_footer">Jam Kunjungan</p>
        <p>11.30 - 13.00 <br />17.30 - 20.00</p>
      </div>
      <div className="col-2 div-email">
        <img src="https://cdn0.iconfinder.com/data/icons/material-circle-apps/512/icon-email-material-design-512.png" alt="email" />
        <p className="title-info_footer">Email</p>
        <p>info.shmk@agile_hospital.com <br /> agile_hospital.com</p>
      </div>
    </div>
  )
}

export default Footers;