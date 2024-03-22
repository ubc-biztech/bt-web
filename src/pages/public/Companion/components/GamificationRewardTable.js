import React from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper
} from "@material-ui/core";

const rewardsDefault = [
  {
    name: "TBD1",
    points: "200 points"
  },
  {
    name: "TBD2",
    points: "150 points"
  },
  {
    name: "TBD3",
    points: "120 points"
  },
  {
    name: "Blueprint Hoodie",
    points: "70 points"
  },
];

function GamificationRewardTable({
  rewardsProp, textColor, backgroundColor
}) {
  const rewards = rewardsProp || rewardsDefault;
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
                }}>Reward</TableCell>
                <TableCell align="right" style={{
                  color: textColor || "white",
                  fontWeight: "bold"
                }}>Points</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rewards.map((reward, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row" style={{
                    color: textColor || "white",
                  }}>
                    {reward.name}
                  </TableCell>
                  <TableCell align="right" style={{
                    color: textColor || "white",
                  }}><b>{reward.points}</b></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}

export default GamificationRewardTable;

