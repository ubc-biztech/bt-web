import React, {
  useState, useEffect
} from "react";
import QRIcon from "../../../../components/icons/qr-icon.png";

import MaterialTable, {
  MTableCell
} from "@material-table/core";
import {
  ExportCsv, ExportPdf
} from "@material-table/exporters";
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
  Popover,
  TextField
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
  REGISTRATIONSTATUSLABEL, flattenRowData, POINTSLABEL
} from "./utils";
import {
  getDefaultColumns,
  getDefaultPartnerColumns,
  getDynamicQuestionColumns
} from "./TableColumns";
import {
  Field, Form, Formik
} from "formik";
import MassUpdateModal from "./MassUpdateModal";

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
    "& .MuiTableRoot": {
      position: "sticky"
    },
    width: "100%",
    height: "calc(100vh - 32px)",
    overflow: "auto"
  },
  table: {
    display: "grid",
    overflowX: "auto",
    color: COLORS.FONT_COLOR,
    background: COLORS.LIGHT_BACKGROUND_COLOR,
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

const EventStatsTable = (props) => {
  const [rows, setRows] = useState([]);
  const [fnames, setFnames] = useState([]);
  const [presentedColumns, setPresentedColumns] = useState([]);
  const [presentedPartnerColumns, setPresentedPartnerColumns] = useState([]);
  const [presentedApplicationViewColumns, setPresentedApplicationViewColumns] = useState([]);
  const [registrationNumbers, setRegistrationNumbers] = useState({
  });
  const [faculties, setFaculties] = useState({
  });
  const [years, setYears] = useState({
  });
  const [dietary, setDietary] = useState({
  });
  const [genders, setGenders] = useState({
  });
  const [heardFrom, setHeardFrom] = useState({
  });
  const [teamID, setTeamID] = useState({
  });
  const [isWaitlistShown, setIsWaitlistShown] = useState(false);
  const [isAdminTeamFormationShown, setIsAdminTeamFormationShown] = useState(false);
  const [tableType, setTableType] = useState(ATTENDEE_TABLE_TYPE);
  const [isMassUpdateModalOpen, setIsMassUpdateModalOpen] = useState(false);

  const toggleMassUpdateModal = () => {
    setIsMassUpdateModalOpen(prevState => !prevState);
  };

  const refreshTable = async () => {
    if (props.event !== null) {
      // Assuming getEventTableData is an async function
      setRows([]);
      await getEventTableData(props.event.id, props.event.year);
    };
  };

  const initializeTableColumns = async () => {
    const {
      id: eventID, year: eventYear
    } = props.event;

    try {
      const event = await fetchBackend(`/events/${eventID}/${eventYear.toString()}`, "GET");

      const defaultColumns = getDefaultColumns(
        props.event.id,
        props.event.year,
        refreshTable,
        ATTENDEE_TABLE_TYPE
      );
      const dynamicQuestionColumns = getDynamicQuestionColumns(event.registrationQuestions);

      const defaultApplicationViewColumns = getDefaultColumns(
        props.event.id,
        props.event.year,
        refreshTable,
        APPLICATION_TABLE_TYPE
      );

      const defaultPartnerColumns = getDefaultPartnerColumns(
        props.event.id,
        props.event.year,
        refreshTable
      );
      const dynamicPartnerQuestionColumns = getDynamicQuestionColumns(
        event.partnerRegistrationQuestions
      );

      const presentedColumns = defaultColumns.concat(dynamicQuestionColumns);
      const presentedPartnerColumns = defaultPartnerColumns.concat(dynamicPartnerQuestionColumns);
      const presentedApplicationViewColumns =
        defaultApplicationViewColumns.concat(dynamicQuestionColumns);

      setPresentedColumns(presentedColumns);
      setPresentedPartnerColumns(presentedPartnerColumns);
      setPresentedApplicationViewColumns(presentedApplicationViewColumns);
    } catch (error) {
      // Handle error, e.g., log it or show a notification
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    initializeTableColumns();
  }, [props.event]);

  useEffect(() => {
    const temp = {
    };
    rows.forEach((row) => {
      temp[row.id] = row.fname;
    });
    setFnames(temp);
  }, [rows]);

  // row changes -> fnames is a dict w/ email to fname
  const getEventTableData = async () => {
    const {
      id: eventID, year: eventYear
    } = props.event;

    const params = new URLSearchParams({
      eventID,
      year: eventYear
    });

    try {
      const response = await fetchBackend(`/registrations?${params}`, "GET");
      const rowsData = flattenRowData(response.data);
      const heardFromData = heardFromNumbers(rowsData);
      const registrationNumbersData = getRegistrationNumbers(rowsData);
      const {
        faculties: facultiesData,
        years: yearsData,
        genders: gendersData,
        dietary: dietaryData,
        teamID: teamIDData
      } = notRegistrationNumbers(rowsData);

      setRows(rowsData);
      setHeardFrom(heardFromData);
      setRegistrationNumbers(registrationNumbersData);
      setFaculties(facultiesData);
      setYears(yearsData);
      setGenders(gendersData);
      setDietary(dietaryData);
      setTeamID(teamIDData);
    } catch (error) {
      // Handle error, e.g., log it or show a notification
      console.error("Error fetching data:", error);
    }
  };


  /**
   *
   * @param {array of users} users
   * calculates the stats for registration and updates the data for charts
   * each data set is an array of data (arrays) sets b/c different charts accept different data
   */

  const heardFromNumbers = (users) => {
    const heardFrom = {
    };
    users.forEach((user) => {
      if (user.heardFrom) {
        heardFrom[user.heardFrom] = heardFrom[user.heardFrom]
          ? heardFrom[user.heardFrom] + 1
          : 1;
      }
    });

    return heardFrom;
  };

  const filterUserByTableType = (user) => {
    if (tableType === ATTENDEE_TABLE_TYPE) {
      return user.isPartner === false;
    } else {
      return user.isPartner === true;
    }
  };

  const getRegistrationNumbers = (users) => {
    const registrationNumbers = {
    };
    users
      .filter((user) => filterUserByTableType(user))
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
  };

  /**
   *
   * @param {array of users} users
   * calculates any stats that aren't registration stats
   * each data set is an array of data (arrays) sets b/c different charts accept different data
   */
  const notRegistrationNumbers = (users) => {
    const faculties = {
    };
    const years = {
    };
    const dietary = {
    };
    const genders = {
    };
    users
      .filter((user) => filterUserByTableType(user))
      .forEach((user) => {
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

    return {
      faculties,
      years,
      genders,
      dietary
    };
  };

  const showWaitlist = () => {
    setIsWaitlistShown(!isWaitlistShown);
  };

  const showAdminTeamFormation = () => {
    setIsAdminTeamFormationShown(!isAdminTeamFormationShown);
  };

  useEffect(() => {
    initializeTableColumns();
    refreshTable();
  }, []);

  useEffect(() => {
    const registrationNumbersData = getRegistrationNumbers(rows);
    const nonRegistrationStats = notRegistrationNumbers(rows);

    setRegistrationNumbers(registrationNumbersData);
    setFaculties(nonRegistrationStats.faculties);
    setYears(nonRegistrationStats.years);
    setGenders(nonRegistrationStats.genders);
    setDietary(nonRegistrationStats.dietary);
    setTeamID(nonRegistrationStats.teamID);
    // purely placeholder for eslint errors lol
    if (teamID) {
      console.log("using teamID");
    }
  }, [tableType, rows]);

  const handleColumnDrag = (sourceIndex, destinationIndex) => {
    const registrationColumns = presentedColumns;
    const sourceColumn = registrationColumns[sourceIndex];
    const destinationColumn = registrationColumns[destinationIndex];

    // Swapping the column order
    registrationColumns[sourceIndex] = destinationColumn;
    registrationColumns[destinationIndex] = sourceColumn;
    setPresentedColumns(registrationColumns);
  };

  const handleApplicationViewColumnDrag = (sourceIndex, destinationIndex) => {
    const registrationApplicationViewColumns = presentedApplicationViewColumns;
    const sourceColumn = registrationApplicationViewColumns[sourceIndex];
    const destinationColumn =
      registrationApplicationViewColumns[destinationIndex];

    // Swapping the column order
    registrationApplicationViewColumns[sourceIndex] = destinationColumn;
    registrationApplicationViewColumns[destinationIndex] = sourceColumn;
    setPresentedApplicationViewColumns(registrationApplicationViewColumns);
  };

  const handlePartnerColumnDrag = (sourceIndex, destinationIndex) => {
    const registrationPartnerColumns = presentedPartnerColumns;
    const sourceColumn = registrationPartnerColumns[sourceIndex];
    const destinationColumn = registrationPartnerColumns[destinationIndex];

    // Swapping the column order
    registrationPartnerColumns[sourceIndex] = destinationColumn;
    registrationPartnerColumns[destinationIndex] = sourceColumn;
    setPresentedPartnerColumns(registrationPartnerColumns);
  };


  const filterRows = (rows, isPartner) => {
    if (rows) {
      return rows.filter((row) => Boolean(row.isPartner) === isPartner);
    } else {
      return [];
    }
  };
  /**
   * Creates stats + graphs/charts
   * Creates event table using MaterialTable library
   */
  return (
    <div style={styles.container}>
      {/* QR code scanner */}
      <QrCheckIn
        event={props.event}
        refresh={refreshTable}
        rows={rows}
      />

      {/* padding for visual separation */}
      <div
        style={{
          padding: "10px"
        }}
      >
        {/* Toggle Competitions Acceptance View button */}
        {props.event?.isApplicationBased && (
          <Button
            variant="contained"
            color="primary"
            onClick={() =>
              setTableType(tableType === APPLICATION_TABLE_TYPE
                ? ATTENDEE_TABLE_TYPE
                : APPLICATION_TABLE_TYPE)
            }
          >
            Toggle Application View
          </Button>
        )}

        {/* refresh button */}
        <Button
          variant="contained"
          color="primary"
          onClick={() => refreshTable()}
        >
          Refresh Table Data
        </Button>

        <Button
          variant="contained"
          color="primary"
          onClick={() => toggleMassUpdateModal()}
        >
          Mass Update Status
        </Button>

        <MassUpdateModal
          open={isMassUpdateModalOpen}
          onClose={toggleMassUpdateModal}
          eventID={props.event.id}
          eventYear={props.event.year}
          refreshTable={refreshTable}
          fnames={fnames}
        />

        {/* waitlist button */}
        <Button
          variant="contained"
          color="primary"
          onClick={() => showWaitlist()}
        >
          Show Waitlist
        </Button>

        <Button
          variant="contained"
          color="primary"
          onClick={() =>
            setTableType(tableType === ATTENDEE_TABLE_TYPE
              ? PARTNER_TABLE_TYPE
              : ATTENDEE_TABLE_TYPE)
          }
        >
          {tableType === ATTENDEE_TABLE_TYPE
            ? "Show Partners Table"
            : "Show Attendees Table"}
        </Button>

        <Button
          variant="contained"
          color="primary"
          onClick={() => showAdminTeamFormation()}
        >
          Make Team
        </Button>
      </div>
      {isWaitlistShown && (
        <div>
          <div
            style={{
              padding: "10px"
            }}
          />
          {/* text to say hello */}
          <Typography
            variant="h5"
            style={{
              color: COLORS.FONT_COLOR
            }}
          >
            To view the waitlist: 1) apply a Filter on the Registration Status
            column for "Waitlist". 2) Sort the table by Last Updated.
          </Typography>
        </div>
      )}
      {isAdminTeamFormationShown && (
        <div>
          <div
            style={{
              padding: "10px"
            }}
          />
          {/*  Formik form for team formation, up to 4 members */}
          <Formik
            initialValues={{
              teamName: "",
              teamMember: "",
              teamMember2: "",
              teamMember3: "",
              teamMember4: ""
            }}
            onSubmit={async (values, {
              setSubmitting
            }) => {
              setSubmitting(true);

              const teamMembersArrayAppend = [];

              if (values.teamMember)
                teamMembersArrayAppend.push(values.teamMember);
              if (values.teamMember2)
                teamMembersArrayAppend.push(values.teamMember2);
              if (values.teamMember3)
                teamMembersArrayAppend.push(values.teamMember3);
              if (values.teamMember4)
                teamMembersArrayAppend.push(values.teamMember4);

              const response = {
                team_name: values.teamName ? values.teamName : "Placeholder",
                eventID: props.event.id,
                year: parseInt(props.event.year),
                memberIDs: teamMembersArrayAppend
              };

              await fetchBackend("/team/make", "POST", response, true);
              // alert the user that the team has been made
              alert(
                "Team has been made: " +
                values.teamName +
                " with members: " +
                teamMembersArrayAppend
              );

              setSubmitting(false);
              refreshTable();
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

          <Typography
            variant="h5"
            style={{
              color: COLORS.FONT_COLOR
            }}
          >
            To view the teams or to make Team point changes, contact a member
            of the dev team
          </Typography>
        </div>
      )}

      <MaterialTable
        title={
          tableType === APPLICATION_TABLE_TYPE
            ? `${props.event.ename} Application View`
            : `${props.event.ename} Attendance`
        }
        columns={
          tableType === ATTENDEE_TABLE_TYPE
            ? presentedColumns
            : tableType === APPLICATION_TABLE_TYPE
              ? presentedApplicationViewColumns
              : presentedPartnerColumns
        }
        data={filterRows(
          rows,
          tableType === PARTNER_TABLE_TYPE
        )}
        handleColumnDrag={
          tableType === ATTENDEE_TABLE_TYPE
            ? handleColumnDrag
            : tableType === APPLICATION_TABLE_TYPE
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
          exportMenu: [
            {
              label: "Export PDF",
              exportFunc: (cols, datas) => ExportPdf(cols, datas, `${props.event.id}${props.event.year}${tableType}`),
            },
            {
              label: "Export CSV",
              exportFunc: (cols, datas) => ExportCsv(cols, datas, `${props.event.id}${props.event.year}${tableType}`),
            }
          ],
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
      <div
        style={{
          padding: "10px"
        }}
      />

      <Statistic
        statName="Registration status: "
        statObj={registrationNumbers}
      />
      <Statistic statName="Faculty: " statObj={faculties} />
      <Statistic statName="Year level: " statObj={years} />
      {/* <Statistic statName='Dietary: ' statObj={dietary} /> */}
      <Statistic statName="Gender: " statObj={genders} />
      <Statistic statName="Diet: " statObj={dietary} />
      <Statistic
        statName="Heard about event from: "
        statObj={heardFrom}
      />
    </div>
  );
};

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

  const excludeFromOnclickPopoverColumns = [
    REGISTRATIONSTATUSLABEL,
    POINTSLABEL
  ];

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
            <Typography
              sx={{
                p: 1
              }}
            >
              {popoverText?.split("<br/>").join("\n")}
            </Typography>
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

    if (
      !qrCode ||
      qrCodeText === "" ||
      typeof qrCodeText !== "string" ||
      qrScanStage !== QR_SCAN_STAGE.SCANNING
    )
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
    setCheckInName(
      `${user.firstName ? user.firstName : user.fname} ${user.lastName ? user.lastName : user.lname
      } (${userID})`
    );

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
    <Paper className={classes.qrRoot}>
      {/* Toggle QR Scanner */}
      <div style={styles.toggleContainer}>
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
