import React from 'react'
import {
    Drawer,
    IconButton,
    Divider,
    List,
    ListItem,
    ListItemText,
    Toolbar,
    Typography,
    AppBar,
} from '@material-ui/core'
import './Nav.scss'
import { connect } from 'react-redux'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import Menu from '@material-ui/icons/Menu'
import { useHistory } from 'react-router-dom'
import { Logout } from './Authentication'
import { setEvent } from '../actions/PageActions'

function Nav(props) {
    const history = useHistory()

    const { events } = props

    const [open, setOpen] = React.useState(false)

    const handleDrawerOpen = () => {
        setOpen(true)
    }

    const handleItemClick = (event) => {
        props.setEvent(event)
        if (event.id) history.push({ pathname: '/event', search: `?id=${event.id}` })
        else history.push('/')
        setOpen(false)
    }

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
                        BizTech Admin Dashboard
{' '}
                  {props.event ? `- ${props.event.ename}` : ''}
                </Typography>
            </Toolbar>
            </AppBar>
          <Drawer variant="persistent" open={open} anchor="left">
              <div>
              <IconButton onClick={() => setOpen(false)}>
                        <ChevronLeft />
                    </IconButton>
            </div>
                <Divider />
                <ListItem
              button
                    selected={!props.event}
              component="a"
                    onClick={handleItemClick}
            >
              <ListItemText primary="Home" />
            </ListItem>
                <br />
              <Typography className="menu-tag" variant="h6" noWrap>
                    Events
                </Typography>
                <List>
              {events
                        ? events.map((event) => (
                          <ListItem
                                  button
                                selected={
                                      props.event ? event.id === props.event.id : false
                                  }
                                key={event.ename}
                                component="a"
                                  onClick={handleItemClick.bind(this, event)}
                              >
                                  <ListItemText primary={event.ename} />
                              </ListItem>
                          ))
                        : 'Loading...'}
              <Logout />
            </List>
            </Drawer>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        event: state.pageState.event,
    }
}

export default connect(mapStateToProps, { setEvent })(Nav)
