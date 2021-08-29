import React from 'react'

const NewPodcast = ({setTokens}) => {

  const logout = _ => {
    localStorage.removeItem('potterTokens')
    setTokens({})
  }

  return (
    <>
      <h3>upload a new podcast</h3>
      <button onClick={logout}>logout</button>
    </>
  )
}

export default NewPodcast
