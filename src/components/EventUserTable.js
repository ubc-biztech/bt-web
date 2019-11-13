import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

// Can use virtualized window if concerned about efficiency in scaling
// e.g. > 200 users and want a scrollable window instead of expanding whole screen with scroll
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
            {users.map(user => (
              <TableRow key={user.name}>
                <TableCell component="th" scope="row">
                  {user.name}
                </TableCell>
                <TableCell>{user.studentNumber}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.checkedIn.toString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
}
