import React, { Component } from 'react';
import MaterialTable from 'material-table';
import { fetchBackend } from '../utils';
import { REGISTRATION_STATUS } from '../constants/Constants';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import { RadialChart } from 'react-vis';

const styles = {
  stats: {
    width: '100%',
    display: 'flex',
    margin: '6px',
    borderRadius: '20px',
    boxShadow: 'rgba(0, 0, 0, 0.4) 0 0 10px'
  },
  stat: {
    margin: '10px'
  }
}
/**
 * Class component that displays event user table populated from the backend
 * When a user check-in status is changed, the backend is updated and it fetches new data
 */
export class EventUserTable extends Component {
  constructor(props) {
    super(props);
    this.state = { registrationObj: {}, faculties: {}, years: {}, dietary: {}, genders: {}, heardFrom: {} };
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

  /* updates stats and the rows in the table
     faculty, gender, dietary, and year stats are only computed on the initial render of the component
     # of registered/checkedin etc. is computed every single time this function is called
  */
  async getEventTableData(eventID) {

    const params = new URLSearchParams({
      eventID: eventID
    })

    await fetchBackend('/registration/scanEvent?' + params, 'GET')
      .then(response => response.json())
      .then(response => {
        let heardFrom = {};
        for (let i = 0; i < response.size; ++i) {
          const temp = response.data[i];
          if (temp.hasOwnProperty('heardFrom')) {
            heardFrom[temp.heardFrom] = heardFrom.hasOwnProperty(temp.heardFrom) ? heardFrom[temp.heardFrom] + 1 : 1;
          }
        }
        this.setState({ heardFrom })
      })

    const eventParams = new URLSearchParams({
      id: eventID
    });

    fetchBackend('/events/getUsers?' + eventParams, 'GET')
      .then(response => response.json())
      .then(async users => {
        this.registrationNumbers(users)
        this.notRegistrationNumbers(users);
      });
  }

  async registrationNumbers(users) {
    let registrationObj = {
      'registered': 0,
      'checkedIn': 0,
      'waitlisted': 0,
      'cancelled': 0
    }
    users.forEach(user => {
      if (user.registrationStatus) {
        registrationObj[user.registrationStatus] = registrationObj[user.registrationStatus] ? registrationObj[user.registrationStatus] + 1 : 1;
      }
    })

    this.setState({
      rows: users,
      registrationObj: registrationObj
    });
  }

  async notRegistrationNumbers(users) {
    let faculties = {}, years = {}, dietary = {}, genders = {}
    users.forEach(user => {
      if (user.faculty) {
        faculties[user.faculty] = faculties[user.faculty] ? faculties[user.faculty] + 1 : 1;
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
        genders[user.gender] = genders[user.gender] ? genders[user.gender] + 1 : 1;
      }
    })

    this.setState({
      faculties: faculties,
      years: years,
      genders: genders,
      dietary: dietary
    });
  }

  async updateEventTableData(eventID) {
    const eventParams = new URLSearchParams({
      id: eventID
    });

    fetchBackend('/events/getUsers?' + eventParams, 'GET')
      .then(response => response.json())
      .then(async users => {
        this.registrationNumbers(users)
      });
  }

  componentDidMount() {
    this.getEventTableData(this.props.event.id);
  }

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
      switch (event.target.value) {
        case REGISTRATION_STATUS.REGISTERED:
          if (window.confirm(`Do you want to register ${rowData.fname} ${rowData.lname}?\nThis will send an email to the user.`)) {
            this.updateUserRegistrationStatus(rowData.id, REGISTRATION_STATUS.REGISTERED);
          }
          break;
        case REGISTRATION_STATUS.CHECKED_IN:
          if (window.confirm(`Do you want to check in ${rowData.fname} ${rowData.lname}?\nThis will NOT send an email to the user.`)) {
            this.updateUserRegistrationStatus(rowData.id, REGISTRATION_STATUS.CHECKED_IN);
          }
          break;
        case REGISTRATION_STATUS.WAITLISTED:
          if (window.confirm(`Do you want to waitlist ${rowData.fname} ${rowData.lname}?\nThis will send an email to the user.`)) {
            this.updateUserRegistrationStatus(rowData.id, REGISTRATION_STATUS.WAITLISTED);
          }
          break;
        case REGISTRATION_STATUS.CANCELLED:
          if (window.confirm(`Did ${rowData.fname} ${rowData.lname} cancel?\nThis will send an email to the user.`)) {
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
      <div>
        <div style={styles.stats}>
          <Typography style={styles.stat}>Registered: {this.state.registrationObj.registered}</Typography>
          <Typography style={styles.stat}>Checked in: {this.state.registrationObj.checkedIn}</Typography>
          <Typography style={styles.stat}>Waitlisted: {this.state.registrationObj.waitlisted}</Typography>
          <Typography style={styles.stat}>Cancelled: {this.state.registrationObj.cancelled}</Typography>
          <Typography style={styles.stat}>Total: {this.state.registrationObj.registered + this.state.registrationObj.checkedIn + this.state.registrationObj.waitlisted + this.state.registrationObj.cancelled}</Typography>
        </div>
        <div style={styles.stats}>
          <Typography style={styles.stat}>Faculty: </Typography>
          {Object.keys(this.state.faculties).map(key => (<Typography key={key} style={styles.stat}>{key}: {this.state.faculties[key]}</Typography>))}
        </div>
        <div style={styles.stats}>
          <Typography style={styles.stat}>Year level: </Typography>
          {Object.keys(this.state.years).map(key => (<Typography key={key} style={styles.stat}>{key}: {this.state.years[key]}</Typography>))}
        </div>
        <div style={styles.stats}>
          <Typography style={styles.stat}>Dietary: </Typography>
          {Object.keys(this.state.dietary).map(key => (<Typography key={key} style={styles.stat}>{key}: {this.state.dietary[key]}</Typography>))}
        </div>
        <div style={styles.stats}>
          <Typography style={styles.stat}>Gender: </Typography>
          {Object.keys(this.state.genders).map(key => (<Typography key={key} style={styles.stat}>{key}: {this.state.genders[key]}</Typography>))}
        </div>
        <div style={styles.stats}>
          <Typography style={styles.stat}>Heard about the event from: </Typography>
          {Object.keys(this.state.heardFrom).map(key => (<Typography key={key} style={styles.stat}>{key}: {this.state.heardFrom[key]}</Typography>))}
        </div>
        <MaterialTable
          title={`${this.props.event.ename} Attendance`}
          columns={[
            { title: 'First Name', field: 'fname' },
            { title: 'Last Name', field: 'lname' },
            {
              title: 'Student Number',
              field: 'id',
              type: 'numeric',
              sorting: false
            },
            { title: 'Email', field: 'email', sorting: false },
            {
              title: 'Registration Status',
              field: 'registrationStatus',
              sorting: false,
              render: rowData => (
                <div>
                  <Select
                    value={rowData.registrationStatus}
                    onClick={event => changeRegistration(event, rowData)}
                    style={{
                      backgroundColor:
                        rowData.registrationStatus === REGISTRATION_STATUS.CHECKED_IN
                          ? '#54D26E'
                          : rowData.registrationStatus === REGISTRATION_STATUS.WAITLISTED
                            ? '#F7D055'
                            : rowData.registrationStatus === REGISTRATION_STATUS.CANCELLED
                              ? '#E15453'
                              : '#FFF',
                      paddingLeft: '10px'
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
            padding: 'dense',
            pageSize: 15,
            pageSizeOptions: [15, 50, 100],
            actionsColumnIndex: 5,
            exportButton: true,
            headerStyle: {
              fontWeight: 'bold'
            },
            rowStyle: rowData => ({

            })
          }}
        />
      </div>

    );
  }
}
export default EventUserTable;
