import React from 'react'
import './App.css'
import { useState, useEffect } from 'react'
import Login from './pages/Login'
import NewPodcast from './pages/NewPodcast'

const App = _ => {

  const [tokens, setTokens] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(_ => {
    let tokens = localStorage.getItem('potterTokens')
    if (!tokens) {
      setLoading(false)
      return
    }
    try {
      tokens = JSON.parse(tokens)
      if (tokens.accessToken) {
        fetch('https://auth.w3b.net/verify', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            token: tokens.accessToken
          })
        })
        .then(res => res.json())
        .then(res => {
          console.log('Valid token')
          if (res.result)
            setTokens(tokens)
          else
            localStorage.removeItem('potterTokens')
          setLoading(false)
        })
        .catch(err => {
          setLoading(false)
          console.log(err.message)
        })
      }
    } catch(err) {
      setLoading(false)
      console.log(err)
    }
  }, [])

  if (loading) return (
    <div className='App'>
      <p>loading...</p>
    </div>
  )

  return (
    <div className='App'>
      {tokens.accessToken ? <NewPodcast setTokens={setTokens}/> : <Login setTokens={setTokens}/>}
    </div>
  )
}

export default App
