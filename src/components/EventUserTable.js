import React from "react";
import MaterialTable from "material-table";
import { connect } from "react-redux"
//
function EventUserTable(props) {
  // current sample data, but will get from Events.js in the future
  let users = props.userData

  // generate more rows to test speed of table search
  function createData(name, studentNumber, email, checkedIn) {
    return { name, studentNumber, email, checkedIn };
  }

  const rows = [];

  function updateUser(studentNumber){
    let userToUpdateIndex = rows.findIndex((user => user.studentNumber === studentNumber));
    rows[userToUpdateIndex].checkedIn = !rows[userToUpdateIndex].checkedIn
  }

  function displayAction(checkedIn){
    let displayRegister = {
      icon: 'check',
      tooltip: 'Check-in member to event to confirm attendance',
      onClick: (event, rowData) => {
        // Do sign-in operation 
        if (window.confirm("You want to check-in " + rowData.name + "?")){
        console.log("update table for " + rowData.studentNumber)
        updateUser(rowData.studentNumber)
        }
      }
    }
    let displayDeregister = {
      icon: 'remove',
      tooltip: 'Undo member check-in',
      onClick: (event, rowData) => {
        // Do sign-in operation 
        if (window.confirm("You want to undo check-in " + rowData.name + "?")){
          console.log("update table for " + rowData.studentNumber)
          updateUser(rowData.studentNumber)
        }
      }
    }
    return checkedIn ? displayDeregister : displayRegister
  }

  // let currentCheckedIn = 0
  // let notCheckedIn = 0
  // let total = currentCheckedIn - notCheckedIn
  // let description = "Total Registered: " + total + " | Checked In: " + currentCheckedIn + " | Not Checked In: " + notCheckedIn

  for (let i = 0; i < users.length ; i += 1) {
    // if (users[i].checkedIn === true){
    //   currentCheckedIn++
    // } else {
    //   notCheckedIn++
    // }
    rows.push(
      createData(
        users[i].name,
        users[i].studentNumber,
        users[i].email,
        users[i].checkedIn
      )
    );
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
