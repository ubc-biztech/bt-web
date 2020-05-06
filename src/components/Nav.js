import React from "react";
import {
  Drawer,
  Divider,
  List,
  ListItem,
} from "@material-ui/core";
import "./Nav.scss";
import { setEvent } from "../actions/PageActions";
import { connect } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import HomeIcon from '@material-ui/icons/Home';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { useHistory, withRouter } from "react-router-dom";
import { Auth } from "aws-amplify";

const useStyles = makeStyles(theme => ({
  drawer: {
  }
}))

function Nav(props) {
  const history = useHistory();
  const classes = useStyles();

  const logout = () => {
    Auth.signOut()
      .then(data => {
        props.logout()
      })
      .catch(err => console.log(err));
  }

  const handleItemClick = event => {
    props.setEvent(event);
    if (event.id)
      history.push(`/event/${event.id}`);
    else history.push("/");
  };

  const handleNewEventClick = () => {
    history.push('/event/new')
  }

  function MenuItem(props) {
    const { label, icon, onClick } = props;
    return (
      <Tooltip title={label} aria-label={label} placement="right">
        <ListItem onClick={onClick} aria-label={label} button>
          {icon}
        </ListItem>
      </Tooltip>
    )
  }

  return (
    <div>
      <Drawer variant="permanent" className={classes.drawer}>
        <Divider />
        <List>
          <MenuItem label='Home' icon={<HomeIcon />} onClick={handleItemClick} />
          <MenuItem label='Create Event' icon={<AddBoxIcon />} onClick={handleNewEventClick} />
          <Divider />
          <MenuItem label='Logout' icon={<ExitToAppIcon />} onClick={logout} />
        </List>
        {/* 
        <Typography className="menu-tag" variant="h6" noWrap>
          Events
        </Typography>
        <List>
          {events
            ? events.map(event => (
              <ListItem
                button
                selected={props.event ? event.id === props.event.id : false}
                key={event.ename}
                component="a"
                onClick={handleItemClick.bind(this, event)}
              >
                <ListItemText primary={event.ename} />
              </ListItem>
            ))
            : "Loading..."}
          <Logout />
        </List> */}
      </Drawer>
    </div >
  );
}

const mapStateToProps = state => {
  return {
    event: state.pageState.event
  };
};

export default connect(mapStateToProps, { setEvent })(withRouter(Nav));
