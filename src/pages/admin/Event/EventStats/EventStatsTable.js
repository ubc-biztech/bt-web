import React, {
  useState, Component, useEffect
} from "react";
import QRIcon from "../../../../components/icons/qr-icon.png";

import MaterialTable, {
  MTableCell
} from "material-table";
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
  Paper,
  Typography,
  makeStyles,
  Link,
  Button,
  Popover, TextField
} from "@material-ui/core";

import {
  Alert
} from "@material-ui/lab";
import {
  QrReader
} from "react-qr-reader";

import {
  REGISTRATION_STATUS,
  REGISTRATION_LABELS,
  COLORS,
  APPLICATION_TABLE_TYPE,
  ATTENDEE_TABLE_TYPE,
  PARTNER_TABLE_TYPE
} from "constants/index";
import {
  fetchBackend
} from "utils";
import {
  REGISTRATIONSTATUSLABEL,
  flattenRowData,
  POINTSLABEL
} from "./utils";
import {
  getDefaultColumns, getDefaultPartnerColumns, getDynamicQuestionColumns
} from "./TableColumns";
import {
  Field, Form, Formik
} from "formik";

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
      columns: {
      },
      rows: [],
      presentedColumns: [],
      partnerColumns: {
      },
      presentedPartnerColumns: [],
      presentedApplicationViewColumns: [],
      registrationNumbers: {
      },
      faculties: {
      },
      years: {
      },
      dietary: {
      },
      genders: {
      },
      heardFrom: {
      },
      teamID: {
      },
      isWaitlistShown: false,
      isAdminTeamFormationShown: false,
      registrationVisible: {
        visible: false,
        style: {
          display: "none"
        }
      },
      facultyVisible: {
        visible: false,
        style: {
          display: "none"
        }
      },
      yearVisible: {
        visible: false,
        style: {
          display: "none"
        }
      },
      dietaryVisible: {
        visible: false,
        style: {
          display: "none"
        }
      },
      gendersVisible: {
        visible: false,
        style: {
          display: "none"
        }
      },
      heardFromVisible: {
        visible: false,
        style: {
          display: "none"
        }
      },
      tableType: ATTENDEE_TABLE_TYPE,
      refreshTable: () => {
        if (this.props.event !== null) {
          this.forceUpdate();
          this.setState({
            rows: []
          });
          this.getEventTableData(this.props.event.id, this.props.event.year);
        }
      }
    };
  }

  refreshTable() {
    if (this.props.event !== null) {
      this.forceUpdate();
      this.setState({
        rows: []
      });
      this.getEventTableData(this.props.event.id, this.props.event.year);
    }
  };

  async initializeTableColumns() {
    const {
      id: eventID, year: eventYear
    } = this.props.event;
    await fetchBackend(
      `/events/${eventID}/${eventYear.toString()}`,
      "GET"
    ).then(async (event) => {
      const defaultColumns = getDefaultColumns(this.props.event.id, this.props.event.year, this.state.refreshTable, ATTENDEE_TABLE_TYPE);
      const dynamicQuestionColumns = getDynamicQuestionColumns(event.registrationQuestions);

      const defaultApplicationViewColumns = getDefaultColumns(this.props.event.id, this.props.event.year, this.state.refreshTable, APPLICATION_TABLE_TYPE);

      const defaultPartnerColumns = getDefaultPartnerColumns(this.props.event.id, this.props.event.year, this.state.refreshTable);
      const dynamicPartnerQuestionColumns = getDynamicQuestionColumns(event.partnerRegistrationQuestions);

      const presentedColumns = defaultColumns.concat(dynamicQuestionColumns);
      const presentedPartnerColumns = defaultPartnerColumns.concat(dynamicPartnerQuestionColumns);
      const presentedApplicationViewColumns = defaultApplicationViewColumns.concat(dynamicQuestionColumns);

      this.setState({
        presentedColumns,
        presentedPartnerColumns,
        presentedApplicationViewColumns
      });
    });
  }

  /* updates stats and the rows in the table
     faculty, gender, dietary, and year stats are only computed on the initial render of the component
     # of registered/checkedin etc. is computed every single time this function is called
  */
  async getEventTableData(eventID, eventYear) {
    const params = new URLSearchParams({
      eventID,
      year: eventYear
    });

    await fetchBackend(`/registrations?${params}`, "GET")
      .then((response) => {
        const rows = flattenRowData(response.data);
        const heardFrom = this.heardFromNumbers(rows);
        const registrationNumbers = this.registrationNumbers(rows);
        const {
          faculties,
          years,
          genders,
          dietary,
          teamID
        } = this.notRegistrationNumbers(rows);

        this.setState({
          rows,
          heardFrom,
          registrationNumbers,
          faculties,
          years,
          genders,
          dietary,
          teamID
        });
      })
      .catch(() => {
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
    const heardFrom = {
    };
    users.forEach((user) => {
      if (user.heardFrom) {
        heardFrom[user.heardFrom] = heardFrom[
          user.heardFrom
        ]
          ? heardFrom[user.heardFrom] + 1
          : 1;
      }
    });

    return heardFrom;
  }

  filterUserByTableType  (user)  {
    if (this.state.tableType === ATTENDEE_TABLE_TYPE) {
      return user.isPartner === false;
    } else {
      return user.isPartner === true;
    }
  };

  registrationNumbers(users) {
    const registrationNumbers = {
    };
    users.filter((user) => this.filterUserByTableType(user))
      .forEach((user) => {
        if (user.registrationStatus) {
          registrationNumbers[user.registrationStatus] = registrationNumbers[
            user.registrationStatus
          ]
            ? registrationNumbers[user.registrationStatus] + 1
            : 1;
        }
      });

    return registrationNumbers;
  }

  /**
   *
   * @param {array of users} users
   * calculates any stats that aren't registration stats
   * each data set is an array of data (arrays) sets b/c different charts accept different data
   */
  notRegistrationNumbers(users) {
    const faculties = {
    };
    const years = {
    };
    const dietary = {
    };
    const genders = {
    };
    users.filter((user) => this.filterUserByTableType(user))
      .forEach((user) => {
        if (user.faculty) {
          faculties[user.faculty] = faculties[
            user.faculty
          ]
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
          dietary[user.diet] = dietary[
            user.diet
          ]
            ? dietary[user.diet] + 1
            : 1;
        }
        if (user.gender) {
          genders[user.gender] = genders[
            user.gender
          ]
            ? genders[user.gender] + 1
            : 1;
        }
      });

    return {
      faculties,
      years,
      genders,
      dietary
    };
  }

  showWaitlist() {
    this.setState({
      isWaitlistShown: !this.state.isWaitlistShown
    });
  };

  showAdminTeamFormation() {
    this.setState({
      isAdminTeamFormationShown: !this.state.isAdminTeamFormationShown
    });
  };

  componentDidMount() {
    this.initializeTableColumns();
    this.refreshTable();
  }


  componentDidUpdate(_prevProps, prevState) {
    if (prevState.tableType !== this.state.tableType) {
      const registrationNumbers = this.registrationNumbers(this.state.rows);
      const nonRegistrationStats = this.notRegistrationNumbers(this.state.rows);

      this.setState({
        registrationNumbers,
        ...nonRegistrationStats
      });
    }
  }

  render() {
    const registrationColumns = this.state.presentedColumns;
    const registrationPartnerColumns = this.state.presentedPartnerColumns;
    const registrationApplicationViewColumns = this.state.presentedApplicationViewColumns;

    function handleColumnDrag(sourceIndex, destinationIndex) {
      const sourceColumn = registrationColumns[sourceIndex];
      const destinationColumn = registrationColumns[destinationIndex];

      // Swapping the column order
      registrationColumns[sourceIndex] = destinationColumn;
      registrationColumns[destinationIndex] = sourceColumn;
      this.setState({
        presentedColumns: registrationColumns
      });
    }

    function handleApplicationViewColumnDrag(sourceIndex, destinationIndex) {
      const sourceColumn = registrationApplicationViewColumns[sourceIndex];
      const destinationColumn = registrationApplicationViewColumns[destinationIndex];

      // Swapping the column order
      registrationApplicationViewColumns[sourceIndex] = destinationColumn;
      registrationApplicationViewColumns[destinationIndex] = sourceColumn;
      this.setState({
        presentedApplicationViewColumns: registrationApplicationViewColumns
      });
    }

    function handlePartnerColumnDrag(sourceIndex, destinationIndex) {
      const sourceColumn = registrationPartnerColumns[sourceIndex];
      const destinationColumn = registrationPartnerColumns[destinationIndex];

      // Swapping the column order
      registrationPartnerColumns[sourceIndex] = destinationColumn;
      registrationPartnerColumns[destinationIndex] = sourceColumn;
      this.setState({
        presentedPartnerColumns: registrationPartnerColumns
      });
    }

    function filterRows(rows, isPartner) {
      if (rows) {
        return rows.filter((row) => (
          Boolean(row.isPartner) === isPartner
        ));
      } else {
        return [];
      }
    }
    /**
     * Creates stats + graphs/charts
     * Creates event table using MaterialTable library
     */
    return (
      <div style={styles.container}>
        {/* QR code scanner */}
        <QrCheckIn event={this.props.event} refresh={this.refreshTable} rows={this.state.rows} />

        {/* padding for visual separation */}
        <div style={{
          padding: "10px"
        }}>
          {/* Toggle Competitions Acceptance View button */}
          {
            this.props.event?.isApplicationBased &&
            <Button
              variant="contained"
              color="primary"
              onClick={() =>
                this.setState({
                  tableType: this.state.tableType === APPLICATION_TABLE_TYPE ? ATTENDEE_TABLE_TYPE : APPLICATION_TABLE_TYPE
                })
              }
            >
              Toggle Application View
            </Button>
          }

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

          <Button
            variant="contained"
            color="primary"
            onClick={() =>
              this.setState({
                tableType: this.state.tableType === ATTENDEE_TABLE_TYPE ? PARTNER_TABLE_TYPE : ATTENDEE_TABLE_TYPE
              })
            }
          >
            {this.state.tableType === ATTENDEE_TABLE_TYPE ? "Show Partners Table" : "Show Attendees Table"}
          </Button>

          <Button
            variant="contained"
            color="primary"
            onClick={() =>
              this.showAdminTeamFormation()
            }
          >
            Make Team
          </Button>
        </div>
        {
          this.state.isWaitlistShown &&
          <div>
            <div style={{
              padding: "10px"
            }} />
            {/* text to say hello */}
            <Typography variant="h5" style={{
              color: COLORS.FONT_COLOR
            }}>
              To view the waitlist: 1) apply a Filter on the Registration Status column for "Waitlist". 2) Sort the table by Last Updated.
            </Typography>
          </div>
        }
        {
          this.state.isAdminTeamFormationShown &&
          <div>
            <div style={{
              padding: "10px"
            }} />
            {/*  Formik form for team formation, up to 4 members */}
            <Formik
              initialValues={{
                teamName: "",
                teamMember: "",
                teamMember2: "",
                teamMember3: "",
                teamMember4: "",
              }}
              onSubmit={async (values, {
                setSubmitting
              }) => {
                setSubmitting(true);

                const teamMembersArrayAppend = [];

                if (values.teamMember) teamMembersArrayAppend.push(values.teamMember);
                if (values.teamMember2) teamMembersArrayAppend.push(values.teamMember2);
                if (values.teamMember3) teamMembersArrayAppend.push(values.teamMember3);
                if (values.teamMember4) teamMembersArrayAppend.push(values.teamMember4);

                const response = {
                  team_name: values.teamName ? values.teamName : "Placeholder",
                  eventID: this.props.event.id,
                  year: parseInt(this.props.event.year),
                  memberIDs: teamMembersArrayAppend,
                };

                await fetchBackend("/team/make", "POST", response, true);
                // alert the user that the team has been made
                alert("Team has been made: " + values.teamName + " with members: " + teamMembersArrayAppend);

                setSubmitting(false);
                this.refreshTable();
              }}
            >
              {({
                isSubmitting, values
              }) => (
                <Form>
                  <Field
                    name="teamName"
                    type="text"
                    placeholder="Team Name"
                    as={TextField}
                    variant="filled"
                    style={{
                      margin: "10px"
                    }}
                  />
                  <Field
                    name="teamMember"
                    type="text"
                    placeholder="Team Member Email 1"
                    as={TextField}
                    variant="filled"
                    style={{
                      margin: "10px"
                    }}
                  />
                  <Field
                    name="teamMember2"
                    type="text"
                    placeholder="Team Member Email 2"
                    as={TextField}
                    variant="filled"
                    style={{
                      margin: "10px"
                    }}
                  />
                  <Field
                    name="teamMember3"
                    type="text"
                    placeholder="Team Member Email 3"
                    as={TextField}
                    variant="filled"
                    style={{
                      margin: "10px"
                    }}
                  />
                  <Field
                    name="teamMember4"
                    type="text"
                    placeholder="Team Member Email 4"
                    as={TextField}
                    variant="filled"
                    style={{
                      margin: "10px"
                    }}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Submit New Team
                  </Button>
                </Form>
              )}
            </Formik>

            <Typography variant="h5" style={{
              color: COLORS.FONT_COLOR
            }}>
              To view the teams or to make Team point changes, contact a member of the dev team
            </Typography>
          </div>
        }

        <MaterialTable
          title={this.state.tableType === APPLICATION_TABLE_TYPE ? `${this.props.event.ename} Application View` : `${this.props.event.ename} Attendance`}
          columns={
            this.state.tableType === ATTENDEE_TABLE_TYPE
              ? this.state.presentedColumns
              : this.state.tableType === APPLICATION_TABLE_TYPE
                ? this.state.presentedApplicationViewColumns
                : this.state.presentedPartnerColumns
          }
          data={filterRows(this.state.rows, this.state.tableType === PARTNER_TABLE_TYPE)}
          handleColumnDrag={
            this.state.tableType === ATTENDEE_TABLE_TYPE
              ? handleColumnDrag
              : this.state.tableType
                === APPLICATION_TABLE_TYPE
                ? handleApplicationViewColumnDrag
                : handlePartnerColumnDrag
          }
          // Configure options for the table
          style={styles.table}
          options={{
            sorting: true,
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
            rowStyle: (rowData) => ({
            }),
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
        <div style={{
          padding: "10px"
        }} />

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
      </div >
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

    const {
      top, left
    } = event.currentTarget.getBoundingClientRect();
    setAnchorPosition({
      top,
      left
    });
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

  const excludeFromOnclickPopoverColumns = [REGISTRATIONSTATUSLABEL, POINTSLABEL];

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
      {excludeFromOnclickPopoverColumns.includes(props.columnDef.field) ? (
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
            <Typography sx={{
              p: 1
            }}>{popoverText?.split("<br/>").join("\n")}</Typography>
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
            ? {
              display: "flex",
              paddingBottom: "20px",
              paddingLeft: "50px"
            }
            : {
              display: "none"
            }
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
          margin={{
            left: 40,
            right: 30,
            top: 30,
            bottom: 70
          }}
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
  const defaultQrCode = {
    data: ""
  };
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
  const [qrCodeText, setQrCodeText] = useState("");
  const handleScanQR = (data) => {
    // conditional check may be necessary to prevent re-scans of the same QR code, but this implementation is unintuitive
    // when wanting to re-scan (requires a manual reset)
    // if (data.data !== qrCode.data) setQrCode(data);
    if (data) {
      console.log("Scanned QR Code Data: ", data);
      if ("text" in data) {
        console.log("Scanned QR Code Text: ", data.text);
        setQrCodeText(data.text); // Update qrCodeText state
      } else {
        console.log("Scanned QR Code does not contain text property");
      }
    } else {
      console.log("No QR Code Scanned Data");
    }
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
  };

  // checks if the QR code is valid whenever the QR code is changed
  useEffect(() => {
    const checkInUser = (id, fname) => {
      const body = {
        eventID: props.event.id,
        year: props.event.year,
        registrationStatus: REGISTRATION_STATUS.CHECKED_IN
      };

      // update the registration status of the user to checked in
      fetchBackend(`/registrations/${id}/${fname}`, "PUT", body);

      setQrCode(defaultQrCode);

      // wait 10 seconds, then reset the scan stage
      cycleQrScanStage(QR_SCAN_STAGE.SUCCESS, 8000);

      // refresh the entire table to reflect change
      // props.refresh();
    };

    if (!qrCode || qrCodeText === "" || typeof qrCodeText !== "string" || qrScanStage !== QR_SCAN_STAGE.SCANNING)
      return;

    // data is arranged: email;event_id;year
    // id is the array of the data split by ";"
    const id = qrCodeText.split(";");
    const userID = id[0];
    const eventIDAndYear = id[1] + ";" + id[2];
    const userFName = id[3];

    // validate event ID and year as the current event
    if (eventIDAndYear !== props.event.id + ";" + props.event.year) {
      cycleQrScanStage(QR_SCAN_STAGE.FAILED, 8000);

      // if there are not 4 and first item is not an email, then the QR code is invalid
      if (id.length !== 4 && !emailCheck(userID)) {
        setError("Invalid BizTech QR code.");
      } else {
        setError("Please check that your QR code is for this event.");
      }
      return;
    }

    const user = props.rows?.filter((row) => row.id === userID)[0];

    if (!user) {
      cycleQrScanStage(QR_SCAN_STAGE.FAILED, 6000);
      setError("Person is not registered for this event.");
      return;
    }
    // fetchBackend(
    //   `/events/${props.event.id}/${props.event.year.toString()}?${params}`,
    //   "GET"
    // )
    //   .then((users) => {
    //     // filter the users to get the one with the same id
    //     const user = users.filter((user) => user.id === userID)[0];

    //     if (!user) {
    //       cycleQrScanStage(QR_SCAN_STAGE.FAILED, 6000);
    //       setError("Person is not registered for this event.");
    //       return;
    //     }

    // get the person's name
    setCheckInName(`${user.firstName ? user.firstName : user.fname} ${user.lastName ? user.lastName : user.lname} (${userID})`);

    // If the user is already checked in, show an error
    if (user.registrationStatus === REGISTRATION_STATUS.CHECKED_IN) {
      cycleQrScanStage(QR_SCAN_STAGE.FAILED, 5000);
      setError("Person is already checked in.");
      return;
    } else if (user.registrationStatus === REGISTRATION_STATUS.CANCELLED) {
      cycleQrScanStage(QR_SCAN_STAGE.FAILED, 5000);
      setError("Person had their registration cancelled. Cannot check-in.");
      return;
    } else if (user.registrationStatus === REGISTRATION_STATUS.WAITLISTED) {
      cycleQrScanStage(QR_SCAN_STAGE.FAILED, 5000);
      setError("Person is on the waitlist. Cannot check-in.");
      return;
    }
    checkInUser(userID, userFName);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qrCodeText]);

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
              containerStyle={styles.qrCodeVideo}
              onResult={handleScanQR}
              constraints={{
                facingMode: cameraFacingMode
              }}
              scanDelay={250}
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
