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

export default function Nav(props) {

  const events = props.events

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
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
            href={"/"}
            onClick={handleDrawerClose}
          >
            <ListItemText primary="Home" />
          </ListItem>
        <br></br>
        <ListItem
            button
            selected={!props.eventSelected}
            component="a"
            href={"/andydev"}
            onClick={handleDrawerClose}
          >
            <ListItemText primary="Andy's Dev Spot" />
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
              href={"/?event=" + event.id}
              onClick={handleDrawerClose}
            >
              <ListItemText primary={event.ename} />
            </ListItem>
          )) : 'Loading...'}
        </List>
      </Drawer>
    </div>
  );
}