import React from 'react'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

import { Auth } from 'aws-amplify'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { setUser } from '../../actions/UserActions'
import { COLOR } from '../../constants/Constants'

const styles = {
  left: {
    float: 'left'
  },
  socialIcon: {
    marginTop: "5px",
    marginRight: "8px",
    width: "19px"
  },
  googleButton: {
    marginTop: '32px',
    textTransform: 'none',
    textAlign: 'left',
    fontWeight: 'bold',
    backgroundColor: 'white',
    color: 'black',
    width: '100%',
    '&:hover': {
      backgroundColor: '#eeeeee'
    }
  },
  facebookButton: {
    marginTop: '12px',
    textTransform: 'none',
    textAlign: 'left',
    fontWeight: 'bold',
    backgroundColor: '#1778F2',
    color: COLOR.WHITE,
    width: '100%',
    '&:hover': {
      backgroundColor: '#1470E4'
    }
  }
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(10),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#3fb5a3"
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  root: {
    borderRadius: 12,
    minWidth: 256,
    padding: '40px'
  },
  header: {
    textAlign: 'center',
    spacing: 10
  },
  list: {
    padding: '20px'
  },
  button: {
    margin: theme.spacing(1)
  },
  action: {
    display: 'flex',
    justifyContent: 'space-around'
  }
}))


function Login (props) {
  const classes = useStyles()
  return (
    <Container component='main' maxWidth='xs'>
      <Helmet>
        <title>UBC BizTech - Log In or Sign Up</title>
      </Helmet>
      <CssBaseline />
      <div className={classes.paper}>
        <Card className={classes.root} width='600px'>
          <CardContent>
          <Typography variant='h1' color='primary'>Sign In</Typography>
          <Typography>Don't have an account? Sign up</Typography>
            <Button
              onClick={() => Auth.federatedSignIn({ provider: 'Google' })}
              style={styles.googleButton}
            >
              <div style={styles.left}>
                <img
                  style={styles.socialIcon}
                  alt='Google'
                  src='./google.png'
                />
              </div>
              Sign In with Google
            </Button>
            <Button
              onClick={() => Auth.federatedSignIn({ provider: "Facebook" })}
              style={styles.facebookButton}
            >
              <div style={styles.left}>
                <img
                  style={styles.socialIcon}
                  alt="Facebook"
                  src="./fb.png"
                />
              </div>
              Sign In with Facebook
            </Button>
          </CardContent>
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

export default connect(mapStateToProps, { setUser })(Login)
