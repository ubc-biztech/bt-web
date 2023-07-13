import React, {
  useState, Fragment
} from "react";
import {
  Helmet
} from "react-helmet";
import {
  makeStyles
} from "@material-ui/core/styles";
import {
  Typography, Button
} from "@material-ui/core";
import MembershipForm from "./MembershipForm/index";
import UserMembershipForm from "./UserMembershipForm/index";
import OAuthUserMembershipForm from "./OAuthUserMembershipForm/index";
import {
  useParams
} from "react-router-dom";

import {
  COLORS
} from "../../../constants/_constants/theme";
import House from "assets/house.svg";
import Login from "assets/login.svg";

const useStyles = makeStyles((theme) => ({
  selectButton: {
    width: 400,
    height: "fit-content",
    color: "white",
    backgroundColor: "#061433",
    border: "4px solid #545966",
    borderRadius: 12,
    "&:hover": {
      backgroundColor: "#112d6b"
    },
    textTransform: "none"
  },
  layout: {
    [theme.breakpoints.up("sm")]: {
      width: 850,
      margin: "auto"
    }
  },
  paper: {
    [theme.breakpoints.up("sm")]: {
      margin: theme.spacing(3)
    }
  },
  content: {
    padding: theme.spacing(3)
  },
  registrationHeader: {
    borderLeft: `2px solid ${COLORS.BIZTECH_GREEN}`,
    marginTop: "35px",
    paddingLeft: "19px",
    marginLeft: "11px"
  },
  registrationText: {
    fontWeight: "bold",
    fontSize: "24px"
  },
  options: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "15%",
    marginBottom: "25%"
  },
  loginIcon: {
    height: 209,
    width: 209
  }
}));

const RegistrationFormContainer = (props) => {
  const classes = useStyles();

  const [formType, setFormType] = useState("");

  const {
    user
  } = props;

  const {
    isOAuth: OAuthFlag
  } = useParams();

  // const testing = false;

  if (OAuthFlag) {
    return <OAuthUserMembershipForm />;
  } else {
    return (
      <Fragment>
        {!user && (
          <div className={classes.layout}>
            <Helmet>
              <title>UBC BizTech Registration 2023/24</title>
            </Helmet>
            {formType === "" && (
              <Fragment>
                <Typography className={classes.registrationText}>
                  Please choose the option that is applicable to you.
                </Typography>
                <div className={classes.options}>
                  {!user && (
                    <Button
                      color="primary"
                      className={classes.selectButton}
                      onClick={() => setFormType("UserMember")}
                    >
                      <div style={{
                        flexDirection: "column"
                      }}>
                        <Typography>
                          User + Membership 2023/24 Registration
                        </Typography>
                        <img src={House} alt="not-found" />
                        <Typography>
                          I am not a user yet and want to make my account and
                          membership all at once!
                        </Typography>
                      </div>
                    </Button>
                  )}
                  <Button
                    color="primary"
                    className={classes.selectButton}
                    onClick={() => setFormType("Member")}
                  >
                    <div style={{
                      flexDirection: "column"
                    }}>
                      <Typography>Membership 2023/24 Registration</Typography>
                      <img
                        src={Login}
                        alt="not-found"
                        className={classes.loginIcon}
                      />
                      <Typography>
                        I am a user already and am here to sign up or renew my
                        membership status!
                      </Typography>
                    </div>
                  </Button>
                </div>
              </Fragment>
            )}
          </div>
        )}
        {formType === "UserMember" && <UserMembershipForm />}
        {((formType === "Member" && !OAuthFlag) || user) && <MembershipForm />}
      </Fragment>
    );
  }
};

export default RegistrationFormContainer;
