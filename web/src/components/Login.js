import React, { useState } from 'react'
import loginicon from '../assets/loginicon.png'
import { useHistory } from 'react-router-dom';
import { isLogin } from '../config/apolloClient'
import { gql, useMutation } from '@apollo/client'
import Error from "../components/Error"

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
  const [ errorServer, setErrorServer ] = useState(false)

  // function handleClick() {
  //   isLogin(true)
  //   history.push('/appointment')

  // }

  async function handleSubmit(event) {


    event.preventDefault()
    try {
      const { loading, error, data } = await loginAdmin({
        variables: {
          email: email,
          password: password
        }
      })
      if (data) {

        if (data.loginAdmin.access_token) {
          isLogin(true)
          history.push('/appointment')
          // console.log(isLogin())
          localStorage.setItem("access_token", data.loginAdmin.access_token)
        } else {

          setError(data.loginAdmin.message)

        }
      }
    } catch (err) {
      // console.log(err)
      setErrorServer(true)
    }




  }

  return (
    <div className='div-login container-fluid'>
      {
        errorServer && <Error />
      }
      <div className="image-login">
        <img src={ loginicon } alt="Login Admin" style={ { width: '100px', height: '100px', margin: 'auto' } }></img>
      </div>

      <form onSubmit={ handleSubmit }>
        <div className="form-group">
          <label />
          <input onChange={ (event) => setEmail(event.target.value) } type="email" className="form-control" id="userLogin" aria-describedby="emailHelp" placeholder="Email" />
        </div>
        <div className="form-group">
          <label />
          <input onChange={ (event) => setPassword(event.target.value) } type="password" className="form-control" id="password" placeholder="Password" />
        </div>
        <div className="form-group form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1" />
          <label className="form-check-label" style={ { fontSize: '10px', color: '#e66767' } }>Check me out</label>
        </div>
        <button style={ { backgroundColor: '#86c4ba', color: '#ffa34d ', outline: 'none', borderColor: '#86c4ba' } } type="submit" className="btn btn-primary">Login</button>
      </form>
      {
        error &&
        <p style={ { color: "red", marginTop: "20px" } }>{ error }</p>
      }
    </div>
  )
}

export default Login;