import React, { useState, useEffect } from 'react'
import Clock from 'react-clock';

function Date() {

  const [ date, setDate ] = useState('')



  return (

    <div className="div-date">
      <Clock
      />
    </div>
  )
}

export default Date;