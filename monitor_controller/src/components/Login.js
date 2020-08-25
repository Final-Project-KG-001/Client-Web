import React, { useState } from 'react'
import loginicon from '../assets/loginicon.png'
import { useHistory } from 'react-router-dom'
import { gql, useMutation } from '@apollo/client'


const LOGIN = gql`
  mutation Login($email:String, $password:String){
    loginAdmin(email: $email, password:$password){
      access_token
      message
    }
  }
`

function Login() {
  const history = useHistory()
  const [ email, setEmail ] = useState("")
  const [ password, setPassword ] = useState("")
  const [ loginAdmin ] = useMutation(LOGIN)
  const [ error, setError ] = useState("")


  // function handleClick() {
  //   isLogin(true)
  //   history.push('/monitor')
  // }


  async function handleSubmit(event) {
    event.preventDefault()

    const { data } = await loginAdmin({
      variables: {
        email: email,
        password: password
      }
    })
    if (data) {

      if (data.loginAdmin.access_token) {
        // isLogin(true)
        history.push('/monitor')
        // console.log(isLogin())
        localStorage.setItem("access_token", data.loginAdmin.access_token)
      } else {

        setError(data.loginAdmin.message)

      }
    }

  }

  return (
    <div className='div-login container-fluid'>
      <div className="image-login">
        <img src={ loginicon } alt="Login Admin" style={ { width: '100px', height: '100px', margin: 'auto' } }></img>
      </div>

      <form onSubmit={ handleSubmit }>
        <div className="form-group">
          <label />
          <input type="email" className="form-control" aria-describedby="emailHelp" placeholder="Email" onChange={ (event) => setEmail(event.target.value) } />
        </div>
        <div className="form-group">
          <label />
          <input type="password" className="form-control" id="password" placeholder="Password" onChange={ (event) => setPassword(event.target.value) } />
        </div>
        <div className="form-group form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1" />
          <label className="form-check-label" style={ { fontSize: '10px', color: '#e66767' } }>Check me out</label>
        </div>
        <button style={ { backgroundColor: '#86c4ba', color: '#ffeaa7 ', outline: 'none', borderColor: '#86c4ba' } } type="submit" className="btn btn-primary">Login</button>
      </form>
      {
        error &&
        <p style={ { color: "red", marginTop: "20px" } }>{ error }</p>
      }
    </div>
  )
}

export default Login;