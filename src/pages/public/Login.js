import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Auth } from 'aws-amplify'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

import {
  Button,
  Card,
  CardContent,
  CssBaseline,
  Typography,
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

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    emailError: '',
    passwordError: '',
  });

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
    let error = '';
    if (!value) {
      error = 'Password is required';
    }
    return error;
  }

  const handleSubmit = async () => {
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (emailError || passwordError) {
      // if any errors with inputs, set state and rerender (don't call signin/signup)
      setErrors({
        emailError: emailError,
        passwordError: passwordError,
      })
    } else {
      try {
        const signInResponse = await Auth.signIn({
          username: email,
          password: password,

        })
        console.log(signInResponse)
      } catch (error) {
        console.log("caught error", error)
        // const signUpResponse = Auth.signUp({
        //   username: email,
        //   password: password,
        //   attributes: {
        //     name: 'Alvin',
        //   }
        // })
        // console.log(signUpResponse)
      }
    }
  }

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
            <Typography>Sign in with your member email and password:</Typography>
            <form>
              <label>
                Email:
                <input type='text' email='email' value={email} onChange={(e) => setEmail(e.target.value)} />
              </label>
              <div color='red'>{errors.emailError}</div>
            </form>
            <form>
              <label>
                Password:
                <input type='password' email='password' value={password} onChange={(e) => setPassword(e.target.value)} />
              </label>
              <div color='red'>{errors.passwordError}</div>
              <Button
                onClick={() => handleSubmit()}
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

const mapStateToProps = (state) => {
  return {
    user: state.userState.user.data
  }
}

export default connect(mapStateToProps, { setUser })(Login)
