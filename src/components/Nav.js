import React, { useState } from 'react'
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon
} from '@material-ui/core'
import './Nav.scss'
import { withStyles } from '@material-ui/styles'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import AddBoxIcon from '@material-ui/icons/AddBox'
import DateRangeIcon from '@material-ui/icons/DateRange'
import PersonIcon from '@material-ui/icons/Person'
import { useHistory, withRouter } from 'react-router-dom'
import { Auth } from 'aws-amplify'
import { connect } from 'react-redux'
import { logout } from '../actions/UserActions'
import WhiteBiztech from '../assets/whitebiztech.svg'
import ColoredBiztech from '../assets/coloredbiztech.svg'
import { COLOR } from '../constants/Constants'

const styles = {
  list: {
    width: '150px',
    paddingTop: '95px'
  },
  icon: {
    width: '49px',
    paddingTop: '28px',
    paddingBottom: '28px',
    cursor: 'pointer',
    paddingLeft: '54px'
  },
  iconSize: {
    fontSize: '30'
  },
  logout: {
    marginTop: '330px',
    cursor: 'pointer',
    paddingLeft: '48px'
  },
  paper: {
    backgroundColor: COLOR.BACKGROUND_COLOR
  }
}

function Nav (props) {
  const { classes } = props
  const history = useHistory()

  const selected = { color: COLOR.BIZTECH_GREEN, fontSize: '30', width: '43px' }
  const unselected = { color: COLOR.WHITE, fontSize: '30', width: '43px' }
  const barSelected = { borderLeft: `6px solid ${COLOR.BIZTECH_GREEN}`, height: '45px', marginTop: '28px', paddingBottom: '28px', backgroundPositionX: 'left' }
  const barUnselected = { borderLeft: `6px solid ${COLOR.BACKGROUND_COLOR}`, height: '45px', marginTop: '28px', paddingBottom: '28px' }

  const pathname = window.location.pathname
  const [selectedItem, setSelectedItem] = useState(pathname)

  const logout = () => {
    Auth.signOut()
      .then(() => {
        props.logout()
      })
      .catch(err => console.log(err))
  }

  const handleItemClick = (path, event) => {
    if (event.id) {
      history.push(`/event/${event.id}`)
    } else {
      history.push(path)
      setSelectedItem(path)
    }
  }

  function MenuItem (props) {
    const { label, icon, onClick, bar } = props
    return (
      <ListItem onClick={onClick} aria-label={label} disableGutters={true}>
        <div style={{ display: 'flex' }}>
          <div style={bar} />
          <ListItemIcon style={styles.icon}>
            {icon}
          </ListItemIcon>
        </div>
      </ListItem>
    )
  }

  return (
    <div>
      <Drawer variant='permanent' classes={{ paper: classes.paper }}>
        <List style={styles.list}>
          {props.admin
            ? <React.Fragment>
              <MenuItem label='Home' icon={<img src={selectedItem === '/' ? ColoredBiztech : WhiteBiztech} alt='Home' style={selectedItem === '/' ? selected : unselected} />} onClick={handleItemClick.bind(null, '/')} bar={selectedItem === '/' ? barSelected : barUnselected} />
              <MenuItem label='Create Event' icon={<AddBoxIcon style={selectedItem === '/event/new' ? selected : unselected} />} onClick={handleItemClick.bind(null, '/event/new')} bar={selectedItem === '/event/new' ? barSelected : barUnselected} />
            </React.Fragment>
            : <React.Fragment>
              <MenuItem label='Home' icon={<img src={selectedItem === '/' ? ColoredBiztech : WhiteBiztech} alt='Home' style={selectedItem === '/' ? selected : unselected} />} onClick={handleItemClick.bind(null, '/')} bar={selectedItem === '/' ? barSelected : barUnselected} />
              <MenuItem label='Events' icon={<DateRangeIcon style={selectedItem === '/events' ? selected : unselected} />} onClick={handleItemClick.bind(null, '/events')} bar={selectedItem === '/events' ? barSelected : barUnselected} />
              <MenuItem label='Profile' icon={<PersonIcon style={selectedItem === '/profile' ? selected : unselected} />} onClick={handleItemClick.bind(null, '/profile')} bar={selectedItem === '/profile' ? barSelected : barUnselected} />
            </React.Fragment>}
          <ListItem>
            <ListItemIcon style={styles.logout} onClick={logout}>
              <ExitToAppIcon style={styles.iconSize} />
            </ListItemIcon>
          </ListItem>
        </List>
      </Drawer>
    </div >
  )
}

export default (withStyles(styles))(withRouter(connect(null, { logout })(Nav)))
