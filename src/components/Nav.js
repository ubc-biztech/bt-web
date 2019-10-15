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
            {props.eventSelected}
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
        <List>
          {events.map((event) => (
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
          ))}
        </List>
      </Drawer>
    </div>
  );
}