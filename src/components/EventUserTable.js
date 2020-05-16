import React, { Component } from "react";
import { connect } from "react-redux";
import MaterialTable from "material-table";
import { fetchBackend } from "../utils";
import { REGISTRATION_STATUS } from "../constants/Constants";
import Select from "@material-ui/core/Select";
import MenuItem from '@material-ui/core/MenuItem';

/**
 * Class component that displays event user table populated from the backend
 * When a user check-in status is changed, the backend is updated and it fetches new data
 */
export class EventUserTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async updateUserRegistrationStatus(id, registrationStatus) {
    const body = JSON.stringify({
      eventID: this.props.event.id,
      id: id,
      registrationStatus: registrationStatus
    });

    await fetchBackend('/registration/create', 'POST', body);

    this.getEventTableData(this.props.event.id);
  }

  async getEventTableData(eventID) {
    const params = new URLSearchParams({
      id: eventID
    });

    fetchBackend('/events/getUsers?' + params, 'GET')
      .then(response => response.json())
      .then(response => {
        this.setState({ rows: response });
      });
  }

  componentDidMount() {
    this.getEventTableData(this.props.event.id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.event.id !== this.props.event.id) {
      this.getEventTableData(this.props.event.id);
    }
  }

  render() {
    /**
     * Helper function to determine whether to display action for check-in or undo check-in
     * @param {*} rowData data about the current row
    */
    const changeRegistration = (event, rowData) => {
      switch (event.target.value) {
        case REGISTRATION_STATUS.REGISTERED:
          if (window.confirm("Do you want to register " + rowData.fname + " " + rowData.lname + "?\nThis will send an email to the user.")) {
            this.updateUserRegistrationStatus(rowData.id, REGISTRATION_STATUS.REGISTERED);
          }
          break;
        case REGISTRATION_STATUS.CHECKED_IN:
          if (window.confirm("Do you want to check-in " + rowData.fname + " " + rowData.lname + "?\nThis will NOT send an email to the user.")) {
            this.updateUserRegistrationStatus(rowData.id, REGISTRATION_STATUS.CHECKED_IN);
          }
          break;
        case REGISTRATION_STATUS.WAITLISTED:
          if (window.confirm("Do you want to waitlist " + rowData.fname + " " + rowData.lname + "?\nThis will send an email to the user.")) {
            this.updateUserRegistrationStatus(rowData.id, REGISTRATION_STATUS.WAITLISTED);
          }
          break;
        case REGISTRATION_STATUS.CANCELLED:
          if (window.confirm("Did " + rowData.fname + " " + rowData.lname + "cancel?\nThis will send an email to the user.")) {
            this.updateUserRegistrationStatus(rowData.id, REGISTRATION_STATUS.CANCELLED);
          }
          break;
        default:
          return {};
      }
    }


    /**
     * Creates event table using MaterialTable library
     */
    return (
      <MaterialTable
        title={`${this.props.event.ename} Attendance`}
        columns={[
          { title: "First Name", field: "fname" },
          { title: "Last Name", field: "lname" },
          {
            title: "Student Number",
            field: "id",
            type: "numeric",
            sorting: false
          },
          { title: "Email", field: "email", sorting: false },
          {
            title: "Registration Status",
            field: "registrationStatus",
            sorting: false,
            render: rowData => (
              <div>
                <Select
                  value={rowData.registrationStatus}
                  onClick={event => changeRegistration(event, rowData)}
                  style={{
                    backgroundColor:
                      rowData.registrationStatus === REGISTRATION_STATUS.CHECKED_IN
                        ? "#54D26E"
                        : rowData.registrationStatus === REGISTRATION_STATUS.WAITLISTED
                          ? "#F7D055"
                          : rowData.registrationStatus === REGISTRATION_STATUS.CANCELLED
                            ? "#E15453"
                            : "#FFF",
                    paddingLeft: "10px"
                  }}>
                  <MenuItem value={REGISTRATION_STATUS.WAITLISTED}>Waitlisted</MenuItem>
                  <MenuItem value={REGISTRATION_STATUS.CHECKED_IN}>Checked in</MenuItem>
                  <MenuItem value={REGISTRATION_STATUS.REGISTERED}>Registered</MenuItem>
                  <MenuItem value={REGISTRATION_STATUS.CANCELLED}>Cancelled</MenuItem>
                </Select>
              </div>
            )
          }
        ]}
        data={this.state.rows}
        // Configure options for the table
        options={{
          search: true,
          draggable: false,
          padding: "dense",
          pageSize: 15,
          pageSizeOptions: [15, 50, 100],
          actionsColumnIndex: 5,
          exportButton: true,
          headerStyle: {
            fontWeight: "bold"
          },
          rowStyle: rowData => ({

          })
        }}
      />
    );
  }
}
const mapStateToProps = state => {
  return {
    event: state.pageState.event
  };
};
export default connect(mapStateToProps, null)(EventUserTable);
