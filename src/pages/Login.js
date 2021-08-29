import React, { useState } from 'react'

const Error = _ => {
  return <p>something went wrong, it might be you</p>
}

const Login = ({setTokens}) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState(false)

  const onChangeUsername = evt => setUsername(evt.target.value)
  const onChangePassword = evt => setPassword(evt.target.value)

  const onLogin = evt => {
    evt.preventDefault()
    fetch('https://auth.w3b.net/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username, password
      })
    })
    .then(res => res.json())
    .then(tokens => {
      if (!tokens.accessToken) {
        setErr(true)
        return
      }
      setTokens(tokens)
    })
    .catch(err => {
      console.log(err.message)
      setErr(true)
    })
  }
  return (
    <>
      {err && <Error />}
      <form onSubmit={onLogin} >
      <input 
        type='text'
        name='username'
        onChange={onChangeUsername}
      />
      <input
        type='password'
        name='password'
        onChange={onChangePassword}
      />
      <input type='submit' value='login'/>
      </form>
    </>
  )
}

export default Login
