import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import PieChart from './PieChart';
import { Typography } from "@material-ui/core";

const useStyles = makeStyles({
  card: {
    margin: "15px 10px 15px 0px",
    backgroundColor: "#293B61",
  },
});

const chartColors = [
  "#56CCF2",
  "#F2C027",
  "#6489F1",
  "#7AD040",
  "#0C73EA",
  "#E8FC67",
];

const SummaryBox = (props) => {
  const classes = useStyles();

  return (
    <Box m={2} px={4}>
      <Card className={classes.card}>
        <Box pt={3} px={4}>
          {" "}
          <Typography align="left" variant="h6">
            {" "}
            {props.title}
          </Typography>{" "}
        </Box>
        <div>
          <PieChart
            data={{
              labels: props.dataLabels,
              datasets: [
                {
                  label: props.dataSetLabel,
                  data: props.data,
                  backgroundColor: chartColors,
                  borderWidth: 0,
                },
              ],
            }}
          />
        </div>
      </Card>
    </Box>
  );
};

export default SummaryBox;
