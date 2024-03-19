import React, {
  useState
} from "react";
import {
  Button
} from "@material-ui/core";
import Reviewing from "../../../../assets/2024/produhacks/reviewing.png";
import Waitlist from "../../../../assets/2024/produhacks/waitlisted.png";
import Accepted from "../../../../assets/2024/produhacks/accepted.png";
import Rejected from "../../../../assets/2024/produhacks/rejected.png";
import {
  constantStyles
} from "../../../../constants/_constants/companion";
import {
  COLORS
} from "../../../../constants/_constants/theme";
import CardMembershipIcon from "@material-ui/icons/CardMembership";
import {
  fetchBackend
} from "utils";
import {
  CLIENT_URL,
} from "constants/index";

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
  mailToLink: {
    color: COLORS.WHITE,
    textDecoration: "none",
    "&:hover": {
      color: COLORS.WHITE,
    }
  }

};

const Produhacks2024 = (params) => {
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
      return <img src={Reviewing} alt={"We are currently reviewing your application"} style={renderMobileOnly ? customStyles.backgroundMobile : customStyles.background} />;
    } else if (status === "waitlist") {
      return <img src={Waitlist} alt={"You are currently waitlisted for Produhacks"} style={renderMobileOnly ? customStyles.backgroundMobile : customStyles.background} />;
    } else if (status === "accepted") {
      return <>{userRegistration.registrationStatus === "registered" ? <span style={{
        ...styles.text,
        ...(renderMobileOnly && {
          fontSize: constantStyles.mobileFontSize
        })
      }}>You're all set! Be on the lookout in your email for more details. </span> :
        <div style={customStyles.options}><span style={{
          ...styles.text,
          ...(renderMobileOnly && {
            fontSize: constantStyles.mobileFontSize
          })
        }}>To confirm your acceptance, pay for Produhacks here</span> <Button
          style={customStyles.registerButton}
          variant="contained"
          color="primary"
          type="submit"
          onClick={async () => {
            let isMember;
            try {
              isMember = await fetchBackend(`/users/checkMembership/${userRegistration.id}`, "GET", undefined, false);
            } catch (err) {
              console.log(isMember);
              alert(err);
            }

            const paymentBody = {
              paymentName: `${event.ename} ${isMember || event.pricing?.members === event.pricing?.nonMembers ? "" : "(Non-member)"
              }`,
              paymentImages: [event.imageUrl],
              paymentPrice:
              (isMember
                ? event.pricing?.members
                : event.pricing.nonMembers) * 100,
              paymentType: "Event",
              success_url: `${process.env.REACT_APP_STAGE === "local"
                ? "http://localhost:3000/"
                : CLIENT_URL
              }companion`,
              cancel_url: `${process.env.REACT_APP_STAGE === "local"
                ? "http://localhost:3000/"
                : CLIENT_URL
              }companion`,
              email: userRegistration.id,
              fname: userRegistration.fname,
              eventID: event.id,
              year: event.year
            };
            fetchBackend("/payments", "POST", paymentBody, false)
              .then(async (response) => {
                window.open(response, "_self");
              })
              .catch((err) => {
                alert(
                  `An error has occured: ${err} Please contact an exec for support.`
                );
              });
          }}
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
    } else if (status === "rejected") {
      return <img src={Rejected} alt={"You've withdrawn you're application"} style={renderMobileOnly ? customStyles.backgroundMobile : customStyles.background} />;
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
                    Contact <a href="mailto:jay@ubcbiztech.com" style={customStyles.mailToLink}>jay@ubcbiztech.com</a> for any questions or concerns.
              </div>
            </>
    }
  </div>
  );
};

export default Produhacks2024;

