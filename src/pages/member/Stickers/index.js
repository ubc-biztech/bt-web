import {
  Button,
  Typography,
  Paper,
  Grid,
  Box,
  TextField,
  Tooltip,
  Divider,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

import houseImage from "../../../assets/house.svg";

import { COLORS } from "../../../constants/_constants/theme";

const useStyles = makeStyles({
  container: {
    maxWidth: "90%",
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    margin: "75px 110px 75px 0px",
    padding: "50px 75px",
  },
  title: {
    fontSize: "36px",
  },
  stickerImage: {
    border: `3px solid ${COLORS.LIGHT_YELLOW}`,
    height: "125px",
    width: "125px",
  },
  sticker: {
    height: "150px",
    width: "150px",
    borderRadius: "100%",
    border: "3px solid gold",
  },
  stickerInfo: {
    padding: "8px",
  },
  unlockedText: {
    color: `${COLORS.LIGHT_YELLOW}`,
  },
  divider: {
    background: "white",
  },
  inputbox: {
    // border: "1px solid red",
  },
  buttonbox: {
    // border: "1px solid red",
  },
  button: {
    width: "100%",
    height: "100%",
    marginLeft: "0",
  },
  textField: {
    borderColor: "1px solid white",
  },
  root: {
    // "& label.Mui-focused": {
    //   color: "white",
    // },
    // "& .MuiInput-underline:after": {
    //   borderBottomColor: "yellow",
    // },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "white",
      },
      "&:hover fieldset": {
        borderColor: "white",
      },
      "&.Mui-focused fieldset": {
        borderColor: "white",
      },
    },
  },
});

function StickerCodeForm(props) {
  const onSubmit = () => console.log("Submitting sticker code!");

  const classes = useStyles();

  return (
    <>
      <form onSubmit={onSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={8} md={6} className={classes.inputbox}>
            <TextField
              // defaultValue={initialValues.fname}
              variant="outlined"
              label="Enter Sticker Code"
              // helperText={textFieldError("fname")}
              // error={!!textFieldError("fname")}
              id="stickerCode"
              onChange={() => console.log("changing sticker code")}
              classes={{
                root: classes.root,
              }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={3} md={2} className={classes.buttonbox}>
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              type="submit"
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
}

function StickerInfo({ title, description }) {
  const classes = useStyles();

  return (
    <Box className={classes.stickerInfo}>
      <Box mb={1}>
        <Typography variant="h5">{title}</Typography>
        <Divider className={classes.divider} />
      </Box>
      <Typography variant="body2">{description}</Typography>
      <Typography variant="body2" className={classes.unlockedText}>
        Unlocked!
      </Typography>
    </Box>
  );
}

function Sticker({ src }) {
  const classes = useStyles();

  return (
    <Tooltip
      arrow
      title={
        <StickerInfo
          title="Sticker Title"
          description="Insert a silly description for this sticker here! For example, explain how to get this sticker."
        />
      }
    >
      <img src={src} className={classes.sticker}></img>
    </Tooltip>
  );
}

function Stickers(props) {
  const classes = useStyles();

  const images = [];
  for (let i = 0; i < 24; i++) {
    images.push(houseImage);
  }

  return (
    <>
      <Paper className={classes.container}>
        <Box mb={4}>
          <Typography className={classes.title} variant="h1">
            Sticker Collection
          </Typography>
        </Box>
        <Box mb={4}>
          <StickerCodeForm />
        </Box>
        <Grid container spacing={5}>
          {images.map((image) => {
            return (
              <Grid key={image} item md={2}>
                <Sticker src={image} />
              </Grid>
            );
          })}
        </Grid>
      </Paper>
    </>
  );
}

export default Stickers;
