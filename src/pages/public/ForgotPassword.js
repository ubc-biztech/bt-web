import React, { useState } from "react";
import { connect } from "react-redux";
import { Auth } from "aws-amplify";
import {
  Button,
  Card,
  CardContent,
  CssBaseline,
  Typography
} from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import LoginImage from "assets/login.svg";
import { COLORS } from "constants/index";
import { setUser } from "store/user/userActions";

const styles = {
  main: {
    display: "flex",
    height: "100vh",
    alignItems: "center"
  },
  columns: {
    maxWidth: "1100px",
    margin: "auto",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap-reverse",
    justifyContent: "space-between"
  },
  card: {
    borderRadius: 10,
    minWidth: 300,
    padding: 42,
    margin: 30,
    flex: 1
  },
  left: {
    float: "left"
  },
  socialIcon: {
    marginTop: "5px",
    marginRight: "8px",
    width: "19px"
  },
  recoverButton: {
    marginTop: "15px",
    textTransform: "none",
    textAlign: "left",
    fontWeight: "bold",
    backgroundColor: COLORS.BIZTECH_GREEN,
    color: COLORS.BLACK,
    width: "100%",
    "&:hover": {
      backgroundColor: "#eeeeee"
    }
  },
  loginImage: {
    maxWidth: 500,
    flex: 1,
    margin: 50
  },
  recoveryEmail: {
    marginTop: "5px"
  },
  recoverPasswordLink: {
    color: COLORS.BIZTECH_GREEN,
    marginLeft: "5px"
  },
  inputText: {
    width: "100%",
    height: "30px",
    borderRadius: 10
  },
  errors: {
    color: "red"
  }
};

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [errors, setErrors] = useState({
    emailError: "",
    passwordError: "",
    verificationCodeError: ""
  });
  const [reset, setReset] = useState(false);
  const history = useHistory();

  const validateEmail = (value) => {
    let error = "";
    if (!email) {
      error = "Email is required";
      // eslint-disable-next-line
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = "Please enter a valid email address";
    }
    return error;
  };

  const validatePassword = (value) => {
    let error = "";
    if (!value) {
      error = "Password is required";
    }
    return error;
  };

  const validateVerificationCode = (value) => {
    let error = "";
    if (!value && value.length != 6) {
      error = "Valid verification code is required";
    }
    return error;
  };

  const resetPassword = () => {
    Auth.forgotPassword(email)
      .then(() => {
        // setErrors({
        //   ...errors,
        //   emailError: 'Password reset email sent'
        // })
        setReset(true);
        setErrors({
          ...errors,
          emailError: "",
          passwordError: ""
        });
      })
      .catch((err) => {
        setErrors({
          ...errors,
          emailError: err.message
        });
      });
  };

  const resetPasswordSubmit = () => {
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const verificationCodeError = validateVerificationCode(verificationCode);

    if (emailError || passwordError) {
      // if any errors with inputs, set state and rerender (don't call signin/signup)
      setErrors({
        emailError: emailError,
        passwordError: passwordError,
        verificationError: verificationCodeError
      });
    } else {
      Auth.forgotPasswordSubmit(email, verificationCode, password)
        .then(() => {
          setReset(false);
          setErrors({
            ...errors,
            emailError: "Password reset successful! Please login."
          });
        })
        .catch((err) => {
          setErrors({
            ...errors,
            emailError: err.message
          });
        });
    }
  };

  return (
    <div style={styles.main}>
      <CssBaseline />
      {/* TODO: Maintenance message here for MinVP */}
      <div style={styles.columns}>
        <Card style={styles.card}>
          {!reset ? (
            <CardContent>
              <Typography variant="h1" color="primary">
                Reset Your Password
              </Typography>
              <form>
                <Typography style={styles.emailLogin}>Email:</Typography>
                <input
                  style={styles.inputText}
                  type="text"
                  email="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div style={styles.errors}>{errors.emailError}</div>
              </form>
              <Button
                onClick={() => resetPassword()}
                style={styles.recoverButton}
              >
                Send verification code
              </Button>
            </CardContent>
          ) : (
            <CardContent>
              <Typography variant="h1" color="primary">
                Password Reset Email Sent!
              </Typography>
              {/* enter the verification code */}
              <Typography>
                Please check your email for the verification code.
              </Typography>
              <form>
                <Typography style={styles.emailLogin}>Email:</Typography>
                <input
                  style={styles.inputText}
                  type="email"
                  email="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div style={styles.errors}>{errors.emailError}</div>
                <Typography style={styles.emailLogin}>
                  Verification Code:
                </Typography>
                <input
                  style={styles.inputText}
                  type="email"
                  email="verification code"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                />
                <div style={styles.errors}>{errors.verificationCodeError}</div>
              </form>
              <form>
                <Typography style={styles.emailLogin}>New Password:</Typography>
                <input
                  style={styles.inputText}
                  type="password"
                  email="new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div style={styles.errors}>{errors.passwordError}</div>
                <Button
                  onClick={() => resetPasswordSubmit()}
                  style={styles.recoverButton}
                >
                  Reset Password
                </Button>
              </form>
            </CardContent>
          )}
        </Card>
        <img src={LoginImage} alt="Computer" style={styles.loginImage} />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.userState.user.data
  };
};

export default connect(mapStateToProps, { setUser })(ForgotPassword);
