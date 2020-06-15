import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon
} from "@material-ui/core";
import "./Nav.scss";
import { withStyles } from '@material-ui/styles';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { useHistory, withRouter } from "react-router-dom";
import { Auth } from "aws-amplify";
import { connect } from 'react-redux'
import { logout } from '../actions/UserActions'
import Logo from '../pages/member/images/biztech.svg'

const styles = {
  list: {
    width: '170px',
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
    paddingLeft: '48px',
    color: '#FFFFFF'
  },
  paper: {
    backgroundColor: '#070F21'
  }
}

function Nav(props) {
  const { classes } = props
  const history = useHistory();

  const selected = { color: '#7AD040', fontSize: '30', width: '43px' }
  const unselected = { color: '#FFFFFF', fontSize: '30', width: '43px' }
  const barSelected = { borderLeft: '6px solid #7AD040', height: '45px', marginTop: '28px', paddingBottom: '28px', backgroundPositionX: 'left' }
  const barUnselected = { borderLeft: '6px solid #070F21', height: '45px', marginTop: '28px', paddingBottom: '28px' }

  const pathname = window.location.pathname
  const [homeBar, setHomeBar] = useState(pathname === '/' ? barSelected : barUnselected)
  const [eventsBar, setEventsBar] = useState(pathname === '/event/new' ? barSelected : barUnselected)
  const [home, setHome] = useState(pathname === '/' ? selected : unselected)
  const [events, setEvents] = useState(pathname === '/event/new' ? selected : unselected)

  const logout = () => {
    Auth.signOut()
      .then(() => {
        props.logout()
      })
      .catch(err => console.log(err));
  }

  const handleItemClick = event => {
    if (event.id) {
      history.push(`/event/${event.id}`);
    } else {
      history.push("/");
      setHome(selected);
      setHomeBar(barSelected);
      setEvents(unselected);
      setEventsBar(barUnselected)
    }
  };

  const handleNewEventClick = () => {
    history.push('/event/new')
    setHome(unselected);
    setHomeBar(barUnselected);
    setEvents(selected);
    setEventsBar(barSelected);
  }

  function MenuItem(props) {
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
          <MenuItem label='Home' icon={<img src={Logo} alt='Home' style={home} />} onClick={handleItemClick} bar={homeBar} />
          <MenuItem label='Create Event' icon={<AddBoxIcon style={events} />} onClick={handleNewEventClick} bar={eventsBar} />
          <ListItem>
            <ListItemIcon style={styles.logout} onClick={logout}>
              <ExitToAppIcon style={styles.iconSize} />
            </ListItemIcon>
          </ListItem>
        </List>
      </Drawer>
    </div >
  );
}

export default (withStyles(styles))(withRouter(connect(null, { logout })(Nav)));
