import React, {
  useState
} from "react";
import {
  connect
} from "react-redux";
import {
  Auth
} from "aws-amplify";
import {
  Helmet
} from "react-helmet";
import {
  Link, useHistory
} from "react-router-dom";

import {
  Button,
  Card,
  CardContent,
  CssBaseline,
  Typography
} from "@material-ui/core";
import {
  Alert
} from "@material-ui/lab";

import LoginImage from "assets/login.svg";
import {
  COLORS
} from "constants/index";
import {
  setUser
} from "store/user/userActions";
import MentorCard from "components/mentor/MentorCard";

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
  googleButton: {
    marginTop: "15px",
    marginBottom: "15px",
    textTransform: "none",
    textAlign: "left",
    fontWeight: "bold",
    backgroundColor: "white",
    color: "black",
    width: "100%",
    "&:hover": {
      backgroundColor: "#eeeeee"
    }
  },
  submitButton: {
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
  facebookButton: {
    marginTop: "12px",
    textTransform: "none",
    textAlign: "left",
    fontWeight: "bold",
    backgroundColor: "#1778F2",
    color: COLORS.WHITE,
    width: "100%",
    "&:hover": {
      backgroundColor: "#1470E4"
    }
  },
  loginImage: {
    maxWidth: 500,
    flex: 1,
    margin: 50
  },
  notAMember: {
    marginTop: "30px"
  },
  continueAsGuest: {
    marginTop: "15px"
  },
  loginMember: {
    marginTop: "20px",
    color: COLORS.BIZTECH_GREEN
  },
  emailLogin: {
    marginTop: "5px"
  },
  passwordLogin: {
    marginTop: "5px"
  },
  signUpLink: {
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

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    emailError: "",
    passwordError: "",
    verificationCodeError: ""
  });
  const [isLoading, setIsLoading] = useState(false);
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

  const handleSubmit = async () => {
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    setIsLoading(true);

    if (emailError || passwordError) {
      // if any errors with inputs, set state and rerender (don't call signin/signup)
      setErrors({
        ...errors,
        emailError,
        passwordError
      });
    } else {
      try {
        await Auth.signIn({
          username: email,
          password
        });
        history.push("/login-redirect");
      } catch (error) {
        console.log("caught error", error);
        if (error.name === "UserNotFoundException") {
          setErrors({
            emailError: "",
            passwordError: "Incorrect username or password."
          });
        } else {
          setErrors({
            emailError: "",
            passwordError: error.message
          });
        }
        setPassword("");
      }
    }
    setIsLoading(false);
  };

  // event handler to submit the form on key press of enter key
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div style={styles.main}>
      <MentorCard firstName="hello" lastName="tan" company="asdf" role="123" skills={["hello"]} profilePicture="asdf">

      </MentorCard>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.userState.user.data
  };
};

export default connect(mapStateToProps, {
  setUser
})(Login);
