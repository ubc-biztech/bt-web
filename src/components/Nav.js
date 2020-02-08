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
import HomeIcon from '@material-ui/icons/Home';
import { Logout } from "./Authentication";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  drawer: {
  }
}))

function Nav(props) {
  const history = useHistory();
  const classes = useStyles();

  const handleItemClick = event => {
    props.setEvent(event);
    if (event.id)
      history.push({ pathname: "/event", search: "?id=" + event.id });
    else history.push("/");
  };

  return (
    <div>
      <Drawer variant="permanent" className={classes.drawer}>
        <Divider />
        <List>
          <ListItem onClick={handleItemClick} ariaLabekl="home" button>
            <HomeIcon />
          </ListItem>
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

export default connect(mapStateToProps, { setEvent })(Nav);
