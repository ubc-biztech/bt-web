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
import { Alert } from "@material-ui/lab";
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
  emailLogin: {
    marginTop: "15px"
  },
  recoveryEmail: {
    marginTop: "5px"
  },
  recoverPasswordLink: {
    color: COLORS.BIZTECH_GREEN,
    marginLeft: "5px",
    marginTop: "10px"
  },
  inputText: {
    width: "100%",
    height: "30px",
    borderRadius: 10
  },
  alert: {
    display: "flex",
    flexWrap: "wrap"
  },
  errors: {
    color: "red"
  }
};

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [errors, setErrors] = useState({
    emailError: "",
    passwordError: "",
    verificationCodeError: ""
  });
  const [isEmailSent, setEmailSent] = useState(false);
  const [isPasswordReset, setPasswordReset] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
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
    if (!value && value.length !== 6) {
      error = "Valid verification code is required";
    }
    return error;
  };

  const sendResetEmail = () => {
    setModalOpen(false); // close the resend email modal in case it is open
    Auth.forgotPassword(email)
      .then(() => {
        // if the user is requesting the verification code to be resent, then open the modal
        if (isEmailSent) setModalOpen(true);

        setEmailSent(true);
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

  const resetPasswordSubmit = (e) => {
    e.preventDefault();
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const verificationCodeError = validateVerificationCode(verificationCode);

    if (emailError || passwordError) {
      // if any errors with inputs, set state and rerender (don't call signin/signup)
      setErrors({
        emailError,
        passwordError,
        verificationError: verificationCodeError
      });
    } else if (confirmPassword !== password) {
      setErrors({
        ...errors,
        passwordError: "Passwords do not match"
      });
    } else {
      Auth.forgotPasswordSubmit(email, verificationCode, password)
        .then(() => {
          setEmailSent(false);
          setPasswordReset(true);
          // redirect to login page after 10 seconds
          setTimeout(() => {
            // check if page is still active with useHistory, then redirect to login page
            if (history.location.pathname === "/forgot-password") {
              history.push("/login");
            }
          }, 10000);
        })
        .catch((err) => {
          setErrors({
            ...errors,
            emailError: err.message
          });
        });
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (isEmailSent) {
        resetPasswordSubmit(event);
      } else {
        sendResetEmail();
      }
    }
  };

  return (
    <div style={styles.main}>
      <CssBaseline />
      {/* TODO: Maintenance message here for MinVP */}
      <div style={styles.columns}>
        <Card style={styles.card}>
          {!isEmailSent ? (
            <CardContent>
              {isPasswordReset ? (
                <Typography variant="h2" color="primary">
                  Password reset successfully! You will be automatically
                  redirected to the login page in 10 seconds.
                </Typography>
              ) : (
                <div>
                  <Typography variant="h1" color="primary">
                    Reset Your Password
                  </Typography>
                  <form>
                    <Typography style={styles.emailLogin}>Email:</Typography>
                    <input
                      style={styles.inputText}
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onKeyPress={handleKeyPress}
                    />
                    <div style={styles.errors}>{errors.emailError}</div>
                  </form>
                  <Button
                    type="submit"
                    onClick={() => sendResetEmail()}
                    style={styles.recoverButton}
                  >
                    Send verification code
                  </Button>
                </div>
              )}
              {/* return to login page */}
              <div style={{ marginTop: "10px" }}>
                <Typography>
                  <Link to="/login" style={styles.recoverPasswordLink}>
                    Return to login
                  </Link>
                </Typography>
              </div>
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
              {/* resend email */}
              <Typography>
                If you did not receive the email, click
                <Link
                  onClick={() => sendResetEmail()}
                  style={styles.recoverPasswordLink}
                >
                  here
                </Link>{" "}
                to resend.
              </Typography>

              {/* show success alert modal if email has been resent, with onClose */}
              {isModalOpen ? (
                <Alert
                  severity="success"
                  onClose={() => {
                    setModalOpen(false);
                  }}
                  variant="filled"
                >
                  Verification code resent to {email}
                </Alert>
              ) : null}

              <form>
                <div style={styles.errors}>{errors.emailError}</div>
                <Typography style={styles.emailLogin}>
                  Verification Code:
                </Typography>
                <input
                  style={styles.inputText}
                  type="email"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <div style={styles.errors}>{errors.verificationCodeError}</div>
              </form>
              {/* confirm new password */}
              <form>
                <Typography style={styles.emailLogin}>New Password:</Typography>
                <input
                  style={styles.inputText}
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <div style={styles.errors}>{errors.passwordError}</div>
              </form>
              <form>
                <Typography style={styles.emailLogin}>
                  Confirm New Password:
                </Typography>
                <input
                  style={styles.inputText}
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <Button
                  type="submit"
                  onClick={(e) => resetPasswordSubmit(e)}
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
