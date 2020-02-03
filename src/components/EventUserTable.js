import React from "react";
import MaterialTable from "material-table";
import { Link } from "@material-ui/core";
import { useHistory, withRouter } from "react-router-dom";
// current sample data, but will get from Events.js in the future
let users = [
  {
    name: "Ian Mah",
    studentNumber: 159,
    email: "1@gmail.com",
    checkedIn: true
  },
  {
    name: "Derek Chen",
    studentNumber: 152,
    email: "2@gmail.com",
    checkedIn: false
  },
  {
    name: "Jacques Chen",
    studentNumber: 512,
    email: "3@gmail.com",
    checkedIn: true
  },
  {
    name: "Cris Mihailescu",
    studentNumber: 214,
    email: "4@gmail.com",
    checkedIn: true
  },
  {
    name: "Adin Kwok",
    studentNumber: 859,
    email: "5@gmail.com",
    checkedIn: false
  },
  {
    name: "Andy Luu",
    studentNumber: 104,
    email: "6@gmail.com",
    checkedIn: false
  }
];



// generate more rows to test speed of table search
function createData(name, studentNumber, email, checkedIn) {
  return { name, studentNumber, email, checkedIn };
}

const rows = [];


for (let i = 0; i < 200; i += 1) {
  const randomSelection = users[Math.floor(Math.random() * users.length)];
  rows.push(
    createData(
      randomSelection.name,
      Math.floor(Math.random() * 90000) + 10000,
      randomSelection.email,
      randomSelection.checkedIn
    )
  );
}



function EventUserTable() {

  const history = useHistory();
  function handleEditEventClick() {
    history.push({ pathname: "/edit-event" });
  }

  return (
    <div>
      <Link onClick={handleEditEventClick}>Edit Event</Link>
      <MaterialTable
        title="Members Attendance"
        columns={[
          { title: "Full Name", field: "name" },
          {
            title: "Student Number",
            field: "studentNumber",
            type: "numeric",
            sorting: false
          },
          { title: "Email", field: "email", sorting: false },
          { title: "CheckedIn", field: "checkedIn", type: "boolean" }
        ]}
        data={rows}
        options={{
          search: true,
          draggable: false,
          padding: "dense",
          pageSize: 20,
          pageSizeOptions: [20, 50, 100],
          headerStyle: {
            fontWeight: "bold"
          }
        }}
      />
    </div>

  );
}

export default withRouter(EventUserTable);