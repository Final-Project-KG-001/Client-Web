import React from 'react'


function Login() {


  return (
    <div className='div-login container-fluid'>
      <form>
        <div className="form-group">
          <label for="userLogin" />
          <input type="email" className="form-control" id="userLogin" aria-describedby="emailHelp" placeholder="Email" />
        </div>
        <div className="form-group">
          <label for="password" />
          <input type="password" className="form-control" id="password" placeholder="Password" />
        </div>
        <div className="form-group form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1" />
          <label className="form-check-label" for="exampleCheck1">Check me out</label>
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  )
}

export default Login;