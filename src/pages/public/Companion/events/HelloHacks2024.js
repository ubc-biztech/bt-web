import React, {
  useState
} from "react";
import {
  Button
} from "@material-ui/core";
import {
  constantStyles
} from "../../../../constants/_constants/companion";
import {
  COLORS
} from "../../../../constants/_constants/theme";
import {
  fetchBackend
} from "utils";

const customStyles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    gap: "5px"
  },
  options: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    width: "100%",
    marginBottom: "15px"
  },
  footer: {
    left: "-10px",
    width: "120%",
    right: "-10px",
    bottom: "0"
  },
  background: {
    width: "120%",
    height: "100%"
  },
  backgroundMobile: {
    width: "150%",
    height: "100%",
  },
  registerButton: {
    textTransform: "none",
    backgroundColor: COLORS.BIZTECH_GREEN,
    color: COLORS.BACKGROUND_COLOR,
    "&:disabled": {
      backgroundColor: COLORS.FONT_GRAY,
      color: COLORS.WHITE
    }
  },
  mailToLink: {
    color: COLORS.WHITE,
    textDecoration: "none",
    "&:hover": {
      color: COLORS.WHITE,
    }
  }

};

const HelloHacks2024 = (params) => {
  const {
    event, registrations, styles, renderMobileOnly, userRegistration
  } = params;
  const [isWithdrawing, setIsWithdrawing] = useState(false);

  const withdrawApplication = async () => {
    try {
      const body = {
        eventID: event.id,
        year: Number(event.year),
        registrationStatus: "cancelled",
        applicationStatus: "rejected"
      };
      setIsWithdrawing(true);
      const isConfirmed = confirm("Are you sure? Once you've withdrawn you cannot resubmit your application");
      if (isConfirmed) {
        const result = await fetchBackend(`/registrations/${userRegistration.id}/${userRegistration.fname}`, "PUT", body, false);
        if (result) {
          console.log(result);
          setIsWithdrawing(false);
          location.reload();
        }
      } else {
        setIsWithdrawing(false);
      }
    } catch (e) {
      alert("an error has occured");
      console.log(e);
      setIsWithdrawing(false);
    }
  };


  const renderStatus = () => {
    const status = userRegistration.applicationStatus;
    if (status === "reviewing") {
      return (
        <div style={{
          color: "white"
        }}>
          <h1>Your application is in review, please check back for more details!</h1>
        </div>
      );
    } else if (status === "waitlist") {
      return (
        <div style={{
          color: "white"
        }}>
          <h1>Your application is currently waitlisted, you will be contacted if spots open up!</h1>
        </div>
      );
    } else if (status === "accepted") {
      return (
        <div style={{
          color: "white"
        }}>
          <h1>You have been accepted! Stay tuned for more details :)</h1>
        </div>
      );
    } else if (status === "rejected") {
      return (
        <div style={{
          color: "white"
        }}>
          <h1>Your application is withdrawn, we're sad to see you go :(</h1>
        </div>
      );
    }
  };

  return (<div style={customStyles.container}>
    {event && registrations &&
              <>
                {renderStatus()}
                {userRegistration.applicationStatus !== "rejected" && <span style={{
                  ...styles.text,
                  ...(renderMobileOnly && {
                    fontSize: constantStyles.mobileFontSize
                  })
                }}>Want to withdraw your application?<Button
                    style={{
                      ...customStyles.registerButton,
                      marginLeft: "5px"
                    }}
                    variant="contained"
                    color="primary"
                    type="submit"
                    onClick={() => withdrawApplication()}
                    disabled={isWithdrawing}
                  >
                          Click here
                  </Button></span>}
                <div style={{
                  ...styles.text,
                  width: "100%",
                  marginBottom: "0px",
                  ...(renderMobileOnly && {
                    fontSize: constantStyles.mobileFontSize
                  })
                }}>
                      Contact <a href="mailto:pauline@ubcbiztech.com" style={customStyles.mailToLink}>pauline@ubcbiztech.com</a> for any questions or concerns.
                </div>
              </>
    }
  </div>
  );
};

export default HelloHacks2024;

