import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@material-ui/core";

const rewards = [
  { name: "iPad", points: "150 points" },
  { name: "Sony WH-1000XM5 Headphones", points: "120 points" },
  { name: "Fujifilm Mini Instax", points: "90 points" },
  { name: "Fujifilm Mini Instax", points: "70 points" },
  { name: "Rocketbook Pro Letter Sized", points: "50 points" },
];

function GamificationRewardTable() {
  return (
    <>
      <TableContainer component={Paper} style={{ backgroundColor: "transparent", marginTop: '10px', marginBottom: '10px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ color: "white", fontWeight: "bold" }}>Reward</TableCell>
              <TableCell align="right" style={{ color: "white", fontWeight: "bold" }}>Points</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rewards.map((reward, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row" style={{ color: "white" }}>
                  {reward.name}
                </TableCell>
                <TableCell align="right" style={{ color: "white" }}><b>{reward.points}</b></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default GamificationRewardTable;

