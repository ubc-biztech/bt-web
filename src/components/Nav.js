import React from 'react';
import {
  Drawer,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
  AppBar
} from '@material-ui/core';
import './Nav.scss';
import { ChevronLeft, Menu } from '@material-ui/icons';
import { setEvent } from "../actions/indexActions";
import { connect } from "react-redux";

function Nav(props) {

  const events = props.events

  // const setEvent = props.setEvent

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = (event) => {
    props.setEvent(event)
    setOpen(false);
  };

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" noWrap>
            BizTech Admin Dashboard { props.eventSelected ? '- ' + props.eventSelected : '' }
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="persistent" open={open} anchor="left">
        <div>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeft />
          </IconButton>
        </div>
        <Divider />
        <ListItem
            button
            selected={!props.eventSelected}
            component="a"
            onClick={handleDrawerClose}
          >
            <ListItemText primary="Home" />
          </ListItem>
        <br></br>
        <Typography className="menu-tag" variant="h6" noWrap>Events</Typography>
        <List>
          { events ? events.map((event) => (
            <ListItem
              button
              selected={event.id === props.eventSelected}
              key={event.ename}
              component="a"
              onClick={handleDrawerClose.bind(this, event)}
            >
              <ListItemText primary={event.ename} />
            </ListItem>
          )) : 'Loading...'}
        </List>
      </Drawer>
    </div>
  );
}

export default connect(null, { setEvent })(Nav);
