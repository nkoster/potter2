import React from 'react'

const NewPodcast = ({setTokens}) => {
  return (
    <>
      NewPodcast
      <button onClick={_ => setTokens({})}>logout</button>
    </>
  )
}

export default NewPodcast
