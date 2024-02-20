import React from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper
} from "@material-ui/core";


const activitiesDefault = [
  {
    name: "Early check-in",
    points: "25 points"
  },
  {
    name: "Ask a question during the panel discussion",
    points: "20 points"
  },
  {
    name: "Attend a workshop",
    points: "25 points each"
  },
  {
    name: "Post an Instagram story using the Blueprint event filter (Visit the Biztech booth and show your post to redeem!)",
    points: "30 points"
  },
  {
    name: "Take a photo at the photo booth",
    points: "20 points"
  },
  {
    name: "Take a photo with a professional at the photo booth",
    points: "35 points"
  },
  {
    name: "Get interviewed by BizTech’s marketing team for Instagram reels",
    points: "20 points"
  },
  {
    name: "View the attendee showcase & vote for a personal project!",
    points: "35 points"
  },
  {
    name: "Get a Blueprint souvenir 3D printed at Rapid x BizTech’s booth",
    points: "25 points each"
  },
];

function GamificationActivityTable({
  activitiesProp, textColor, backgroundColor
}) {
  const activities = activitiesProp || activitiesDefault;
  return (
    <>
      <div style={{
        width: "100%"
      }}>
        <TableContainer component={Paper} style={{
          backgroundColor: backgroundColor || "transparent",
          marginTop: "10px",
          marginBottom: "10px"
        }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{
                  color: textColor || "white",
                  fontWeight: "bold"
                }}>Activity</TableCell>
                <TableCell align="right" style={{
                  color: "black",
                  fontWeight: "bold"
                }}>Points</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {activities.map((activity, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row" style={{
                    color: textColor || "white",
                  }}>
                    {activity.name}
                  </TableCell>
                  <TableCell align="right" style={{
                    color: textColor || "white",
                  }}><b>{activity.points}</b></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default GamificationActivityTable;
