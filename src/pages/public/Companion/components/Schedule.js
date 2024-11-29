import React from "react";

import {
  TableBody, TableCell, TableRow,Table, TableHead, TableContainer, Paper
} from "@material-ui/core";


import {
  constantStyles
} from "../../../../constants/_constants/companion";


const Schedule = (props) => {
  const {
    data,
    renderMobileOnly,
    date,
    location,
    styles
  } = props;

  return (
    <div id="Schedule" style={{
      ...styles.column,
      width: "90%"
    }}>
      <h1 style={renderMobileOnly ? styles.mobileTitle : styles.title}>Your Schedule</h1>
      <h3 style={{
        color: constantStyles.textColor,
        ...(renderMobileOnly && {
          fontSize: constantStyles.mobileFontSize,
          marginBottom: "8px",
          marginTop: "-12px"
        })
      }}>{date}</h3>
      <h5 style={{
        color: constantStyles.textColor,
        ...(renderMobileOnly && {
          fontSize: constantStyles.mobileFontSize,
          marginBottom: "8px"
        })
      }}>{location}</h5>
      <TableContainer component={Paper} style={styles.tableBorder}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align = "center" style={{
                color: constantStyles.textColor,
                fontWeight: "bold",
                ...(renderMobileOnly && {
                  fontSize: constantStyles.mobileFontSize
                })
              }}>Time</TableCell>
              <TableCell align="center" style={{
                color: constantStyles.textColor,
                fontWeight: "bold",
                ...(renderMobileOnly && {
                  fontSize: constantStyles.mobileFontSize
                })
              }}>Activity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                <TableCell
                  component="th"
                  scope="row"
                  align="center"
                  style={{
                    color: constantStyles.textColor,
                    ...(renderMobileOnly && {
                      fontSize: constantStyles.mobileFontSize
                    })
                  }}
                >
                  <b>{item.date}</b>
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    color: constantStyles.textColor,
                    ...(renderMobileOnly && {
                      fontSize: constantStyles.mobileFontSize
                    })
                  }}
                >
                  {item.title}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Schedule;

