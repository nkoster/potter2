import React, { useState, useRef } from 'react'
import { Button, Fab } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'

const NewPodcast = ({setTokens}) => {

  const logout = _ => {
    localStorage.removeItem('potterTokens')
    setTokens({})
  }

  const [mp3, setMp3] = useState()
  const [selected, setSelected] = useState(false)
  const mp3Ref = useRef()

  const formSubmit = evt => {
    evt.preventDefault()
    const data = new FormData()
    const mp3data = mp3Ref.current.files[0]
    data.append('file', mp3data)
    fetch('https://uploader.w3b.net/uploader', {
      method: 'POST',
      body: data
    })
  }

  const handleFileInput = evt => {
    console.log(mp3Ref.current.files[0])
    setMp3(evt.target.files[0].name)
    setSelected(true)
  }

  return (
    <>
      <h3>upload a new podcast</h3>
      <form onSubmit={formSubmit} method='POST' encType='multipart/form-data'>
      <label>
        <input
          ref={mp3Ref}
          style={{ display: 'none' }}
          name='file'
          type='file'
          onChange={handleFileInput}
        />
        Choose an mp3 file
        <Fab style={{margin: 10}} color='default' size='small' component='span' aria-label='add'>
            <AddIcon />
        </Fab>
        {mp3}
      </label>
      <p>
        <Button type='submit' color='primary' variant='contained'>Submit</Button>
      </p>
      </form>
      <p>
        <Button color='secondary' variant='contained' component='span' onClick={logout}>logout</Button>
      </p>
    </>
  )
}

export default NewPodcast
