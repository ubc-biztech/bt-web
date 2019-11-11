import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

// Can use virtualized window if concerned about efficiency in scaling
// e.g. > 200 users and want a
const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  paper: {
    marginTop: theme.spacing(3),
    width: "100%",
    overflowX: "auto",
    marginBottom: theme.spacing(2)
  },
  table: {
    minWidth: 650
  }
}));

function createData(name, studentNumber, email, checkedIn) {
  return { name, studentNumber, email, checkedIn };
}

// could modify to be an array of user objects with properties
let users = [
  ["Ian Mah", 159, 6.0, 24, true],
  ["Adin Kwok", 237, 9.0, 37, false],
  ["Andy Lu", 262, 16.0, 24, false],
  ["Derek Chen", 305, 3.7, 67, false],
  ["Jacques Chen", 356, 16.0, 49, true],
  ["Cris Mihailescu", 356, 16.0, 49, true]
];

const rows = [];

// replace 10 with users.length from database
for (let i = 0; i < 10; i += 1) {
  const randomSelection = users[Math.floor(Math.random() * users.length)];
  rows.push(createData(...randomSelection));
}

export default function EventUserTable() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Full Name</TableCell>
              <TableCell>Student Number</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Checked In</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell>{row.studentNumber}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.checkedIn}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
}
