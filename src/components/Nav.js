import React from 'react'
import {
  Drawer,
  Divider,
  List,
  ListItem
} from '@material-ui/core'
import './Nav.scss'
import Tooltip from '@material-ui/core/Tooltip'
import HomeIcon from '@material-ui/icons/Home'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import AddBoxIcon from '@material-ui/icons/AddBox'
import { useHistory, withRouter } from 'react-router-dom'
import { Auth } from 'aws-amplify'
import { connect } from 'react-redux'
import { logout } from '../actions/UserActions'

function Nav (props) {
  const history = useHistory()

  const logout = () => {
    Auth.signOut()
      .then(() => {
        props.logout()
      })
      .catch(err => console.log(err))
  }

  const handleItemClick = event => {
    if (event.id) { history.push(`/event/${event.id}`) } else history.push('/')
  }

  const handleNewEventClick = () => {
    history.push('/event/new')
  }

  function MenuItem (props) {
    const { label, icon, onClick } = props
    return (
      <Tooltip title={label} aria-label={label} placement='right'>
        <ListItem onClick={onClick} aria-label={label} button>
          {icon}
        </ListItem>
      </Tooltip>
    )
  }

  return (
    <div>
      <Drawer variant='permanent'>
        <Divider />
        <List>
          <MenuItem label='Home' icon={<HomeIcon />} onClick={handleItemClick} />
          <MenuItem label='Create Event' icon={<AddBoxIcon />} onClick={handleNewEventClick} />
          <Divider />
          <MenuItem label='Logout' icon={<ExitToAppIcon />} onClick={logout} />
        </List>
      </Drawer>
    </div >
  )
}

export default withRouter(connect(null, { logout })(Nav))
