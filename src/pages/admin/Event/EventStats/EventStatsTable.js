import React, { useState, Component, useEffect } from "react";
import QRIcon from "../../../../components/icons/qr-icon.png";

import MaterialTable, { MTableCell } from "material-table";
import {
  RadialChart,
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalBarSeries
} from "react-vis";

import {
  MenuItem,
  Paper,
  Select,
  Typography,
  makeStyles,
  Link,
  Button,
  Popover
} from "@material-ui/core";

import { Alert } from "@material-ui/lab";
import QrReader from "react-web-qr-reader";

import {
  REGISTRATION_STATUS,
  REGISTRATION_LABELS,
  COLORS
} from "constants/index";
import { fetchBackend } from "utils";
import {
  REGISTRATIONSTATUSLABEL,
  combineEventAndRegistrationData,
  appendRegistrationQuestions
} from "./utils";
import DraggableTitle from "./DraggableTitle";

const styles = {
  stats: {
    width: "100%",
    display: "flex",
    margin: "6px",
    cursor: "pointer"
  },
  stat: {
    margin: "10px"
  },
  container: {
    marginRight: "30px",
    "& .MuiTable-root": {
      position: "sticky"
    },
    width: "100%",
    height: "calc(100vh - 32px)",
    overflow: "auto"
  },
  table: {
    display: "grid",
    overflowX: "auto"
  },
  qrCodeVideo: {
    width: "300px",
    height: "300px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  toggleQrScanner: {
    fontSize: "1.5rem",
    fontWeight: "bold"
  },
  qrIcon: {
    width: "20px",
    height: "20px",
    display: "flex-inline",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "4px",
    paddingLeft: "2px",
    paddingRight: "2px"
  },
  ellipsis: {
    maxWidth: 200,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  toggleContainer: {
    display: "flex",
    justifyContent: "left",
    alignItems: "bottom"
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
      presentedColumns: [],
      registrationNumbers: {},
      faculties: {},
      years: {},
      dietary: {},
      genders: {},
      heardFrom: {},
      isWaitlistShown: false,
      registrationVisible: { visible: false, style: { display: "none" } },
      facultyVisible: { visible: false, style: { display: "none" } },
      yearVisible: { visible: false, style: { display: "none" } },
      dietaryVisible: { visible: false, style: { display: "none" } },
      gendersVisible: { visible: false, style: { display: "none" } },
      heardFromVisible: { visible: false, style: { display: "none" } }
    };
  }

  async updateUserRegistrationStatus(id, registrationStatus) {
    const body = {
      eventID: this.props.event.id,
      year: this.props.event.year,
      registrationStatus
    };
    await fetchBackend(`/registrations/${id}`, "PUT", body);

    this.refreshTable();
  }

  refreshTable = () => {
    this.getEventTableData(this.props.event.id, this.props.event.year);
  };

  /* updates stats and the rows in the table
     faculty, gender, dietary, and year stats are only computed on the initial render of the component
     # of registered/checkedin etc. is computed every single time this function is called
  */
  async getEventTableData(eventID, eventYear) {
    const params = new URLSearchParams({
      eventID: eventID,
      year: eventYear
    });
    await fetchBackend(
      `/events/${eventID}/${eventYear.toString()}`,
      "GET"
    ).then(async (event) => {
      this.setColumns(event.registrationQuestions);
    });
    await fetchBackend(`/registrations?${params}`, "GET")
      .then((response) => {
        this.heardFromNumbers(response.data);
        this.registrationNumbers(response.data);
        this.notRegistrationNumbers(response.data);
        this.setRows(response.data);
      })
      .catch((err) => {
        console.log("No registrations for this event");
      });
  }

  /**
   *
   * @param {array of users} users
   * calculates the stats for registration and updates the data for charts
   * each data set is an array of data (arrays) sets b/c different charts accept different data
   */

  heardFromNumbers(users) {
    const heardFrom = {};
    users.forEach((user) => {
      if (user.basicInformation.heardFrom) {
        heardFrom[user.basicInformation.heardFrom] = heardFrom[
          user.basicInformation.heardFrom
        ]
          ? heardFrom[user.basicInformation.heardFrom] + 1
          : 1;
      }
    });

    this.setState({
      heardFrom
    });
  }

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
      registrationNumbers
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
      if (user.basicInformation.faculty) {
        faculties[user.basicInformation.faculty] = faculties[
          user.basicInformation.faculty
        ]
          ? faculties[user.basicInformation.faculty] + 1
          : 1;
      }
      if (user.basicInformation.year) {
        const yearInt = parseInt(user.basicInformation.year);
        if (yearInt) {
          years[yearInt] = years[yearInt] ? years[yearInt] + 1 : 1;
        }
      }
      if (user.basicInformation.diet) {
        dietary[user.basicInformation.diet] = dietary[
          user.basicInformation.diet
        ]
          ? dietary[user.basicInformation.diet] + 1
          : 1;
      }
      if (user.basicInformation.gender) {
        genders[user.basicInformation.gender] = genders[
          user.basicInformation.gender
        ]
          ? genders[user.basicInformation.gender] + 1
          : 1;
      }
    });

    this.setState({
      faculties,
      years,
      genders,
      dietary
    });
  }

  /**
   * Prepares the row data for the eventStatsTable by combining events backend user data with the
   * registration responses
   * @param {*} users the response from the events backend
   */
  setRows(users) {
    const data = combineEventAndRegistrationData(users);

    this.setState({
      rows: data
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
      columns
    });

    let presentedColumns = this.state.presentedColumns;

    this.setState({
      presentedColumns: presentedColumns.concat(columns)
    })
  }

  async updateEventTableData(eventID) {
    const params = new URLSearchParams({
      users: true
    });

    await fetchBackend(`/events/${eventID}?${params}`, "GET").then(
      async (users) => {
        this.registrationNumbers(users);
      }
    );
  }

  showWaitlist = () => {
    this.setState({
      isWaitlistShown: !this.state.isWaitlistShown
    });
  };

  componentDidMount() {
    this.refreshTable();
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
      {
        title: <DraggableTitle title="Registration Status" />,
        field: REGISTRATIONSTATUSLABEL,
        cellStyle: { whiteSpace: "nowrap" },
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
                paddingLeft: "10px"
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
        )
      },
      {
        title: <DraggableTitle title="First Name" />,
        field: "fname",
        cellStyle: { whiteSpace: "nowrap" },
        render: (rowData) => (
          <div>
            {rowData.fname}
          </div>
        )
      },
      {
        title: <DraggableTitle title="Last Name" />,
        field: "lname",
        cellStyle: { whiteSpace: "nowrap" },
        render: (rowData) => (
          <div>
            {rowData.lname}
          </div>
        )
      },
      {
        title: <DraggableTitle title="Email" />,
        field: "id",
        cellStyle: { whiteSpace: "nowrap" },
        render: (rowData) => (
          <div>
            {rowData.id}
          </div>
        )
      },
      {
        title: <DraggableTitle title="Last Updated" />,
        field: "updatedAt",
        cellStyle: { whiteSpace: "nowrap" },
        render: (rowData) => (
          <div>
            {rowData.updatedAt}
          </div>
        )
      },
      {
        title: <DraggableTitle title="Diet" />,
        field: "diet",
        cellStyle: { whiteSpace: "nowrap" },
        render: (rowData) => (
          <div>
            {rowData.diet}
          </div>
        )
      },
      {
        title: <DraggableTitle title="Student Number" />,
        field: "studentId",
        cellStyle: { whiteSpace: "nowrap" },
        render: (rowData) => (
          <div>
            {rowData.studentId}
          </div>
        )
      },
      {
        title: <DraggableTitle title="Faculty" />,
        field: "faculty",
        cellStyle: { whiteSpace: "nowrap" },
        render: (rowData) => (
          <div>
            {rowData.faculty}
          </div>
        )
      },
      {
        title: <DraggableTitle title="Year Level" />,
        field: "year",
        cellStyle: { whiteSpace: "nowrap" },
        render: (rowData) => (
          <div>
            {rowData.year}
          </div>
        )
      },
      {
        title: <DraggableTitle title="Gender" />,
        field: "gender",
        cellStyle: { whiteSpace: "nowrap" },
        render: (rowData) => (
          <div>
            {rowData.gender}
          </div>
        )
      },
      {
        title: <DraggableTitle title="Heard about event from" />,
        field: "heardFrom",
        cellStyle: { whiteSpace: "nowrap" },
        render: (rowData) => (
          <div>
            {rowData.heardFrom}
          </div>
        )
      }
    ];

    const arrangeColumns = () => {
      let curr = defaultColumns.concat(this.state.columns)
      this.setState({ presentedColumns: curr });
      return curr;
    };

    let registrationColumns = this.state.presentedColumns.length > 0 ? this.state.presentedColumns : arrangeColumns();

    function handleColumnDrag(sourceIndex, destinationIndex) {
      const sourceColumn = registrationColumns[sourceIndex];
      const destinationColumn = registrationColumns[destinationIndex];

      // Swapping the column order
      registrationColumns[sourceIndex] = destinationColumn;
      registrationColumns[destinationIndex] = sourceColumn;
      this.setState({ presentedColumns: registrationColumns });
    }

    /**
     * Creates stats + graphs/charts
     * Creates event table using MaterialTable library
     */
    return (
      <div style={styles.container}>
        {/* QR code scanner */}
        <QrCheckIn event={this.props.event} refresh={this.refreshTable} />

        {/* padding for visual separation */}
        <div style={{ padding: "10px" }} />
        

        {/* refresh button */}
        <Button
          variant="contained"
          color="primary"
          onClick={() =>
            this.refreshTable()
          }
        >
          Refresh Table Data
        </Button>

        {/* waitlist button */}
        <Button
          variant="contained"
          color="primary"
          onClick={() =>
            this.showWaitlist()
          }
        >
          Show Waitlist
        </Button>

        {
          this.state.isWaitlistShown &&
            <div>
              <div style={{ padding: "10px" }} />
              {/* text to say hello */}
              <Typography variant="h5" style={{ color: COLORS.FONT_COLOR }}>
                To view the waitlist: 1) apply a Filter on the Registration Status column for "Waitlist". 2) Sort the table by Last Updated.
              </Typography>
            </div>
        }

        <MaterialTable
          title={`${this.props.event.ename} Attendance`}
          columns={registrationColumns}
          data={this.state.rows}
          handleColumnDrag={handleColumnDrag}
          // Configure options for the table
          style={styles.table}
          options={{
            search: true,
            draggable: true,
            filtering: true,
            padding: "default",
            pageSize: 25,
            pageSizeOptions: [25, 50, 100, 200, 1000],
            actionsColumnIndex: 5,
            exportButton: true,
            exportAllData: true,
            headerStyle: {
              fontWeight: "bold",
              backgroundColor: COLORS.CARD_PAPER_COLOR,
              color: COLORS.FONT_COLOR,
              whiteSpace: "nowrap"
            },
            rowStyle: (rowData) => ({}),
            filterCellStyle: {
              backgroundColor: COLORS.CARD_PAPER_COLOR
            }
          }}
          localization={{
            body: {
              emptyDataSourceMessage: (
                <h1
                  style={{
                    color: COLORS.WHITE
                  }}
                >
                  No attendees to display.
                </h1>
              ),
              filterRow: {
                filterTooltip: "Filter (type in to search)"
              }
            }
          }}
          components={{
            Cell: (props) => <PopoverCell {...props} />
          }}
        />

        {/* padding for visual separation */}
        <div style={{ padding: "10px" }} />
        
        <Statistic
          statName="Registration status: "
          statObj={this.state.registrationNumbers}
        />
        <Statistic statName="Faculty: " statObj={this.state.faculties} />
        <Statistic statName="Year level: " statObj={this.state.years} />
        {/* <Statistic statName='Dietary: ' statObj={this.state.dietary} /> */}
        <Statistic statName="Gender: " statObj={this.state.genders} />
        <Statistic statName="Diet: " statObj={this.state.dietary} />
        <Statistic
          statName="Heard about event from: "
          statObj={this.state.heardFrom}
        />
      </div>
    );
  }
}

const useStyles = makeStyles((theme) => ({
  paperRoot: {
    borderRadius: "4px",
    marginBottom: "5px",
    overflowX: "auto"
  },
  qrRoot: {
    borderRadius: "4px",
    padding: "10px"
  },
  qrOutput: {
    marginTop: "10px",
    marginBottom: "10px",
    textAlign: "center"
  }
}));

const PopoverCell = (props) => {
  const [anchorPosition, setAnchorPosition] = useState(null);
  const [popoverText, setPopoverText] = useState("");

  const handlePopoverOpen = (event) => {
    setPopoverText(event.target.getAttribute("value"));

    const { top, left } = event.currentTarget.getBoundingClientRect();
    setAnchorPosition({ top, left });
  };

  const handlePopoverClose = () => {
    setAnchorPosition(null);
  };

  const isValidUrl = (text) => {
    let url;
    try {
      url = new URL(text);
    } catch (_) {
      return false;
    }
    return url.protocol === "http:" || url.protocol === "https:";
  };

  const open = Boolean(anchorPosition);

  const dropdownColumnFieldNames = [REGISTRATIONSTATUSLABEL];

  return (
    <>
      <MTableCell
        {...props}
        aria-owns={open ? "mouse-over-popover" : undefined}
        aria-haspopup="true"
        onMouseDown={handlePopoverOpen}
        style={styles.ellipsis}
      />
      {/* NOTE: if any more dropdown columns are added in the future to the the default columns of the MaterialTable, 
            you will need to exclude the column from the Popover effect as shown below */}
      {dropdownColumnFieldNames.includes(props.columnDef.field) ? (
        <></>
      ) : (
        <Popover
          id="mouse-over-popover"
          sx={{
            pointerEvents: "auto"
          }}
          open={open}
          anchorReference="anchorPosition"
          anchorPosition={anchorPosition}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left"
          }}
          PaperProps={{
            style: { 
              maxWidth: "50%",
              whiteSpace: "pre-line"
            }
          }}
          onClose={handlePopoverClose}
          disableRestoreFocus
        >
          {isValidUrl(popoverText) ? (
            <Link href={popoverText} target="_blank" rel="noopener noreferrer">
              {popoverText}
            </Link>
          ) : (
            <Typography sx={{ p: 1 }}>{popoverText.split("<br/>").join("\n")}</Typography>
          )}
        </Popover>
      )}
    </>
  );
};

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
        angle: props.statObj[key]
      };
    }),
    Object.keys(props.statObj).map((key) => {
      return {
        x: key,
        y: props.statObj[key]
      };
    })
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
};

// facing mode for the camera
const CAMERA_FACING_MODE = {
  FRONT: "user",
  BACK: "environment"
};

const QrCheckIn = (props) => {
  const classes = useStyles();
  const [visible, setVisible] = useState(false);
  const defaultQrCode = { data: "" };
  const [qrCode, setQrCode] = useState(defaultQrCode);
  const [qrScanStage, setQrScanStage] = useState(QR_SCAN_STAGE.SCANNING);
  const [cameraFacingMode, setCameraFacingMode] = useState(
    CAMERA_FACING_MODE.BACK
  );
  const [checkInName, setCheckInName] = useState("");
  const [error, setError] = useState("");

  const flipCamera = () => {
    if (cameraFacingMode === CAMERA_FACING_MODE.FRONT) {
      setCameraFacingMode(CAMERA_FACING_MODE.BACK);
    } else {
      setCameraFacingMode(CAMERA_FACING_MODE.FRONT);
    }
  };

  const handleScanQR = (data) => {
    // conditional check may be necessary to prevent re-scans of the same QR code, but this implementation is unintuitive
    // when wanting to re-scan (requires a manual reset)
    // if (data.data !== qrCode.data) setQrCode(data);

    setQrCode(data);
  };

  // puts the QR code scanner in a scanning state after a grace period, like tapping your Compass Card
  // stage is type QR_SCAN_STAGE
  const cycleQrScanStage = (stage, ms) => {
    setQrScanStage(stage);
    setTimeout(() => {
      setQrScanStage(QR_SCAN_STAGE.SCANNING);
    }, ms);
  };

  const emailCheck = (email) => {
    return /(.+)@(.+){2,}\.(.+){2,}/.test(email);
  }

  // checks if the QR code is valid whenever the QR code is changed
  useEffect(() => {
    if (!qrCode || qrCode.data === "" || qrScanStage !== QR_SCAN_STAGE.SCANNING)
      return;

    // data is arranged: email;event_id;year
    // id is the array of the data split by ";"
    const id = qrCode.data.split(";");
    const userID = id[0];
    const eventIDAndYear = id[1] + ";" + id[2];

    // validate event ID and year as the current event
    if (eventIDAndYear !== props.event.id + ";" + props.event.year) {
      cycleQrScanStage(QR_SCAN_STAGE.FAILED, 8000);

      // if there are not 3 items and first item is not an email, then the QR code is invalid
      if (id.length !== 3 && !emailCheck(userID)) {
        setError("Invalid BizTech QR code.");
      } else {
        setError("Please check that your QR code is for this event.");
      }
      return;
    }

    const params = new URLSearchParams({
      users: true
    });

    fetchBackend(
      `/events/${props.event.id}/${props.event.year.toString()}?${params}`,
      "GET"
    )
      .then((users) => {
        // filter the users to get the one with the same id
        const user = users.filter((user) => user.id === userID)[0];

        if (!user) {
          cycleQrScanStage(QR_SCAN_STAGE.FAILED, 6000);
          setError("Person is not registered for this event.");
          return;
        }

        // get the person's name
        setCheckInName(`${user.firstName ? user.firstName : user.fname} ${user.lastName ? user.lastName : user.lname} (${userID})`);

        // If the user is already checked in, show an error
        if (user.registrationStatus === REGISTRATION_STATUS.CHECKED_IN) {
          cycleQrScanStage(QR_SCAN_STAGE.FAILED, 5000);
          setError(`Person is already checked in.`);
          return;
        } else if (user.registrationStatus === REGISTRATION_STATUS.CANCELLED) {
          cycleQrScanStage(QR_SCAN_STAGE.FAILED, 5000);
          setError(`Person had their registration cancelled. Cannot check-in.`);
          return;
        } else if (user.registrationStatus === REGISTRATION_STATUS.WAITLISTED) { 
          cycleQrScanStage(QR_SCAN_STAGE.FAILED, 5000);
          setError(`Person is on the waitlist. Cannot check-in.`);
          return;
        }

        checkInUser(userID);
      })
      .catch((error) => {
        console.log(error);
      });

    const checkInUser = (id) => {
      const body = {
        eventID: props.event.id,
        year: props.event.year,
        registrationStatus: REGISTRATION_STATUS.CHECKED_IN
      };

      // update the registration status of the user to checked in
      fetchBackend(`/registrations/${id}`, "PUT", body);

      setQrCode(defaultQrCode);

      // wait 10 seconds, then reset the scan stage
      cycleQrScanStage(QR_SCAN_STAGE.SUCCESS, 8000);

      // refresh the entire table to reflect change
      props.refresh();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qrCode]);

  return (
    <Paper className={[classes.qrRoot]}>
      {/* Toggle QR Scanner */}
      <div
        style={styles.toggleContainer}
      >
        <Link
          onClick={() => setVisible(!visible)}
          style={styles.toggleQrScanner}
        >
          <img src={QRIcon} alt="QR Icon" style={styles.qrIcon} />
          Toggle QR Scanner for Check-In
        </Link>
      </div>

      {visible && (
        <div className={classes.qrOutput}>
          <Alert
            variant="filled"
            severity={
              qrScanStage === QR_SCAN_STAGE.SUCCESS
                ? "success"
                : qrScanStage === QR_SCAN_STAGE.SCANNING
                ? "info"
                : "error"
            }
          >
            {qrScanStage === QR_SCAN_STAGE.SUCCESS
              ? `Checked-in successfully for ${checkInName}! Your attendance table will be updated shortly.`
              : qrScanStage === QR_SCAN_STAGE.SCANNING
              ? "Ready to scan a QR code to check-in. 😎"
              : `🚨 ERROR: ${error}`}
          </Alert>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <QrReader
              style={styles.qrCodeVideo}
              onScan={handleScanQR}
              facingMode={cameraFacingMode}
              delay={250}
            />
          </div>

          <div>
            {/* Manually reset scanner */}
            <Link
              onClick={() => {
                setQrCode(defaultQrCode);
                setQrScanStage(QR_SCAN_STAGE.SCANNING);
              }}
            >
              Manually Reset Scanner
            </Link>

            <Link> | </Link>

            {/* Flip camera */}
            <Link onClick={() => flipCamera()}>Switch Camera</Link>
          </div>

          <div>
            {/* Last person who was scanned */}
            <Typography variant="body2">
              Last scanned: {checkInName || "None"}
            </Typography>
          </div>
        </div>
      )}
    </Paper>
  );
};


export default EventStatsTable;
