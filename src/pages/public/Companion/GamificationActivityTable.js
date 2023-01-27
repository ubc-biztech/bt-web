import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';


const activities = [
  { name: "Submit a question for panelists prior to the event", points: "10 points" },
  { name: "Early check-in", points: "20 points" },
  { name: "Win the kickoff event *", points: "10 points" },
  { name: "Attend a workshop", points: "15 points each" },
  { name: "Win in your workshop-specific game", points: "50 points" },
  { name: "Take a photo at the photobooth with people from your table", points: "15 points" },
  { name: "Visit a company booth", points: "5 points each" },
  { name: "Lunch activities", points: "10 points each" },
  { name: "Participate in a Biztech Interview", points: "10 points" },
  { name: "Post on social media and tag @ubcbiztech *", points: "10 points" },
];

function GamificationActivityTable() {
  return (
    <>
      <TableContainer component={Paper} style={{ backgroundColor: 'transparent', marginTop: '10px', marginBottom: '10px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ color: "white", fontWeight: "bold" }}>Activity</TableCell>
              <TableCell align="right" style={{ color: "white", fontWeight: "bold" }}>Points</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {activities.map((activity, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row" style={{ color: "white" }}>
                  {activity.name}
                </TableCell>
                <TableCell align="right" style={{ color: "white" }}><b>{activity.points}</b></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ fontSize: "14px" }}>
        * Visit the Biztech booth and show your post to redeem!
      </div>
    </>
  );
};

export default GamificationActivityTable;