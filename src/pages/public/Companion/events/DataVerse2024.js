import React, {
  useState, useEffect
} from "react";
import {
  Button, TextField, Typography
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
import Quiz from "../components/Quiz"; // Import the new Quiz component

const customStyles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    gap: "10px",
  },
  accessKeyContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
    margin: "20px 0",
  },
  registerButton: {
    textTransform: "none",
    backgroundColor: COLORS.BIZTECH_GREEN,
    color: COLORS.BACKGROUND_COLOR,
    "&:disabled": {
      backgroundColor: COLORS.FONT_GRAY,
      color: COLORS.WHITE,
    },
  },
};

const DataVerse2024 = (params) => {
  const {
    event, registrations, styles, renderMobileOnly, userRegistration
  } = params;
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [accessKey, setAccessKey] = useState("");
  const [isAccessGranted, setIsAccessGranted] = useState(false);
  const [teamData, setTeamData] = useState(null);
  const [teamPoints, setTeamPoints] = useState(null);

  useEffect(() => {
    if (isAccessGranted && userRegistration) {
      fetchTeamData();
    }
  }, [isAccessGranted, userRegistration]);

  const handleAccessKeySubmit = () => {
    if (accessKey === "access") { // Key placeholder
      setIsAccessGranted(true);
      alert("Access granted!");
    } else {
      alert("Invalid access key.");
    }
  };

  const fetchTeamData = async () => {
    await fetchBackend("/team/getTeamFromUserID", "post", {
      eventID: "dataverse",
      year: 2024,
      user_id: userRegistration.id,
    }, false)
      .then(async (response) => {
        console.log(response);
        setTeamData(response.response);
        setTeamPoints(response.response.points);
      })
      .catch((err) => {
        console.log(`Unable to fetch team data for user ${userRegistration.id}`);
        console.log("Error:", err);
      });
  };

  const withdrawApplication = async () => {
    try {
      const body = {
        eventID: event.id,
        year: Number(event.year),
        registrationStatus: "cancelled",
        applicationStatus: "rejected",
      };
      setIsWithdrawing(true);
      const isConfirmed = confirm(
        "Are you sure? Once you've withdrawn you cannot resubmit your application"
      );
      if (isConfirmed) {
        const result = await fetchBackend(
          `/registrations/${userRegistration.id}/${userRegistration.fname}`,
          "PUT",
          body,
          false
        );
        if (result) {
          console.log(result);
          setIsWithdrawing(false);
          location.reload();
        }
      } else {
        setIsWithdrawing(false);
      }
    } catch (e) {
      alert("An error has occurred");
      console.log(e);
      setIsWithdrawing(false);
    }
  };

  return (
    <div style={customStyles.container}>
      {isAccessGranted ? (
        <>
          {teamData && teamPoints !== null && (
            <>
              <Typography variant="h6" style={{
                marginBottom: "10px"
              }}>
                Your Team Is: {teamData.teamName}
              </Typography>
              <Typography variant="h6" style={{
                marginBottom: "20px"
              }}>
                Current Points: {teamPoints}
              </Typography>
            </>
          )}

          <Quiz />
        </>
      ) : (
        <>
          <div style={customStyles.accessKeyContainer}>
            <TextField
              label="Enter Access Key"
              variant="outlined"
              value={accessKey}
              onChange={(e) => setAccessKey(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAccessKeySubmit}
            >
              Submit Access Key
            </Button>
          </div>

          {userRegistration.applicationStatus !== "rejected" && (
            <span
              style={{
                ...styles.text,
                ...(renderMobileOnly && {
                  fontSize: constantStyles.mobileFontSize,
                }),
              }}
            >
              Want to withdraw your application?
              <Button
                style={{
                  ...customStyles.registerButton,
                  marginLeft: "5px",
                }}
                variant="contained"
                color="primary"
                type="submit"
                onClick={() => withdrawApplication()}
                disabled={isWithdrawing}
              >
                Click here
              </Button>
            </span>
          )}

          <div
            style={{
              ...styles.text,
              width: "100%",
              marginBottom: "0px",
              ...(renderMobileOnly && {
                fontSize: constantStyles.mobileFontSize,
              }),
            }}
          >
            Contact{" "}
            <a
              href="mailto:emily@ubcbiztech.com"
              style={customStyles.mailToLink}
            >
              emily@ubcbiztech.com
            </a>{" "}
            for any questions or concerns.
          </div>
        </>
      )}
    </div>
  );
};

export default DataVerse2024;
