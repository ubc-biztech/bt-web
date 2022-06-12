import React, { useState, Component } from "react";

import MaterialTable, { MTableCell } from "material-table";
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
  Popover
} from "@material-ui/core";

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
  ellipsis: {
    maxWidth: 200, 
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
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

    console.log("rows:\n", data);

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

    console.log("columns:\n", columns);
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
          components={{
            Cell: props => (<PopoverCell {...props}/>
            )
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
}));

/* TODO: 
 * the events are triggering, but the popover does not appear
 * in our handlepopoveropen, we need to set the text of the popover to event.target.getAttribute('value')
*/
const PopoverCell = (props) => {

  const [anchorPosition, setAnchorPosition] = useState(null);
  const [popoverText, setPopoverText] = useState("");

  const handlePopoverOpen = (event) => {
    setPopoverText(event.target.getAttribute('value'));

    const {top, left} = event.currentTarget.getBoundingClientRect();
    setAnchorPosition({top, left});
  };

  const handlePopoverClose = () => {
    setAnchorPosition(null);
  };
  
  const open = Boolean(anchorPosition);

  return (<>
  <MTableCell {...props} 
      aria-owns={open ? 'mouse-over-popover' : undefined}
      aria-haspopup="true"
      onMouseDown={handlePopoverOpen}
      style={styles.ellipsis} 
    />
  {props.columnDef.field === "registrationStatus" ? <></> : <Popover
    id="mouse-over-popover"
    sx={{
      pointerEvents: 'auto',
    }}
    open={open}
    anchorReference="anchorPosition"
    anchorPosition={anchorPosition}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'left',
    }}
    onClose={handlePopoverClose}
    disableRestoreFocus
  >
    <Typography sx={{ p: 1 }}>{popoverText}</Typography>
  </Popover>}
  </>)
}

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
export default EventStatsTable;

