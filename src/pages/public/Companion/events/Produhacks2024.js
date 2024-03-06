import React from "react";
import {
  Button
} from "@material-ui/core";
import Reviewing from "../../../../assets/2024/produhacks/reviewing.png";
import Waitlist from "../../../../assets/2024/produhacks/waitlisted.png";
import Accepted from "../../../../assets/2024/produhacks/accepted.png";
import {
  constantStyles
} from "../../../../constants/_constants/companion";
import {
  COLORS
} from "../../../../constants/_constants/theme";
import CardMembershipIcon from "@material-ui/icons/CardMembership";

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
    height: "100%"
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

};

const Produhacks2024 = (params) => {
  const {
    event, registrations, styles, renderMobileOnly, userRegistration
  } = params;

  const renderStatus = () => {
    const status = userRegistration.applicationStatus;
    if (status === "reviewing") {
      return <img src={Reviewing} alt={"We are currently reviewing your application"} style={renderMobileOnly ? customStyles.backgroundMobile : customStyles.background} />;
    } else if (status === "waitlist" || status === "rejected") {
      return <img src={Waitlist} alt={"You are currently waitlisted for Produhacks"} style={renderMobileOnly ? customStyles.backgroundMobile : customStyles.background} />;
    } else if (status === "accepted") {
      return <>{userRegistration.registrationStatus === "registered" ? <span style={{
        ...styles.text,
        ...(renderMobileOnly && {
          fontSize: constantStyles.mobileFontSize
        })
      }}>You're all set! Be on the lookout in your email for more details. </span> :
        userRegistration.checkoutLink && <div style={customStyles.options}><span style={{
          ...styles.text,
          ...(renderMobileOnly && {
            fontSize: constantStyles.mobileFontSize
          })
        }}>To confirm your acceptance, pay for Produhacks here</span> <Button
          style={customStyles.registerButton}
          variant="contained"
          color="primary"
          type="submit"
          onClick={() => window.open(userRegistration.checkoutLink, "_self")}
        >
          <CardMembershipIcon
            style={{
              color: COLORS.BACKGROUND_COLOR,
              marginRight: "5px"
            }}
          />
                        Proceed to Payment!
        </Button></div>
      }
      <img src={Accepted} alt={"You are been accepted into Produhacks!"} style={renderMobileOnly ? customStyles.backgroundMobile : customStyles.background} /></>;
    }
  };

  return (<div style={customStyles.container}>
    {event && registrations &&
            <>
              {renderStatus()}
              <div style={{
                ...styles.text,
                width: "100%",
                marginBottom: "0px",
                ...(renderMobileOnly && {
                  fontSize: constantStyles.mobileFontSize
                })
              }}>
                    Contact <a href="mailto:jay@ubcbiztech.com" style={styles.link}>jay@ubcbiztech.com</a> for any questions or concerns.
              </div>
            </>
    }
  </div>
  );
};

export default Produhacks2024;

