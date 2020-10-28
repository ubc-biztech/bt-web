import React, { useState, useEffect } from 'react'
import { useHistory, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Auth } from 'aws-amplify'

import { List, ListItem, Divider } from '@material-ui/core'
import { useTheme, withStyles } from '@material-ui/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'

import AddBoxIcon from '@material-ui/icons/AddBox'
import DateRangeIcon from '@material-ui/icons/DateRange'
import PersonIcon from '@material-ui/icons/Person'
import LockIcon from '@material-ui/icons/Lock'
import BiztechIcon from 'components/icons/BiztechIcon'
import LogoutIcon from 'components/icons/LogoutIcon'

import './Nav.scss'
import { COLORS } from 'constants/index'
import { logout } from 'actions/UserActions'
import { checkFeatureFlag } from 'utils'

const ICON_SIZE = '32px'

const styles = {
  listItem: {
    justifyContent: 'center',
    cursor: 'pointer'
  },
  paper: {
    backgroundColor: COLORS.BACKGROUND_COLOR
  },
  divider: {
    margin: '0.5em 1em',
    backgroundColor: 'rgba(255, 255, 255, 0.5)'
  }
}

function Nav (props) {
  const theme = useTheme()
  const renderDesktopOnly = useMediaQuery(theme.breakpoints.up('md'))
  const history = useHistory()

  const selected = { color: COLORS.BIZTECH_GREEN, fontSize: ICON_SIZE }
  const unselected = { color: COLORS.WHITE, fontSize: ICON_SIZE }
  const barSelected = { borderLeft: `6px solid ${COLORS.BIZTECH_GREEN}` }
  const barUnselected = { borderLeft: `6px solid ${COLORS.BACKGROUND_COLOR}` }

  const pathname = history.location.pathname
  const [selectedItem, setSelectedItem] = useState(pathname)
  useEffect(() => {
    setSelectedItem(pathname)
  }, [pathname])

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
    }
  }

  function MenuItem (props) {
    const { label, icon, onClick, bar, featureFlag } = props
    const isFeatureEnabled = checkFeatureFlag(featureFlag)
    return isFeatureEnabled ? (
      <ListItem className='navItem' style={{ ...bar, ...styles.listItem }} onClick={onClick} aria-label={label} disableGutters={true}>
        {icon}
      </ListItem>
    ) : null
  }

  return (
    <List className='Navigation'>
      <React.Fragment>
        {props.admin && <>
          <MenuItem
            label='Admin Home'
            icon={<LockIcon style={selectedItem === '/admin/home' ? selected : unselected} />}
            onClick={handleItemClick.bind(null, '/admin/home')}
            bar={selectedItem === '/admin/home' ? barSelected : barUnselected}
          />
          <MenuItem
            label='Create Event'
            icon={<AddBoxIcon style={selectedItem === '/admin/event/new' ? selected : unselected} />}
            onClick={handleItemClick.bind(null, '/admin/event/new')}
            bar={selectedItem === '/admin/event/new' ? barSelected : barUnselected}
          />
          <Divider style={styles.divider} />
        </>
        }
        <MenuItem
          label='Home'
          icon={<BiztechIcon fill={selectedItem !== '/member/home' && '#fff'} size={ICON_SIZE} />}
          onClick={handleItemClick.bind(null, '/member/home')}
          bar={selectedItem === '/member/home' ? barSelected : barUnselected}
          featureFlag='REACT_APP_SHOW_MAXVP'
        />
        <MenuItem
          label='Events'
          icon={<DateRangeIcon style={selectedItem === '/events' ? selected : unselected} />}
          onClick={handleItemClick.bind(null, '/events')}
          bar={selectedItem === '/events' ? barSelected : barUnselected}
          featureFlag='REACT_APP_SHOW_MAXVP'
        />
        <MenuItem
          label='Profile'
          icon={<PersonIcon style={selectedItem === '/member/profile' ? selected : unselected} />}
          onClick={handleItemClick.bind(null, '/member/profile')}
          bar={selectedItem === '/member/profile' ? barSelected : barUnselected}
          featureFlag='REACT_APP_SHOW_MAXVP'
        />
        {renderDesktopOnly && <MenuItem
          label='Logout'
          icon={<LogoutIcon />}
          onClick={logout}
        />}
      </React.Fragment>
    </List>
  )
}

export default (withStyles(styles))(withRouter(connect(null, { logout })(Nav)))
