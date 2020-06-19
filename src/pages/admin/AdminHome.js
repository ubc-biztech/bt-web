import React from 'react'
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import Box from '@material-ui/core/Box';
import { withRouter, Link } from 'react-router-dom';
import CircularProgress from "@material-ui/core/CircularProgress";
import ThemeProvider from '../../components/ThemeProvider'
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import EventCard from "../../components/Cards/Event";
import { fetchBackend, updateEvents } from '../../utils'
import { Helmet } from 'react-helmet';

const styles = ({
  row: {
    display: 'flex'
  },
  columnLeft: {
    flex: '50%',
    textAlign: 'left'
  },
  columnRight: {
    flex: '50%',
    textAlign: 'right',
    marginRight: '72px'
  }
});

function AdminHome(props) {

  const { user, events } = props;
  if(!events){
    updateEvents()
  }

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [eventMenuClicked, setEventMenuClicked] = React.useState(null);

  const handleClick = (e, event) => {
    setAnchorEl(e.currentTarget);
    setEventMenuClicked(event);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickEditEvent = () => {
    props.history.push(`/event/${eventMenuClicked}/edit`);
    handleClose()
  };

  const handleClickDeleteEvent = () => {
    const clickedEvent = events.find(event => event.id === eventMenuClicked)
    if (window.confirm(`Are you sure you want to delete ${clickedEvent.ename}? This cannot be undone`)) {
      fetchBackend(`/events/${clickedEvent.id}`, 'DELETE')
        .then(response => {
          alert(response.message)
          updateEvents()
        })
        .catch(err => {
          console.log(err)
          alert(err.message + ' Please contact a dev')
        })
    }
    handleClose()
  };

  const handleClickViewEvent = () => {
    props.history.push(`/event/${eventMenuClicked}/register`);
    handleClose()
  };

  function createEventCards() {

    if (events)
      return <Box flexWrap="wrap" display="flex">
        {events.map(event =>
          <EventCard
            event={event}
            handleClick={handleClick}
          />
        )}
      </Box >
  }

  return events !== null ? (
    <ThemeProvider>
      <Helmet>
        <title>BizTech Admin Dashboard</title>
      </Helmet>

      <div style={styles.row}>
        <div style={styles.columnLeft}>
          <Typography variant="h1">BizTech Admins</Typography>
          <Typography>BizTech Admins</Typography>
        </div>
        <div style={styles.columnRight}>
          {/* Link to user dashboard*/}
          {user.admin && <Link to="/user-dashboard">
            <Button variant="contained" color="primary">User Dashboard</Button>
          </Link>}
        </div>
      </div>

      {createEventCards()}
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClickEditEvent}>Edit Event</MenuItem>
        <MenuItem onClick={handleClickDeleteEvent}>Delete Event</MenuItem>
        <MenuItem onClick={handleClickViewEvent}>View Event</MenuItem>
      </Menu>
    </ThemeProvider>
  ) : (
      <CircularProgress />
    );
}

const mapStateToProps = state => {
  return {
    user: state.userState.user,
    events: state.pageState.events
  };
};

export default connect(mapStateToProps, {})(withStyles(styles)(withRouter(AdminHome)));
