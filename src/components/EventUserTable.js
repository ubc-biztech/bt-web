import React, { Component } from 'react';
import MaterialTable from 'material-table';
import { fetchBackend } from '../utils';
import { REGISTRATION_STATUS } from '../constants/Constants';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import { RadialChart, XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, VerticalBarSeries } from 'react-vis';

const styles = {
  stats: {
    width: '100%',
    display: 'flex',
    margin: '6px',
    borderRadius: '20px',
    boxShadow: 'rgba(0, 0, 0, 0.4) 0 0 10px',
    cursor: 'pointer'
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
    this.changeVisibility = this.changeVisibility.bind(this)
    this.state = {
      registrationObj: { temp: 0 },
      faculties: {},
      years: {},
      dietary: {},
      genders: {},
      heardFrom: {},
      'registrationVisible': { visible: false, style: { display: 'none' } },
      facultyVisible: { visible: false, style: { display: 'none' } },
      yearVisible: { visible: false, style: { display: 'none' } },
      dietaryVisible: { visible: false, style: { display: 'none' } },
      gendersVisible: { visible: false, style: { display: 'none' } },
      heardFromVisible: { visible: false, style: { display: 'none' } }
    };
  }

  async updateUserRegistrationStatus(id, registrationStatus) {
    const body = {
      eventID: this.props.event.id,
      registrationStatus
    };

    await fetchBackend(`/registrations/${id}`, 'PUT', body);

    this.getEventTableData(this.props.event.id);
  }

  /* updates stats and the rows in the table
     faculty, gender, dietary, and year stats are only computed on the initial render of the component
     # of registered/checkedin etc. is computed every single time this function is called
  */
  async getEventTableData(eventID) {
    let params = new URLSearchParams({
      eventID: eventID
    })
    await fetchBackend(`/registrations/?${params}`, 'GET')
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

    params = new URLSearchParams({
      users: true
    });

    await fetchBackend(`/events/${eventID}?${params}`, 'GET')
      .then(async users => {
        this.registrationNumbers(users)
        this.notRegistrationNumbers(users);
      });
  }

  async registrationNumbers(users) {
    let registrationObj = {
    }
    users.forEach(user => {
      if (user.registrationStatus) {
        registrationObj[user.registrationStatus] = registrationObj[user.registrationStatus] ? registrationObj[user.registrationStatus] + 1 : 1;
      }
    })

    this.setState({
      rows: users,
      registrationObj
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
      faculties,
      years,
      genders,
      dietary
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

  /*
    the if statement is only used if an exec goes from one event directly to another event (not implemented right now)
  */
  componentDidUpdate(prevProps) {
    if (prevProps.event.id !== this.props.event.id) {
      this.updateEventTableData(this.props.event.id);
    }
  }

  /*
    changes the visibility of the stats of whichever div was selected
  */
  changeVisibility(event) {
    const id = event.target.id
    const invisible = { visible: false, style: { display: 'none' } }
    const visible = { visible: true, style: { display: 'flex', paddingBottom: '20px', paddingLeft: '50px' } }
    switch (id) {
      case 'registration':
        if (this.state.registrationVisible.visible) {
          this.setState({ registrationVisible: invisible })
        } else {
          this.setState({ registrationVisible: visible })
        }
        break;
      case 'faculties':
        if (this.state.facultyVisible.visible) {
          this.setState({ facultyVisible: invisible })
        } else {
          this.setState({ facultyVisible: visible })
        }
        break;
      case 'year':
        if (this.state.yearVisible.visible) {
          this.setState({ yearVisible: invisible })
        } else {
          this.setState({ yearVisible: visible })
        }
        break;
      case 'dietary':
        if (this.state.dietaryVisible.visible) {
          this.setState({ dietaryVisible: invisible })
        } else {
          this.setState({ dietaryVisible: visible })
        }
        break;
      case 'gender':
        if (this.state.gendersVisible.visible) {
          this.setState({ gendersVisible: invisible })
        } else {
          this.setState({ gendersVisible: visible })
        }
        break;
      case 'heardFrom':
        if (this.state.heardFromVisible.visible) {
          this.setState({ heardFromVisible: invisible })
        } else {
          this.setState({ heardFromVisible: visible })
        }
        break;
      default:
        ;
    }
  }

  render() {
    //each data set is an array of data (arrays) sets b/c different charts accept different data
    const registrationData = [
      Object.keys(this.state.registrationObj).map(key => {
        return {
          label: key,
          angle: this.state.registrationObj[key]
        }
      }),
      Object.keys(this.state.registrationObj).map(key => {
        return {
          x: key,
          y: this.state.registrationObj[key]
        }
      })
    ]
    const facultiesData = [
      Object.keys(this.state.faculties).map(key => {
        return {
          label: key,
          angle: this.state.faculties[key]
        }
      }),
      Object.keys(this.state.faculties).map(key => {
        return {
          x: key,
          y: this.state.faculties[key]
        }
      })
    ]
    const yearData = [
      Object.keys(this.state.years).map(key => {
        return {
          label: key,
          angle: this.state.years[key]
        }
      }),
      Object.keys(this.state.years).map(key => {
        return {
          x: key,
          y: this.state.years[key]
        }
      })
    ]
    const dietaryData = [
      Object.keys(this.state.dietary).map(key => {
        return {
          label: key,
          angle: this.state.dietary[key]
        }
      }),
      Object.keys(this.state.dietary).map(key => {
        return {
          x: key,
          y: this.state.dietary[key]
        }
      })
    ]
    const gendersData = [
      Object.keys(this.state.genders).map(key => {
        return {
          label: key,
          angle: this.state.genders[key]
        }
      }),
      Object.keys(this.state.genders).map(key => {
        return {
          x: key,
          y: this.state.genders[key]
        }
      })
    ]
    const heardFromData = [
      Object.keys(this.state.heardFrom).map(key => {
        return {
          label: key,
          angle: this.state.heardFrom[key]
        }
      }),
      Object.keys(this.state.heardFrom).map(key => {
        return {
          x: key,
          y: this.state.heardFrom[key]
        }
      })
    ]
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
     * Creates stats + graphs/charts
     * Creates event table using MaterialTable library
     */
    return (
      <div>
        <div style={styles.stats} id='registration' onClick={this.changeVisibility}>
          <Typography style={styles.stat}>Registration status: </Typography>
          {Object.keys(this.state.registrationObj).map(key => (<Typography key={key} style={styles.stat}>{key}: {this.state.registrationObj[key]}</Typography>))}
          <Typography style={styles.stat}>Total: {Object.values(this.state.registrationObj).reduce((total, amount) => total + amount)}</Typography>
        </div>
        <div style={this.state.registrationVisible.style}>
          <RadialChart
            width={300}
            height={300}
            data={registrationData[0]}
            showLabels={true}
            radius={140}
            innerRadius={100}
          />
          <XYPlot margin={{ left: 40, right: 40, top: 40, bottom: 70 }} xType="ordinal" width={300} height={300} >
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis tickLabelAngle={-45} />
            <YAxis />
            <VerticalBarSeries
              width={300}
              height={300}
              data={registrationData[1]}
            />
          </XYPlot>
        </div>
        <div style={styles.stats} id='faculties' onClick={this.changeVisibility}>
          <Typography style={styles.stat}>Faculty: </Typography>
          {Object.keys(this.state.faculties).map(key => (<Typography key={key} style={styles.stat}>{key}: {this.state.faculties[key]}</Typography>))}
        </div>
        <div style={this.state.facultyVisible.style}>
          <RadialChart
            width={300}
            height={300}
            data={facultiesData[0]}
            showLabels={true}
            radius={140}
            innerRadius={100}
          />
          <XYPlot margin={{ left: 40, right: 30, top: 30, bottom: 70 }} xType="ordinal" width={300} height={300} >
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis tickLabelAngle={-45} />
            <YAxis />
            <VerticalBarSeries
              width={300}
              height={300}
              data={facultiesData[1]}
            />
          </XYPlot>
        </div>
        <div style={styles.stats} id='year' onClick={this.changeVisibility}>
          <Typography style={styles.stat}>Year level: </Typography>
          {Object.keys(this.state.years).map(key => (<Typography key={key} style={styles.stat}>{key}: {this.state.years[key]}</Typography>))}
        </div>
        <div style={this.state.yearVisible.style}>
          <RadialChart
            width={300}
            height={300}
            data={yearData[0]}
            showLabels={true}
            radius={140}
            innerRadius={100}
          />
          <XYPlot margin={{ left: 40, right: 30, top: 30, bottom: 70 }} xType="ordinal" width={300} height={300} >
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis tickLabelAngle={-45} />
            <YAxis />
            <VerticalBarSeries
              width={300}
              height={300}
              data={yearData[1]}
            />
          </XYPlot>
        </div>
        <div style={styles.stats} id='dietary' onClick={this.changeVisibility}>
          <Typography style={styles.stat}>Dietary: </Typography>
          {Object.keys(this.state.dietary).map(key => (<Typography key={key} style={styles.stat}>{key}: {this.state.dietary[key]}</Typography>))}
        </div>
        <div style={this.state.dietaryVisible.style}>
          <RadialChart
            width={300}
            height={300}
            data={dietaryData[0]}
            showLabels={true}
            radius={140}
            innerRadius={100}
          />
          <XYPlot margin={{ left: 40, right: 30, top: 30, bottom: 70 }} xType="ordinal" width={300} height={300} >
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis tickLabelAngle={-45} />
            <YAxis />
            <VerticalBarSeries
              width={300}
              height={300}
              data={dietaryData[1]}
            />
          </XYPlot>
        </div>
        <div style={styles.stats} id='gender' onClick={this.changeVisibility}>
          <Typography style={styles.stat}>Gender: </Typography>
          {Object.keys(this.state.genders).map(key => (<Typography key={key} style={styles.stat}>{key}: {this.state.genders[key]}</Typography>))}
        </div>
        <div style={this.state.gendersVisible.style}>
          <RadialChart
            width={300}
            height={300}
            data={gendersData[0]}
            showLabels={true}
            radius={140}
            innerRadius={100}
          />
          <XYPlot margin={{ left: 40, right: 30, top: 30, bottom: 70 }} xType="ordinal" width={300} height={300} >
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis tickLabelAngle={-45} />
            <YAxis />
            <VerticalBarSeries
              width={300}
              height={300}
              data={gendersData[1]}
            />
          </XYPlot>
        </div>
        <div style={styles.stats} id='heardFrom' onClick={this.changeVisibility}>
          <Typography style={styles.stat}>Heard about the event from: </Typography>
          {Object.keys(this.state.heardFrom).map(key => (<Typography key={key} style={styles.stat}>{key}: {this.state.heardFrom[key]}</Typography>))}
        </div>
        <div style={this.state.heardFromVisible.style}>
          <RadialChart
            width={300}
            height={300}
            data={heardFromData[0]}
            showLabels={true}
            radius={140}
            innerRadius={100}
          />
          <XYPlot margin={{ left: 40, right: 30, top: 30, bottom: 70 }} xType="ordinal" width={300} height={300} >
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis tickLabelAngle={-45} />
            <YAxis />
            <VerticalBarSeries
              width={300}
              height={300}
              data={heardFromData[1]}
            />
          </XYPlot>
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
