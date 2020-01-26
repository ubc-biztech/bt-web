import React from "react";
import MaterialTable from "material-table";
import { connect } from "react-redux"

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
    rows[userToUpdateIndex].name = "BIZTECH"

    console.log(rows[userToUpdateIndex].studentNumber + "'s name is now " + rows[userToUpdateIndex].name)
  }

  for (let i = 0; i < users.length; i += 1) {
    const randomSelection = users[Math.floor(Math.random() * users.length)];
    rows.push(
      createData(
        randomSelection.name,
        randomSelection.studentNumber,
        randomSelection.email,
        randomSelection.checkedIn
      )
    );
  }

  return (
    <MaterialTable
      title="Event Attendance"
      columns={[
        { title: "Full Name", field: "name" },
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
        }
      }}
      actions={[
        {
          icon: 'check',
          tooltip: 'Sign-in member to event to confirm attendance',
          disabled: false,
          onClick: (event, rowData) => {
            // Do sign-in operation 
            if (window.confirm("You want to register " + rowData.name + "?")){
              console.log("update table for " + rowData.studentNumber)
              updateUser(rowData.studentNumber)
            }
          }
        }
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
