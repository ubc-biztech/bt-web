import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";

import CssBaseline from "@material-ui/core/CssBaseline";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import { Divider } from "@material-ui/core";
import Container from "@material-ui/core/Container";

import { Auth } from "aws-amplify";
import { setUser } from '../../actions/UserActions'
import { connect } from "react-redux";
import { Helmet } from 'react-helmet';

const styles = {
  left: {
    float: "left"
  },
  socialIcon: {
    marginTop: "5px",
    marginRight: "8px",
    width: "19px"
  }
};

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(10),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
    // backgroundImage: `url(${BackgroundImage})`
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#54D260"
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  root: {
    borderRadius: 12,
    minWidth: 256,
    textAlign: "center",
    padding: '16px'
  },
  header: {
    textAlign: "center",
    spacing: 10
  },
  list: {
    padding: "20px"
  },
  button: {
    margin: theme.spacing(1)
  },
  action: {
    display: "flex",
    justifyContent: "space-around"
  }
}));

function Login(props) {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <Helmet>
        <title>UBC BizTech - Log In or Sign Up</title>
      </Helmet>
      <CssBaseline />
      <div className={classes.paper}>
        <Card className={classes.root} width="400px">

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
          </div>
          <CardHeader title="Sign in" className={classes.header} />
          <Divider variant="middle" />
          <CardContent>
            <Button
              onClick={() => Auth.federatedSignIn({ provider: "Google" })}
              variant="contained"
              color="primary"
            >
              <div style={styles.left}>
                <img
                  style={styles.socialIcon}
                  alt="Google"
                  src="./google.png"
                />
              </div>
              Sign In with Google
            </Button>
          </CardContent>
          <Divider variant="middle" />
        </Card>
      </div>
    </Container>
  );
}

const mapStateToProps = state => {
  return {
    user: state.userState.user,
  };
};

export default connect(mapStateToProps, { setUser })(Login);