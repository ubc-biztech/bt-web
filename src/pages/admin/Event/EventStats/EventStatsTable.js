import React, { useState, Component, useEffect } from "react";

import MaterialTable from "material-table";
import {
  RadialChart,
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalBarSeries,
} from "react-vis";

import {
  MenuItem,
  Paper,
  Select,
  Typography,
  makeStyles,
  Link
} from "@material-ui/core";

import { Alert } from "@material-ui/lab";
import QrReader from "react-web-qr-reader";

import {
  REGISTRATION_STATUS,
  REGISTRATION_LABELS,
  COLORS,
} from "constants/index";
import { fetchBackend } from "utils";
import {
  parseRegistrationResponses,
  combineEventAndRegistrationData,
  appendRegistrationQuestions,
} from "./utils";

const styles = {
  stats: {
    width: "100%",
    display: "flex",
    margin: "6px",
    cursor: "pointer",
  },
  stat: {
    margin: "10px",
  },
  container: {
    marginRight: "30px",
    "& .MuiTable-root": {
      position: "sticky",
    },
    width: "100%",
    height: "calc(100vh - 32px)",
    overflow: "auto",
  },
  table: {
    display: "grid",
  },
  qrCodeVideo: {
    width: "300px",
    height: "300px",
  },
  toggleQrScanner: {
    fontSize: "1.5rem",
    fontWeight: "bold",
  }
};

/**
 * Class component that displays event user table populated from the backend
 * When a user check-in status is changed, the backend is updated and it fetches new data
 */
export class EventStatsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: {},
      registrationNumbers: {},
      faculties: {},
      years: {},
      dietary: {},
      genders: {},
      heardFrom: {},
      registrationResponses: {},
      registrationVisible: { visible: false, style: { display: "none" } },
      facultyVisible: { visible: false, style: { display: "none" } },
      yearVisible: { visible: false, style: { display: "none" } },
      dietaryVisible: { visible: false, style: { display: "none" } },
      gendersVisible: { visible: false, style: { display: "none" } },
      heardFromVisible: { visible: false, style: { display: "none" } },
    };
  }

  async updateUserRegistrationStatus(id, registrationStatus) {
    const body = {
      eventID: this.props.event.id,
      year: this.props.event.year,
      registrationStatus,
    };
    await fetchBackend(`/registrations/${id}`, "PUT", body);

    this.getEventTableData(this.props.event.id, this.props.event.year);
  }

  /* updates stats and the rows in the table
     faculty, gender, dietary, and year stats are only computed on the initial render of the component
     # of registered/checkedin etc. is computed every single time this function is called
  */
  async getEventTableData(eventID, eventYear) {
    let params = new URLSearchParams({
      eventID: eventID,
      year: eventYear,
    });
    await fetchBackend(`/registrations?${params}`, "GET")
      .then((response) => {
        const registrationResponses = parseRegistrationResponses(response);

        const heardFrom = {};
        response.data.forEach((user) => {
          if (user.heardFrom) {
            heardFrom[user.heardFrom] = heardFrom[user.heardFrom]
              ? heardFrom[user.heardFrom] + 1
              : 1;
          }
        });
        this.setState({
          heardFrom,
          registrationResponses,
        });
      })
      .catch((err) => {
        console.log("No registrations for this event");
      });

    params = new URLSearchParams({
      users: true,
    });
    await fetchBackend(
      `/events/${eventID}/${eventYear.toString()}?${params}`,
      "GET"
    )
      .then((users) => {
        this.registrationNumbers(users);
        this.notRegistrationNumbers(users);
        this.setRows(users);
      })
      .catch((error) => {
        console.log(error);
      });

    await fetchBackend(
      `/events/${eventID}/${eventYear.toString()}`,
      "GET"
    ).then(async (event) => {
      this.setColumns(event.registrationQuestions);
    });
  }

  /**
   *
   * @param {array of users} users
   * calculates the stats for registration and updates the data for charts
   * each data set is an array of data (arrays) sets b/c different charts accept different data
   */

  registrationNumbers(users) {
    const registrationNumbers = {};
    users.forEach((user) => {
      if (user.registrationStatus) {
        registrationNumbers[user.registrationStatus] = registrationNumbers[
          user.registrationStatus
        ]
          ? registrationNumbers[user.registrationStatus] + 1
          : 1;
      }
    });

    this.setState({
      registrationNumbers,
    });
  }

  /**
   *
   * @param {array of users} users
   * calculates any stats that aren't registration stats
   * each data set is an array of data (arrays) sets b/c different charts accept different data
   */
  notRegistrationNumbers(users) {
    const faculties = {};
    const years = {};
    const dietary = {};
    const genders = {};
    users.forEach((user) => {
      if (user.faculty) {
        faculties[user.faculty] = faculties[user.faculty]
          ? faculties[user.faculty] + 1
          : 1;
      }
      if (user.year) {
        const yearInt = parseInt(user.year);
        if (yearInt) {
          years[yearInt] = years[yearInt] ? years[yearInt] + 1 : 1;
        }
      }
      if (user.diet) {
        dietary[user.diet] = dietary[user.diet] ? dietary[user.diet] + 1 : 1;
      }
      if (user.gender) {
        genders[user.gender] = genders[user.gender]
          ? genders[user.gender] + 1
          : 1;
      }
    });

    this.setState({
      faculties,
      years,
      genders,
      dietary,
    });
  }

  /**
   * Prepares the row data for the eventStatsTable by combining events backend user data with the
   * registration responses
   * @param {*} users the response from the events backend
   */
  setRows(users) {
    const data = combineEventAndRegistrationData(
      users,
      this.state.registrationResponses
    );

    this.setState({
      rows: data,
    });
  }

  /**
   * Populates the column headers for the eventStatsTable with registration questions
   * @param {*} registrationQuestions an array of registration questions
   */
  setColumns(registrationQuestions) {
    const columns = [];

    appendRegistrationQuestions(columns, registrationQuestions);

    this.setState({
      columns,
    });
  }

  async updateEventTableData(eventID) {
    const params = new URLSearchParams({
      users: true,
    });

    await fetchBackend(`/events/${eventID}?${params}`, "GET").then(
      async (users) => {
        this.registrationNumbers(users);
      }
    );
  }

  componentDidMount() {
    this.getEventTableData(this.props.event.id, this.props.event.year);
  }

  /*
    the if statement is only used if an exec goes from one event directly to another event (not implemented right now)
  */
  componentDidUpdate(prevProps) {
    if (prevProps.event.id !== this.props.event.id) {
      this.updateEventTableData(this.props.event.id);
    }
  }

  render() {
    /**
     * Helper function to determine whether to display action for check-in or undo check-in
     * @param {*} rowData data about the current row
     */
    const changeRegistration = (event, rowData) => {
      // TODO: refactor code smell
      switch (event.target.value) {
        case REGISTRATION_STATUS.REGISTERED:
          if (
            window.confirm(
              `Do you want to register ${rowData.fname} ${rowData.lname}?\nThis will send an email to the user.`
            )
          ) {
            this.updateUserRegistrationStatus(
              rowData.id,
              REGISTRATION_STATUS.REGISTERED
            );
          }
          break;
        case REGISTRATION_STATUS.CHECKED_IN:
          if (
            window.confirm(
              `Do you want to check in ${rowData.fname} ${rowData.lname}?\nThis will NOT send an email to the user.`
            )
          ) {
            this.updateUserRegistrationStatus(
              rowData.id,
              REGISTRATION_STATUS.CHECKED_IN
            );
          }
          break;
        case REGISTRATION_STATUS.WAITLISTED:
          if (
            window.confirm(
              `Do you want to waitlist ${rowData.fname} ${rowData.lname}?\nThis will send an email to the user.`
            )
          ) {
            this.updateUserRegistrationStatus(
              rowData.id,
              REGISTRATION_STATUS.WAITLISTED
            );
          }
          break;
        case REGISTRATION_STATUS.CANCELLED:
          if (
            window.confirm(
              `Did ${rowData.fname} ${rowData.lname} cancel?\nThis will send an email to the user.`
            )
          ) {
            this.updateUserRegistrationStatus(
              rowData.id,
              REGISTRATION_STATUS.CANCELLED
            );
          }
          break;
        default:
          return {};
      }
    };

    const defaultColumns = [
      { title: "First Name", field: "fname" },
      { title: "Last Name", field: "lname" },
      {
        title: "Student Number",
        field: "studentId",
        type: "numeric",
        sorting: false,
      },
      { title: "Email", field: "id", sorting: false },
      {
        title: "Registration Status",
        field: "registrationStatus",
        sorting: false,
        render: (rowData) => (
          <div>
            <Select
              value={rowData.registrationStatus}
              onClick={(event) => changeRegistration(event, rowData)}
              style={{
                backgroundColor:
                  rowData.registrationStatus === REGISTRATION_STATUS.CHECKED_IN
                    ? COLORS.LIGHT_GREEN
                    : rowData.registrationStatus ===
                      REGISTRATION_STATUS.WAITLISTED
                    ? COLORS.LIGHT_YELLOW
                    : rowData.registrationStatus ===
                      REGISTRATION_STATUS.CANCELLED
                    ? COLORS.LIGHT_RED
                    : COLORS.LIGHT_BACKGROUND_COLOR,
                paddingLeft: "10px",
              }}
            >
              <MenuItem value={REGISTRATION_STATUS.WAITLISTED}>
                Waitlisted
              </MenuItem>
              <MenuItem value={REGISTRATION_STATUS.CHECKED_IN}>
                Checked in
              </MenuItem>
              <MenuItem value={REGISTRATION_STATUS.REGISTERED}>
                Registered
              </MenuItem>
              <MenuItem value={REGISTRATION_STATUS.CANCELLED}>
                Cancelled
              </MenuItem>
            </Select>
          </div>
        ),
      },
    ];

    const registrationColumns = defaultColumns.concat(this.state.columns);

    /**
     * Creates stats + graphs/charts
     * Creates event table using MaterialTable library
     */
    return (
      <div style={styles.container}>
        {/* QR code scanner */}
        <QrCheckIn
          event={this.props.event}
        />
        <Statistic
          statName="Registration status: "
          statObj={this.state.registrationNumbers}
        />
        <Statistic statName="Faculty: " statObj={this.state.faculties} />
        <Statistic statName="Year level: " statObj={this.state.years} />
        {/* <Statistic statName='Dietary: ' statObj={this.state.dietary} /> */}
        <Statistic statName="Gender: " statObj={this.state.genders} />
        <Statistic
          statName="Heard about event from: "
          statObj={this.state.heardFrom}
        />

        <MaterialTable
          title={`${this.props.event.ename} Attendance`}
          columns={registrationColumns}
          data={this.state.rows}
          // Configure options for the table
          style={styles.table}
          options={{
            search: true,
            draggable: false,
            padding: "dense",
            pageSize: 25,
            pageSizeOptions: [25, 50, 100, 200],
            actionsColumnIndex: 5,
            exportButton: true,
            headerStyle: {
              fontWeight: "bold",
              backgroundColor: COLORS.CARD_PAPER_COLOR,
              color: COLORS.FONT_COLOR,
            },
            rowStyle: (rowData) => ({}),
          }}
          localization={{
            body: {
              emptyDataSourceMessage: (
                <h2
                  style={{
                    color: COLORS.WHITE,
                  }}
                >
                  No attendees to display.
                </h2>
              ),
            },
          }}
        />
      </div>
    );
  }
}

const useStyles = makeStyles((theme) => ({
  paperRoot: {
    borderRadius: "4px",
    marginBottom: "5px",
  },
  qrRoot: {
    borderRadius: "4px",
    padding: "10px",
  },
  qrOutput: {
    marginTop: "10px",
    marginBottom: "10px",
    textAlign: "center",
  },
}));

/**
 * represents a statistic and shows a row of the stats with a dropdown for charts
 */
const Statistic = (props) => {
  const classes = useStyles();
  const [visible, setVisible] = useState(false);

  const chartData = [
    Object.keys(props.statObj).map((key) => {
      return {
        label: key,
        angle: props.statObj[key],
      };
    }),
    Object.keys(props.statObj).map((key) => {
      return {
        x: key,
        y: props.statObj[key],
      };
    }),
  ];

  return (
    <Paper className={classes.paperRoot}>
      <div style={styles.stats} onClick={() => setVisible(!visible)}>
        <Typography style={styles.stat}>{props.statName} </Typography>
        {Object.keys(props.statObj).map((key) => (
          <Typography key={key} style={styles.stat}>
            {key in REGISTRATION_LABELS ? REGISTRATION_LABELS[key] : key}:{" "}
            {props.statObj[key]}
          </Typography>
        ))}
        {props.statName === "Registration status: " ? (
          <Typography style={styles.stat}>
            Total:{" "}
            {Object.values(props.statObj).reduce(
              (total, amount) => total + amount,
              0
            )}
          </Typography>
        ) : (
          <Typography />
        )}
      </div>
      <div
        style={
          visible
            ? { display: "flex", paddingBottom: "20px", paddingLeft: "50px" }
            : { display: "none" }
        }
      >
        <RadialChart
          width={300}
          height={300}
          data={chartData[0]}
          showLabels={true}
          radius={140}
          innerRadius={100}
        />
        <XYPlot
          margin={{ left: 40, right: 30, top: 30, bottom: 70 }}
          xType="ordinal"
          width={300}
          height={300}
        >
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis tickLabelAngle={-45} />
          <YAxis />
          <VerticalBarSeries width={300} height={300} data={chartData[1]} />
        </XYPlot>
      </div>
    </Paper>
  );
};

// an enumeration for the stages of QR code scanning
const QR_SCAN_STAGE = {
  SCANNING: "SCANNING",
  FAILED: "FAILED",
  SUCCESS: "SUCCESS"
}

// facing mode for the camera
const CAMERA_FACING_MODE = {
  FRONT: "user",
  BACK: "environment"
}

const QrCheckIn = (props) => {
  const classes = useStyles();
  const [visible, setVisible] = useState(false);
  const defaultQrCode = {data: ""};
  const [qrCode, setQrCode] = useState(defaultQrCode);
  const [qrScanStage, setQrScanStage] = useState(QR_SCAN_STAGE.SCANNING);
  const [cameraFacingMode, setCameraFacingMode] = useState(CAMERA_FACING_MODE.BACK);
  const [checkInName, setCheckInName] = useState("");

  const flipCamera = () => {
    if (cameraFacingMode === CAMERA_FACING_MODE.FRONT) {
      setCameraFacingMode(CAMERA_FACING_MODE.BACK);
    } else {
      setCameraFacingMode(CAMERA_FACING_MODE.FRONT);
    }
  }

  const handleScanQR = (data) => {
    // conditional check is necessary to prevent re-scans of the same QR code
    if (data !== qrCode) setQrCode(data);
  }

  // checks if the QR code is valid whenever the QR code is changed
  useEffect(() => {
    if (!qrCode || qrCode.data === "") return;
    const id = qrCode.data;
    const userID = id.split(';')[0];
    const eventIDAndYear = id.split(';')[1] + ';' + id.split(';')[2];

    // validate event ID and year
    if (eventIDAndYear !== props.event.id + ';' + props.event.year) {
      // TODO: better error handling needed
      setQrScanStage(QR_SCAN_STAGE.FAILED);
      return;
    }

    const checkInUser = (id) => {
      const body = {
        eventID: props.event.id,
        year: props.event.year,
        registrationStatus: REGISTRATION_STATUS.CHECKED_IN
      };
  
      // update the registration status of the user to checked in
      fetchBackend(`/registrations/${id}`, "PUT", body);
  
      // get the person's name
      let params = new URLSearchParams({
        users: true,
      });
  
      fetchBackend(
        `/events/${props.event.id}/${props.event.year.toString()}?${params}`,
        "GET"
      )
        .then((users) => {
          // filter the users to get the one with the same id
          const user = users.filter((user) => user.id === id)[0];
          setCheckInName(`${user.fname} ${user.lname} (${id})`);
        })
        .catch((error) => {
          console.log(error);
        });
  
      setQrScanStage(QR_SCAN_STAGE.SUCCESS);
      setQrCode(defaultQrCode);
      // wait 10 seconds, then reset the scan stage
      // NOTE: the alert will reset in 10 seconds no matter what, so don't scan too fast
      setTimeout(() => {
        if (qrScanStage === QR_SCAN_STAGE.SUCCESS || qrScanStage === QR_SCAN_STAGE.SCANNING) {
          setQrScanStage(QR_SCAN_STAGE.SCANNING);
        }
      }, 10000);
    }

    checkInUser(userID);
  }, [qrCode, defaultQrCode, props.event.id, props.event.year, qrScanStage]);

  return (
    <Paper className={[classes.qrRoot]}>
        {/* Toggle QR Scanner */}
        <Link onClick={() => setVisible(!visible)} style={styles.toggleQrScanner}>
          Toggle QR Scanner for Check-In
        </Link>
        {visible && (
          <div className={classes.qrOutput}>
            {/* Manually reset scanner */}
            <Link onClick={() => {
              setQrCode(defaultQrCode); 
              setQrScanStage(QR_SCAN_STAGE.SCANNING)
            }}>
              Manually Reset Scanner
            </Link>

            <Link> | </Link>

            {/* Flip camera */}
            <Link onClick={() => flipCamera()}>
              Switch Camera
            </Link>

            <Alert variant="filled"
              severity={
                qrScanStage === QR_SCAN_STAGE.SUCCESS ? "success" : 
                qrScanStage === QR_SCAN_STAGE.SCANNING ? "info" :
                "error"
              }>
              {qrScanStage === QR_SCAN_STAGE.SUCCESS ? (
                `Checked-in successfully for ${checkInName}! To see the updated attendance, refresh the page.`) : 
                qrScanStage === QR_SCAN_STAGE.SCANNING ? (
                "Ready to scan a QR code to check-in. 😎") :
                "Invalid QR code. Please try again."
              }
            </Alert>

            <QrReader
              style={styles.qrCodeVideo}
              onScan={handleScanQR}
              facingMode={cameraFacingMode} />
          </div>
        )}
    </Paper>
  );
}

export default EventStatsTable;
