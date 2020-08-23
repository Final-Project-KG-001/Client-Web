import React from 'react'
import loginicon from '../assets/loginicon.png'
import { useHistory } from 'react-router-dom';
import { isLogin } from '../config/apolloClient'


function Login() {
  const history = useHistory()

  function handleClick() {
    isLogin(true)
    history.push('/monitor')

  }
  return (
    <div className='div-login container-fluid'>
      <div className="image-login">
        <img src={ loginicon } alt="Login Admin" style={ { width: '100px', height: '100px', margin: 'auto' } }></img>
      </div>

      <form>
        <div className="form-group">
          <label />
          <input type="email" className="form-control" id="userLogin" aria-describedby="emailHelp" placeholder="Email" />
        </div>
        <div className="form-group">
          <label />
          <input type="password" className="form-control" id="password" placeholder="Password" />
        </div>
        <div className="form-group form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1" />
          <label className="form-check-label" style={ { fontSize: '10px', color: '#e66767' } }>Check me out</label>
        </div>
        <button style={ { backgroundColor: '#86c4ba', color: '#ffeaa7 ', outline: 'none', borderColor: '#86c4ba' } } type="submit" className="btn btn-primary" onClick={ () => handleClick() }>Login</button>
      </form>
    </div>
  )
}

export default Login;