import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import HorizontalBarChart from "./HorizontalBarChart";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles({
  card: {
    margin: "15px 10px 15px 0px",
    backgroundColor: "#293B61",
  },
});

const SummaryHBarChart = (props) => {
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
        <HorizontalBarChart
          max={props.max}
          data={{
            labels: props.labels,
            datasets: [
              {
                data: props.data,
                backgroundColor: [
                  "#56CCF2",
                  "#56CCF2",
                  "#56CCF2",
                  "#56CCF2",
                  "#56CCF2",
                  "#56CCF2",
                  "#56CCF2",
                  "#56CCF2",
                  "#56CCF2",
                  "#56CCF2",
                  "#56CCF2",
                  "#56CCF2",
                ],
              },
            ],
          }}
        />
      </Card>
    </Box>
  );
};

export default SummaryHBarChart;
