import React, { useState, useRef } from 'react'
import { Button, Fab } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'

const NewPodcast = ({setTokens, accessToken}) => {

  const logout = _ => {
    localStorage.removeItem('potterTokens')
    setTokens({})
  }

  const [mp3, setMp3] = useState()
  const [selected, setSelected] = useState(false)
  const [uploaded, setUploaded] = useState(false)
  const [uploading, setUploading] = useState(false)
  const mp3Ref = useRef()

  const handleFileInput = evt => {
    setMp3(evt.target.files[0].name)
    setSelected(true)
  }

  const formSubmit = async evt => {
    evt.preventDefault()
    setUploading(true)
    const data = new FormData()
    const mp3data = mp3Ref.current.files[0]
    data.append('file', mp3data)
    const res = await fetch('https://uploader.w3b.net/uploader', {
      headers: new Headers({
        'Authorization': `bearer ${accessToken}`
      }),
      method: 'POST',
      body: data
    })
    .then(res => res.json())
    .catch(err => {
      console.log(err.message)
    })
    if (res.status) {
      setUploaded(true)
    }
    setUploading(false)
    setMp3('')
    setSelected(false)
  }

  return (
    <>
      <h3>Upload</h3>
      {uploaded && !uploading && <p>Last upload was successful</p>}
      {uploading ? <p>Uploading<br />{mp3}</p> :
      <form onSubmit={formSubmit} method='POST' encType='multipart/form-data'>
      <label>
        <input
          ref={mp3Ref}
          style={{ display: 'none' }}
          name='file'
          type='file'
          onChange={handleFileInput}
        />
        Choose a file
        <Fab style={{margin: 10}} color='default' size='small' component='span' aria-label='add'>
            <AddIcon />
        </Fab>
        {mp3}
      </label>
      <p>
        <Button type='submit' color='primary' variant='outlined' disabled={!selected}>Submit</Button>
      </p>
      </form>}
      <p>
        <Button color='secondary' variant='outlined' component='span' onClick={logout}>logout</Button>
      </p>
    </>
  )
}

export default NewPodcast
