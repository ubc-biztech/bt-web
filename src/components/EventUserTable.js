import React from "react";
import MaterialTable from "material-table";
import { connect } from "react-redux";
import { API_URL, API_KEY } from '../utils';

function EventUserTable(props) {
  // current sample data, but will get from Events.js in the future
  let users = props.userData
  const eventID = props.eventID
  console.log(props.eventID)

  // generate more rows to test speed of table search
  function createData(name, studentNumber, email, checkedIn) {
    return { name, studentNumber, email, checkedIn };
  }

  const rows = [];

  function displayAction(checkedIn){
    let displayRegister = {
      icon: 'check',
      tooltip: 'Check-in member to event to confirm attendance',
      onClick: (event, rowData) => {
        // Do check-in operation 
        if (window.confirm("You want to check-in " + rowData.name + "?")){
          const registrationStatus = true;
          registerUser(rowData.studentNumber, registrationStatus)
        }
      }
    }
    let displayDeregister = {
      icon: 'remove',
      tooltip: 'Undo member check-in',
      onClick: (event, rowData) => {
        // Do undo check-in operation 
        if (window.confirm("You want to undo check-in " + rowData.name + "?")){
          const registrationStatus = false;
          registerUser(rowData.studentNumber, registrationStatus)
        }
      }
    }
    return checkedIn ? displayDeregister : displayRegister
  }

  for (let i = 0; i < users.length ; i += 1) {
    rows.push(
      createData(
        users[i].name,
        users[i].studentNumber,
        users[i].email,
        users[i].checkedIn
      )
    );
  }

  async function registerUser(id, status) {
    const body = JSON.stringify({
        eventID: eventID,
        id: id,
        status: status
    })
  
    fetch(API_URL + "/registration/create", {
        method: 'POST',
        headers: {
            'x-api-key': API_KEY,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body
    })
        .then((response) => response.json())
        .then((response) => {
            console.log(response)
        })
  }

  return (
    <MaterialTable
      title="Event Attendance"
      columns={[
        { title: "Full Name", field: "name"},
        {
          title: "Student Number",
          field: "studentNumber",
          type: "numeric",
          sorting: false
        },
        { title: "Email", field: "email", sorting: false }
        // { title: "CheckedIn", field: "checkedIn", type: "boolean" }
      ]}
      data={rows}
      options={{
        search: true,
        draggable: false,
        padding: "dense",
        pageSize: 20,
        pageSizeOptions: [20, 50, 100],
        actionsColumnIndex: 4,
        exportButton: true,
        headerStyle: {
          fontWeight: "bold"
        },
        rowStyle: rowData => ({
            backgroundColor: (rowData.checkedIn === true) ? '#54D26E' : '#FFF'
        })
      }}
      actions={[
        rowData => displayAction(rowData.checkedIn)
      ]}
    />
  );
}

const mapStateToProps = state => {
  return {
    userData: state.pageState.eventUserList
  }
}

export default connect(
  mapStateToProps, 
  null
)(EventUserTable);
