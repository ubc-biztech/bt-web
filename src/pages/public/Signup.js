import React from 'react'
import { connect } from 'react-redux'
import { Auth } from 'aws-amplify'
import { Helmet } from 'react-helmet'

import { makeStyles } from '@material-ui/core/styles'
import {
  Avatar,
  Button,
  Card,
  CardHeader,
  Container,
  CssBaseline,
  Typography
} from '@material-ui/core'
import { Person as PersonIcon } from '@material-ui/icons'

import { setUser } from 'store/user/UserActions'

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(10),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  root: {
    borderRadius: 12,
    minWidth: 256,
    textAlign: 'center',
    padding: theme.spacing(4)
  },
  avatar: {
    margin: 'auto',
    backgroundColor: '#54D260'
  },
  header: {
    paddingBottom: theme.spacing(1)
  },
  button: {
    marginTop: theme.spacing(2)
  },
  left: {
    float: 'left'
  },
  socialIcon: {
    marginTop: '5px',
    marginRight: '8px',
    width: '19px'
  }
}))

function Signup (props) {
  const classes = useStyles()
  const inviteCode = new URLSearchParams(props.location.search).get('invite')
  if (inviteCode) {
    sessionStorage.setItem('inviteCode', inviteCode)
  }

  return (
    <Container component='main' maxWidth='xs'>
      <Helmet>
        <title>UBC BizTech - Sign Up</title>
      </Helmet>
      <CssBaseline />
      <div className={classes.paper}>
        <Card className={classes.root} width='400px'>
          <Avatar className={classes.avatar}>
            <PersonIcon />
          </Avatar>
          <CardHeader title='Sign Up' className={classes.header} />
          {
            inviteCode
              ? <Typography className={classes.subtext}>
                To complete your registration, please sign up
              </Typography> : ''
          }
          <Button
            className={classes.button}
            onClick={() => Auth.federatedSignIn({ provider: 'Google' })}
            variant='contained'
            color='primary'
          >
            <div className={classes.left}>
              <img
                className={classes.socialIcon}
                alt='Google'
                src='./google.png'
              />
            </div>
              Sign Up with Google
          </Button>
        </Card>
      </div>
    </Container>
  )
}

const mapStateToProps = state => {
  return {
    user: state.userState.user
  }
}

export default connect(mapStateToProps, { setUser })(Signup)
