import React, { useRef, useEffect, useState } from 'react'
import { Button, Fab, TextField } from '@material-ui/core'
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import Popover from '@material-ui/core/Popover'
import Typography from '@material-ui/core/Typography'

import refresh from '../utils/refresh'
const TEN_MINUTES = 600000
const TEN_SECONDS = 10000
import { makeStyles } from '@material-ui/core/styles'

const NewPodcast = ({tokens, setTokens, inactive}) => {

  const active = useRef(false)
  const logoutTime = useRef(Date.now() + TEN_MINUTES)
  const interval = useRef()

  const logout = _ => {
    localStorage.removeItem('potterTokens')
    clearInterval(interval.current)
    setTokens({})
  }

  const [mp3, setMp3] = useState()
  const [jpg, setJpg] = useState()
  const [png, setPng] = useState()
  const mp3Ref = useRef()
  const jpgRef = useRef()
  const pngRef = useRef()

  const [selected, setSelected] = useState(false)
  const [uploaded, setUploaded] = useState(false)
  const [uploading, setUploading] = useState(false)

  const [potterTitle, setPotterTitle] = useState('')
  const [potterAuthor, setPotterAuthor] = useState('')
  const [potterSubtitle, setPotterSubtitle] = useState('')
  const [potterKeywords, setPotterKeywords] = useState('')
  const [potterReleaseDate, setPotterReleaseDate] = useState(new Date())

  const [potterFacebook, setPotterFacebook] = useState('')
  const [potterInstagram, setPotterInstagram] = useState('')
  const [potterSoundcloud, setPotterSoundcloud] = useState('')
  const [potterTwitter, setPotterTwitter] = useState('')
  const [potterMixcloud, setPotterMixcloud] = useState('')
  const [potterRA, setPotterRA] = useState('')
  const [potterBeatport, setPotterBeatport] = useState('')
  const [potterBandcamp, setPotterBandcamp] = useState('')

  const classes = useStyles()

  const [anchorElMp3, setAnchorElMp3] = useState(null)
  const [anchorElJpg, setAnchorElJpg] = useState(null)
  const [anchorElPng, setAnchorElPng] = useState(null)

  const handlePopoverOpenMp3 = evt => {
    setAnchorElMp3(evt.currentTarget)
  }

  const handlePopoverCloseMp3 = _ => {
    setAnchorElMp3(null)
  }

  const handlePopoverOpenJpg = evt => {
    setAnchorElJpg(evt.currentTarget)
  }

  const handlePopoverCloseJpg = _ => {
    setAnchorElJpg(null)
  }

  const handlePopoverOpenPng = evt => {
    setAnchorElPng(evt.currentTarget)
  }

  const handlePopoverClosePng = _ => {
    setAnchorElPng(null)
  }

  const openMp3 = Boolean(anchorElMp3)
  const openJpg = Boolean(anchorElJpg)
  const openPng = Boolean(anchorElPng)

  const handleMp3FileInput = evt => {
    setMp3(evt.target.files[0].name)
    active.current = true
  }

  const handleJpgFileInput = evt => {
    setJpg(evt.target.files[0].name)
    active.current = true
  }

  const handlePngFileInput = evt => {
    setPng(evt.target.files[0].name)
    active.current = true
  }

  const formSubmit = async evt => {
    evt.preventDefault()
    setUploading(true)
    const data = new FormData()
    const mp3data = mp3Ref.current.files[0]
    data.append('file', mp3data)
    const res = await fetch('https://uploader.w3b.net/uploader', {
      headers: new Headers({
        'Authorization': `bearer ${tokens.accessToken}`
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
    } else {
      if (res.error) return logout()
    }
    setUploading(false)
    setMp3('')
    setSelected(false)
    active.current = true
  }

  useEffect(_ => {
    interval.current = setInterval(_ => {
      if (Date.now() > logoutTime.current) {
        console.log('Inactive, logging out')
        inactive.current = true
        logout()
      }
      if (active.current) {
        active.current = false
        logoutTime.current = Date.now() + TEN_MINUTES
        refresh(tokens, setTokens)
      }
    }, TEN_SECONDS)
  }, [])

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <>
      <h5>NEW PODCAST</h5>
      {uploaded && !uploading && <p>Last upload was successful</p>}
      {uploading ? <p>Uploading<br />{mp3}</p> :
      <div>
        <form onSubmit={formSubmit} method='POST' encType='multipart/form-data' style={{width: '75vw'}}>
        <p className={classes.title} style={{marginBottom: '16px', marginTop: '-20px'}}>FILES</p>
        <label style={{fontSize: '18px'}}>
          <input
            ref={mp3Ref}
            style={{ display: 'none' }}
            name='mp3File'
            type='file'
            onChange={handleMp3FileInput}
          />
          <Fab style={{margin: 10}} color='default' size='small' component='span' aria-label='add'>
            <Typography
              aria-owns={openMp3 ? 'mouse-over-popover-mp3' : undefined}
              aria-haspopup='true'
              onMouseEnter={handlePopoverOpenMp3}
              onMouseLeave={handlePopoverCloseMp3}
            >
              <span style={{fontSize: '12px'}}>MP3</span>
            </Typography>
            <Popover
              id='mouse-over-popover-mp3'
              className={classes.popover}
              classes={{
                paper: classes.paper,
              }}
              open={openMp3}
              anchorEl={anchorElMp3}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              onClose={handlePopoverCloseMp3}
              disableRestoreFocus
            >
              <Typography>Select MP3 file with correct meta data</Typography>
            </Popover>
          </Fab>
          {mp3 && <>{mp3}<br /></>}
        </label>
        <label style={{fontSize: '18px'}}>
          <input
            ref={jpgRef}
            style={{ display: 'none' }}
            name='jpgFile'
            type='file'
            onChange={handleJpgFileInput}
          />
          <Fab style={{margin: 10}} color='default' size='small' component='span' aria-label='add'>
            <Typography
              aria-owns={openJpg ? 'mouse-over-popover-jpg' : undefined}
              aria-haspopup='true'
              onMouseEnter={handlePopoverOpenJpg}
              onMouseLeave={handlePopoverCloseJpg}
            >
              <span style={{fontSize: '12px'}}>JPG</span>
            </Typography>
            <Popover
              id='mouse-over-popover-jpg'
              className={classes.popover}
              classes={{
                paper: classes.paper,
              }}
              open={openJpg}
              anchorEl={anchorElJpg}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              onClose={handlePopoverCloseJpg}
              disableRestoreFocus
            >
              <Typography>Select JPG 1400x1400</Typography>
            </Popover>
          </Fab>
          {jpg && <>{jpg}<br /></>}
        </label>
        <label style={{fontSize: '18px'}}>
          <input
            ref={pngRef}
            style={{ display: 'none' }}
            name='pngFile'
            type='file'
            onChange={handlePngFileInput}
          />
          <Fab style={{margin: 10}} color='default' size='small' component='span' aria-label='add'>
            <Typography
              aria-owns={openPng ? 'mouse-over-popover-png' : undefined}
              aria-haspopup='true'
              onMouseEnter={handlePopoverOpenPng}
              onMouseLeave={handlePopoverClosePng}
            >
              <span style={{fontSize: '12px'}}>PNG</span>
            </Typography>
            <Popover
              id='mouse-over-popover-png'
              className={classes.popover}
              classes={{
                paper: classes.paper,
              }}
              open={openPng}
              anchorEl={anchorElPng}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              onClose={handlePopoverClosePng}
              disableRestoreFocus
            >
              <Typography>Select PNG 300x300</Typography>
            </Popover>
          </Fab>
          {png && <>{png}<br /></>}
        </label>
        <p className={classes.title} >INFO</p>
        <TextField
          type='text'
          name='potterTitle'
          label='Title'
          onChange={evt => { active.current = true; setPotterTitle(evt.target.value)}}
          value={potterTitle}
          className={classes.textField}
        />
        <TextField
          type='text'
          name='potterAuthor'
          label='Author'
          onChange={evt => { active.current = true; setPotterAuthor(evt.target.value)}}
          value={potterAuthor}
          className={classes.textField}
        />
        <TextField
          type='text'
          name='potterSubtitle'
          label='Subtitle'
          onChange={evt => { active.current = true; setPotterSubtitle(evt.target.value)}}
          value={potterSubtitle}
          className={classes.textField}
        />
        <TextField
          type='text'
          name='potterKeywords'
          label='Keywords'
          onChange={evt => { active.current = true; setPotterKeywords(evt.target.value)}}
          value={potterKeywords}
          className={classes.textField}
        />
        <DateTimePicker
          value={potterReleaseDate}
          disablePast
          onChange={dateTime => { active.current = true; setPotterReleaseDate(dateTime)}}
          label='Release Date'
          showTodayButton
          format='dd-MM-yyyy HH:mm'
          className={classes.textField}
        />
        <p className={classes.title}>LINKS</p>
        <TextField
          type='text'
          name='potterFacebook'
          label='Facebook'
          onChange={evt => { active.current = true; setPotterFacebook(evt.target.value)}}
          value={potterFacebook}
          className={classes.textField}
        />
        <TextField
          type='text'
          name='potterInstagram'
          label='Instagram'
          onChange={evt => { active.current = true; setPotterInstagram(evt.target.value)}}
          value={potterInstagram}
          className={classes.textField}
        />
        <TextField
          type='text'
          name='potterSoundcloud'
          label='Soundcloud'
          onChange={evt => { active.current = true; setPotterSoundcloud(evt.target.value)}}
          value={potterSoundcloud}
          className={classes.textField}
        />
        <TextField
          type='text'
          name='potterTwitter'
          label='Twitter'
          onChange={evt => { active.current = true; setPotterTwitter(evt.target.value)}}
          value={potterTwitter}
          className={classes.textField}
        />
        <TextField
          type='text'
          name='potterMixcloud'
          label='Mixcloud'
          onChange={evt => { active.current = true; setPotterMixcloud(evt.target.value)}}
          value={potterMixcloud}
          className={classes.textField}
        />
        <TextField
          type='text'
          name='potterRA'
          label='Resident Advisor'
          onChange={evt => { active.current = true; setPotterRA(evt.target.value)}}
          value={potterRA}
          className={classes.textField}
        />
        <TextField
          type='text'
          name='potterBeatport'
          label='Beatport'
          onChange={evt => { active.current = true; setPotterBeatport(evt.target.value)}}
          value={potterBeatport}
          className={classes.textField}
        />
        <TextField
          type='text'
          name='potterBandcamp'
          label='Bandcamp'
          onChange={evt => { active.current = true; setPotterBandcamp(evt.target.value)}}
          value={potterBandcamp}
          className={classes.textField}
        />
        <p style={{textAlign: 'right'}}>
          <Button type='submit' color='primary' variant='outlined' disabled={!!selected} style={{marginTop: '30px'}}>Submit</Button>
        </p>
        </form>
      </div>}
      <p>
        {!uploading && <Button color='primary' variant='outlined' component='span' onClick={logout} className={classes.logout}>logout</Button>}
      </p>
    </>
    </MuiPickersUtilsProvider>
  )
}

const useStyles = makeStyles(theme => ({
  title: {
    marginBottom: '1px',
    marginTop: '50px',
    background: 'none',
    fontSize: '16px'
  },
  textField: {
    margin: '14px'
  },
  logout: {
    position: 'absolute',
    top: '20px',
    right: '20px'
  },
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing(1),
  }
}))

export default NewPodcast
