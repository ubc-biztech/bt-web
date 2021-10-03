import React from 'react'
import { connect } from 'react-redux'
import { Auth } from 'aws-amplify'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

import {
  Button,
  Card,
  CardContent,
  CssBaseline,
  Typography
} from '@material-ui/core'

import LoginImage from 'assets/login.svg'
import { COLORS } from 'constants/index'
import { setUser } from 'store/user/userActions'

const styles = {
  main: {
    display: 'flex',
    height: '100vh',
    alignItems: 'center'
  },
  columns: {
    maxWidth: '1100px',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap-reverse',
    justifyContent: 'space-between'
  },
  card: {
    borderRadius: 10,
    minWidth: 300,
    padding: 42,
    margin: 30,
    flex: 1
  },
  left: {
    float: 'left'
  },
  socialIcon: {
    marginTop: '5px',
    marginRight: '8px',
    width: '19px'
  },
  googleButton: {
    marginTop: '15px',
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
    color: COLORS.WHITE,
    width: '100%',
    '&:hover': {
      backgroundColor: '#1470E4'
    }
  },
  loginImage: {
    maxWidth: 500,
    flex: 1,
    margin: 50
  },
  notAMember: {
    marginTop: '30px'
  },
  signUpLink: {
    color: COLORS.BIZTECH_GREEN,
    marginLeft: '5px'
  }
}

function Login () {
  return (
    <div style={styles.main}>
      <Helmet>
        <title>UBC BizTech - Log In or Sign Up</title>
      </Helmet>
      <CssBaseline />
      {/* TODO: Maintenance message here for MinVP */}
      <div style={styles.columns}>
        <Card style={styles.card}>
          <CardContent>
            <Typography variant='h1' color='primary'>
              Sign In
            </Typography>
            <Typography>Sign in as a BizTech Exec</Typography>
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
              onClick={() => Auth.federatedSignIn({ provider: 'Facebook' })}
              style={styles.facebookButton}
            >
              <div style={styles.left}>
                <img style={styles.socialIcon} alt='Facebook' src='./fb.png' />
              </div>
              Sign In with Facebook
            </Button>
            <Typography>Or sign in with your email and password:</Typography>
            <form>
              <label>
                Email:
                <input type='text' email='email' />
              </label>
            </form>
            <form>
              <label>
                Password:
                <input type='text' email='email' />
              </label>
              <Button
                onClick={() => {
                  try {
                    Auth.signIn(email, password)/// place holder for inputting sign in with email and password do try for this and if exception caught then
                    /// call Auth.signUp(email, password).
                  } catch (error) {
                    Auth.signUp(email, password)
                  }
                }
                }
                style={styles.googleButton}
              >
              Sign in
              </Button>

            </form>

            <Typography style={styles.notAMember}>
              Not a BizTech member yet?
              <Link to='/signup' style={styles.signUpLink}>
                Sign up here!
              </Link>
            </Typography>
          </CardContent>
        </Card>
        <img src={LoginImage} alt='Computer' style={styles.loginImage} />
      </div>
    </div>
  )
}

var email = ''
var password = ''

const mapStateToProps = (state) => {
  return {
    user: state.userState.user.data
  }
}

export default connect(mapStateToProps, { setUser })(Login)
