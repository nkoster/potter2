import React from 'react'
import './App.css'
import { useState } from 'react'
import Login from './pages/Login'
import NewPodcast from './pages/NewPodcast'

const App = _ => {

  const [tokens, setTokens] = useState({})

  return (
    <div className='App'>
      {tokens.accessToken ? <NewPodcast setTokens={setTokens}/> : <Login setTokens={setTokens}/>}
    </div>
  )
}

export default App
