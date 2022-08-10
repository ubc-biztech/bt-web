import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Card, CardActionArea, CardHeader, CardMedia } from "@material-ui/core";
import {
  Star as StarIcon,
  StarBorder as StarBorderIcon,
} from "@material-ui/icons";

const useStyles = makeStyles({
  card: {
    width: "30%",
    margin: "15px 30px 15px 0",
  },
  media: {
    height: 250,
  },
  favouriteButton: {
    cursor: "pointer",
  },
});

function EventCard(props) {
  const {
    cardStyle = {},
    event,
    favourited = false,
    handleCardClick,
    handleFavourite = () => {},
    variant = "none",
  } = props;
  const classes = useStyles();

  const image = event.imageUrl || require("assets/default.png");

  return (
    <Card className={classes.card} style={cardStyle} key={event.id}>
      <CardActionArea
        onClick={(e) => {
          handleCardClick(e, event.id, event.year);
        }}
      >
        <CardMedia
          className={classes.media}
          component="img"
          image={image}
          title="Event photo"
        />
      </CardActionArea>
      <CardHeader
        title={event.ename}
        subheader={
          event.startDate
            ? new Date(event.startDate).toLocaleDateString("en-US", {
                day: "numeric",
                weekday: "long",
                month: "long",
                year: "numeric",
              })
            : ""
        }
        action={
          variant === "user" &&
          (favourited ? (
            <StarIcon
              fontSize="large"
              onClick={() => {
                handleFavourite(event.id, event.year, false);
              }}
              className={classes.favouriteButton}
            />
          ) : (
            <StarBorderIcon
              fontSize="large"
              onClick={() => {
                handleFavourite(event.id, event.year, true);
              }}
              className={classes.favouriteButton}
            />
          ))
        }
      ></CardHeader>
    </Card>
  );
}

export default EventCard;
