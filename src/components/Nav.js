import React, { useState } from 'react'
import {
  List,
  ListItem
} from '@material-ui/core'
import { useTheme, withStyles } from '@material-ui/styles'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import AddBoxIcon from '@material-ui/icons/AddBox'
import DateRangeIcon from '@material-ui/icons/DateRange'
import PersonIcon from '@material-ui/icons/Person'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import RedeemIcon from '@material-ui/icons/Redeem'
import { useHistory, withRouter } from 'react-router-dom'
import { Auth } from 'aws-amplify'
import { connect } from 'react-redux'
import './Nav.scss'
import { logout } from '../actions/UserActions'
import { COLOR } from '../constants/Constants'
import Biztech from './Icons/Biztech'

const ICON_SIZE = '32px'

const styles = {
  listItem: {
    justifyContent: 'center',
    cursor: 'pointer'
  },
  paper: {
    backgroundColor: COLOR.BACKGROUND_COLOR
  }
}

function Nav (props) {
  const theme = useTheme()
  const renderDesktopOnly = useMediaQuery(theme.breakpoints.up('md'))
  const history = useHistory()

  const selected = { color: COLOR.BIZTECH_GREEN, fontSize: ICON_SIZE }
  const unselected = { color: COLOR.WHITE, fontSize: ICON_SIZE }
  const barSelected = { borderLeft: `6px solid ${COLOR.BIZTECH_GREEN}` }
  const barUnselected = { borderLeft: `6px solid ${COLOR.BACKGROUND_COLOR}` }

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
      <ListItem className='navItem' style={{ ...bar, ...styles.listItem }} onClick={onClick} aria-label={label} disableGutters={true}>
        {icon}
      </ListItem>
    )
  }

  return (
    <List className='navList'>
      {props.admin
        ? <React.Fragment>
          <MenuItem
            label='Home'
            icon={<Biztech fill={selectedItem !== '/' && '#fff'} size={ICON_SIZE} />}
            onClick={handleItemClick.bind(null, '/')}
            bar={selectedItem === '/' ? barSelected : barUnselected}
          />
          <MenuItem
            label='Create Event'
            icon={<AddBoxIcon style={selectedItem === '/event/new' ? selected : unselected} />}
            onClick={handleItemClick.bind(null, '/event/new')}
            bar={selectedItem === '/event/new' ? barSelected : barUnselected} />
          <MenuItem
            label='Manage Prizes'
            icon={<RedeemIcon style={selectedItem === '/prizes' ? selected : unselected} />}
            onClick={handleItemClick.bind(null, '/prizes')}
            bar={selectedItem === '/prizes' ? barSelected : barUnselected} />
          {renderDesktopOnly && <MenuItem
            label='Logout'
            icon={<ExitToAppIcon />}
            onClick={logout} />}
        </React.Fragment>
        : <React.Fragment>
          <MenuItem
            label='Home'
            icon={<Biztech fill={selectedItem !== '/' && '#fff'} size={ICON_SIZE} />}
            onClick={handleItemClick.bind(null, '/')}
            bar={selectedItem === '/' ? barSelected : barUnselected}
          />
          <MenuItem
            label='Events'
            icon={<DateRangeIcon style={selectedItem === '/events' ? selected : unselected} />}
            onClick={handleItemClick.bind(null, '/events')}
            bar={selectedItem === '/events' ? barSelected : barUnselected} />
          <MenuItem
            label='Profile'
            icon={<PersonIcon style={selectedItem === '/profile' ? selected : unselected} />}
            onClick={handleItemClick.bind(null, '/profile')}
            bar={selectedItem === '/profile' ? barSelected : barUnselected} />
          {renderDesktopOnly && <MenuItem
            label='Logout'
            icon={<ExitToAppIcon style={unselected} />}
            onClick={logout}
            bar={barUnselected} />}
        </React.Fragment>
      }
    </List>
  )
}

export default (withStyles(styles))(withRouter(connect(null, { logout })(Nav)))
