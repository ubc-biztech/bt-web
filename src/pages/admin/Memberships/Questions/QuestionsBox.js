import React from "react";
import {
  makeStyles
} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import {
  Typography
} from "@material-ui/core";

const useStyles = makeStyles({
  card: {
    margin: "15px 10px 15px 0px",
    backgroundColor: "#293B61",
  },
  questionLabel: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

const QuestionsBox = (props) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <Box py={2} px={4}>
        <div className={classes.questionLabel}>
          <Typography>{props.title}</Typography>
          <Box className={classes.numResponses}>{props.filter}</Box>
        </div>
      </Box>
    </Card>
  );
};

export default QuestionsBox;
