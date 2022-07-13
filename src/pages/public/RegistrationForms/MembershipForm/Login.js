import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Auth } from 'aws-amplify'
import { Helmet } from 'react-helmet'
import { useHistory } from 'react-router-dom'

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
    flexDirection: 'column',
    height: '100vh',
    alignItems: 'center',
  },
  columns: {
    maxWidth: '1100px',
    margin: 'auto',
    marginTop: 32,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  access: {
    marginTop: 'auto',
    fontWeight: 'bold',
    fontSize: '24px'
  },
  card: {
    borderRadius: 10,
    minWidth: 400,
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
  submitButton: {
    marginTop: '15px',
    textTransform: 'none',
    textAlign: 'left',
    fontWeight: 'bold',
    backgroundColor: COLORS.BIZTECH_GREEN,
    color: COLORS.BLACK,
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
  loginMember: {
    marginTop: '20px',
    color: COLORS.BIZTECH_GREEN
  },
  emailLogin: {
    marginTop: '5px'
  },
  passwordLogin: {
    marginTop: '5px'
  },
  signUpLink: {
    color: COLORS.BIZTECH_GREEN,
    marginLeft: '5px'
  },
  inputText: {
    width: '100%',
    height: '30px',
    borderRadius: 10
  },
  errors: {
    color: 'red'
  }

}

function Login () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({
    emailError: '',
    passwordError: ''
  })
  const history = useHistory()

  const validateEmail = (value) => {
    let error = ''
    if (!email) {
      error = 'Email is required'
      // eslint-disable-next-line
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = 'Please enter a valid email address'
    }
    return error
  }

  const validatePassword = (value) => {
    let error = ''
    if (!value) {
      error = 'Password is required'
    }
    return error
  }

  const handleSubmit = async () => {
    const emailError = validateEmail(email)
    const passwordError = validatePassword(password)

    if (emailError || passwordError) {
      // if any errors with inputs, set state and rerender (don't call signin/signup)
      setErrors({
        emailError: emailError,
        passwordError: passwordError
      })
    } else {
      try {
        await Auth.signIn({
          username: email,
          password: password
        })
        history.push('/login-redirect', { redirect: '/signup' })
      } catch (error) {
        console.log('caught error', error)
        if (error.name === 'UserNotFoundException') {
          setErrors({
            emailError: '',
            passwordError: 'Incorrect username or password.'
          })
        } else {
          setErrors({
            emailError: '',
            passwordError: error.message
          })
        }
        setPassword('')
      }
    }
  }

  return (
    <div style={styles.main}>
      <Helmet>
        <title>UBC BizTech - Log In or Sign Up</title>
      </Helmet>
      <CssBaseline />
      <Typography style={styles.access}>
          To access the membership form, please sign in.
      </Typography>
      {/* TODO: Maintenance message here for MinVP */}
      <div style={styles.columns}>
        <Card style={styles.card}>
          <CardContent>
            <Typography variant='h1' color='primary'>
              Sign In
            </Typography>
            <form>
              <Typography
                style={styles.emailLogin}>
                Email:
              </Typography>
              <input
                style={styles.inputText}
                type='text'
                email='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)} />
              <div style={styles.errors}>{errors.emailError}</div>
            </form>
            <form>
              <Typography style={styles.emailLogin}>
                Password:
              </Typography>
              <input
                style={styles.inputText}
                type='password'
                email='password'
                value={password} onChange={(e) => setPassword(e.target.value)} />
              <div style={styles.errors}>{errors.passwordError}</div>
              <Button
                onClick={() => handleSubmit()}
                style={styles.submitButton}
              >
                Sign in
              </Button>
            </form>
          </CardContent>
        </Card>
        <img src={LoginImage} alt='Computer' style={styles.loginImage} />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.userState.user.data
  }
}

export default connect(mapStateToProps, { setUser })(Login)