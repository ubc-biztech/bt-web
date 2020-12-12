import React, { Component } from 'react'

import MaterialTable from 'material-table'
import { RadialChart, XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, VerticalBarSeries } from 'react-vis'

import { MenuItem, Paper, Select, Typography } from '@material-ui/core'

import { REGISTRATION_STATUS, COLORS } from 'constants/index'
import { fetchBackend } from 'utils'

const styles = {
  stats: {
    width: '100%',
    display: 'flex',
    margin: '6px',
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
export class EventStatsTable extends Component {
  constructor (props) {
    super(props)
    this.state = {
      registrations: {},
      faculties: {},
      years: {},
      dietary: {},
      genders: {},
      heardFrom: {},
      registrationVisible: { visible: false, style: { display: 'none' } },
      facultyVisible: { visible: false, style: { display: 'none' } },
      yearVisible: { visible: false, style: { display: 'none' } },
      dietaryVisible: { visible: false, style: { display: 'none' } },
      gendersVisible: { visible: false, style: { display: 'none' } },
      heardFromVisible: { visible: false, style: { display: 'none' } }
    }
  }

  async updateUserRegistrationStatus (id, registrationStatus) {
    const body = {
      eventID: this.props.event.id,
      year: this.props.event.year,
      registrationStatus
    }
    console.log(body)
    console.log("HERE")
    await fetchBackend(`/registrations/${id}`, 'PUT', body)

    this.getEventTableData(this.props.event.id, this.props.event.year)
  }

  /* updates stats and the rows in the table
     faculty, gender, dietary, and year stats are only computed on the initial render of the component
     # of registered/checkedin etc. is computed every single time this function is called
  */
  async getEventTableData (eventID, eventYear) {
    let params = new URLSearchParams({
      eventID: eventID,
      year: eventYear

    })
    await fetchBackend(`/registrations?${params}`, 'GET')
      .then(response => {
        const heardFrom = {}
        response.data.forEach(user => {
          if (user.heardFromData) {
            heardFrom[user.heardFrom] = heardFrom[user.heardFrom] ? heardFrom[user.heardFrom] + 1 : 1
          }
        })
        this.setState({ heardFrom })
      })
      .catch((err) => {
        console.log(err)
        console.log('No registrations for this event')
      })

    params = new URLSearchParams({
      users: true
    })
    console.log(eventYear)
    await fetchBackend(`/events/${eventID}/${eventYear.toString()}?${params}`, 'GET')
      .then(async users => {
        this.registrationNumbers(users)
        this.notRegistrationNumbers(users)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  /**
   *
   * @param {array of users} users
   * calculates the stats for registration and updates the data for charts
   * each data set is an array of data (arrays) sets b/c different charts accept different data
   */
  async registrationNumbers (users) {
    const registrations = {
    }
    users.forEach(user => {
      if (user.registrationStatus) {
        registrations[user.registrationStatus] = registrations[user.registrationStatus] ? registrations[user.registrationStatus] + 1 : 1
      }
    })

    this.setState({
      rows: users,
      registrations
    })
  }

  /**
  *
  * @param {array of users} users
  * calculates any stats that aren't registration stats
  * each data set is an array of data (arrays) sets b/c different charts accept different data
  */
  async notRegistrationNumbers (users) {
    const faculties = {}; const years = {}; const dietary = {}; const genders = {}
    users.forEach(user => {
      if (user.faculty) {
        faculties[user.faculty] = faculties[user.faculty] ? faculties[user.faculty] + 1 : 1
      }
      if (user.year) {
        const yearInt = parseInt(user.year)
        if (yearInt) {
          years[yearInt] = years[yearInt] ? years[yearInt] + 1 : 1
        }
      }
      if (user.diet) {
        dietary[user.diet] = dietary[user.diet] ? dietary[user.diet] + 1 : 1
      }
      if (user.gender) {
        genders[user.gender] = genders[user.gender] ? genders[user.gender] + 1 : 1
      }
    })

    this.setState({
      faculties,
      years,
      genders,
      dietary
    })
  }

  async updateEventTableData (eventID) {
    const params = new URLSearchParams({
      users: true
    })

    await fetchBackend(`/events/${eventID}?${params}`, 'GET')
      .then(async users => {
        this.registrationNumbers(users)
      })
  }

  componentDidMount () {
    this.getEventTableData(this.props.event.id,this.props.event.year)
  }

  /*
    the if statement is only used if an exec goes from one event directly to another event (not implemented right now)
  */
  componentDidUpdate (prevProps) {
    if (prevProps.event.id !== this.props.event.id) {
      this.updateEventTableData(this.props.event.id)
    }
  }

  render () {
    /**
     * Helper function to determine whether to display action for check-in or undo check-in
     * @param {*} rowData data about the current row
    */
    const changeRegistration = (event, rowData) => {
      switch (event.target.value) {
        case REGISTRATION_STATUS.REGISTERED:
          if (window.confirm(`Do you want to register ${rowData.fname} ${rowData.lname}?\nThis will send an email to the user.`)) {
            this.updateUserRegistrationStatus(rowData.id, REGISTRATION_STATUS.REGISTERED)
          }
          break
        case REGISTRATION_STATUS.CHECKED_IN:
          if (window.confirm(`Do you want to check in ${rowData.fname} ${rowData.lname}?\nThis will NOT send an email to the user.`)) {
            this.updateUserRegistrationStatus(rowData.id, REGISTRATION_STATUS.CHECKED_IN)
          }
          break
        case REGISTRATION_STATUS.WAITLISTED:
          if (window.confirm(`Do you want to waitlist ${rowData.fname} ${rowData.lname}?\nThis will send an email to the user.`)) {
            this.updateUserRegistrationStatus(rowData.id, REGISTRATION_STATUS.WAITLISTED)
          }
          break
        case REGISTRATION_STATUS.CANCELLED:
          if (window.confirm(`Did ${rowData.fname} ${rowData.lname} cancel?\nThis will send an email to the user.`)) {
            this.updateUserRegistrationStatus(rowData.id, REGISTRATION_STATUS.CANCELLED)
          }
          break
        default:
          return {}
      }
    }

    /**
     * Creates stats + graphs/charts
     * Creates event table using MaterialTable library
     */
    return (
      <React.Fragment>
        <Statistic statName='Registration status: ' statObj={this.state.registrations} />
        <Statistic statName='Faculty: ' statObj={this.state.faculties} />
        <Statistic statName='Year level: ' statObj={this.state.years} />
        <Statistic statName='Dietary: ' statObj={this.state.dietary} />
        <Statistic statName='Gender: ' statObj={this.state.genders} />
        <Statistic statName='Heard about event from: ' statObj={this.state.heardFrom} />

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
                          ? COLORS.LIGHT_GREEN
                          : rowData.registrationStatus === REGISTRATION_STATUS.WAITLISTED
                            ? COLORS.LIGHT_YELLOW
                            : rowData.registrationStatus === REGISTRATION_STATUS.CANCELLED
                              ? COLORS.LIGHT_RED
                              : COLORS.LIGHT_BACKGROUND_COLOR,
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
              fontWeight: 'bold',
              backgroundColor: COLORS.CARD_PAPER_COLOR,
              color: COLORS.FONT_COLOR
            },
            rowStyle: rowData => ({

            })
          }}
        />
      </React.Fragment>
    )
  }
}

/**
 * represents a statistic and shows a row of the stats with a dropdown for charts
 */
class Statistic extends React.Component {
  constructor (props) {
    super(props)
    this.changeVisibility = this.changeVisibility.bind(this)
    this.state = {
      visibility: { visible: false, style: { display: 'none' } }
    }
  }

  /*
  changes the visibility of the stats of whichever div was selected
  */
  changeVisibility () {
    const invisible = { visible: false, style: { display: 'none' } }
    const visible = { visible: true, style: { display: 'flex', paddingBottom: '20px', paddingLeft: '50px' } }

    if (this.state.visibility.visible) {
      this.setState({ visibility: invisible })
    } else {
      this.setState({ visibility: visible })
    }
  }

  render () {
    const chartData = [
      Object.keys(this.props.statObj).map(key => {
        return {
          label: key,
          angle: this.props.statObj[key]
        }
      }),
      Object.keys(this.props.statObj).map(key => {
        return {
          x: key,
          y: this.props.statObj[key]
        }
      })
    ]
    return (
      <Paper>
        <div style={styles.stats} onClick={this.changeVisibility}>
          <Typography style={styles.stat}>{this.props.statName} </Typography>
          {Object.keys(this.props.statObj).map(key => (<Typography key={key} style={styles.stat}>{key}: {this.props.statObj[key]}</Typography>))}
          {this.props.statName === 'Registration status: ' ? <Typography style={styles.stat}>Total: {Object.values(this.props.statObj).reduce((total, amount) => total + amount, 0)}</Typography> : <Typography />}
        </div>
        <div style={this.state.visibility.style}>
          <RadialChart
            width={300}
            height={300}
            data={chartData[0]}
            showLabels={true}
            radius={140}
            innerRadius={100}
          />
          <XYPlot margin={{ left: 40, right: 30, top: 30, bottom: 70 }} xType='ordinal' width={300} height={300} >
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis tickLabelAngle={-45} />
            <YAxis />
            <VerticalBarSeries
              width={300}
              height={300}
              data={chartData[1]}
            />
          </XYPlot>
        </div>
      </Paper>
    )
  }
}
export default EventStatsTable
