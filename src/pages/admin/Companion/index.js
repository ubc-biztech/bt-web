import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";

import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Box,
  Paper,
  TextField,
  Checkbox,
  Button,
  Tooltip,
  Divider,
} from "@material-ui/core";
import { fetchBackend } from "utils";
import { COLORS } from "constants/index";

const useStyles = makeStyles({
  card: {
    width: "45%",
    margin: "15px 30px 15px 0",
  },
  media: {
    height: 250,
  },
  row: {
    display: "flex",
    paddingLeft: "15px",
  },
  columnLeft: {
    flex: "50%",
    textAlign: "left",
  },
  passedCard: {
    width: "45%",
    margin: "15px 30px 15px 0",
    opacity: "50%"
  },
  section: {
    marginBottom: 16,
    padding: 16
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "auto auto",
    gap: 20
  },
  rowFlex: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    marginBottom: 8,
  },
  columnFlex: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  divider: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  }
});

const Companion = () => {
  const [QRs, setQRs] = useState([]);
  const [newQR, setNewQR] = useState({
    id: "",
    eventID: "",
    year: new Date().getFullYear().toString(),
    points: "0",
    isUnlimitedScans: false,
  });

  const [errors, setErrors] = useState({
    id: false,
    eventID: false,
    year: false,
    points: false
  })

  const classes = useStyles();

  const fetchQRs = async () => {
    try {
      const data = await fetchBackend("/qr", "GET", undefined);
      setQRs(data);
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchQRs();
  }, [])

  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  const generateIDString = (length) => {
      let result = "";
      const charactersLength = characters.length;
      for ( let i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result + "-";
  }

  const createQR = async () => {
    const keys = Object.keys(errors)
    const newErrors = { ...errors }
    let validation = true
    keys.forEach((key) => {
      if (newQR[key] === "") {
        validation = false
        newErrors[key] = true
      }
    })
    if (validation) {
      try {
        const data = { 
          ...newQR, 
          id: generateIDString(5) + newQR.id, 
          year: Number(newQR.year), 
          points: Number(newQR.points), 
          isActive: true  
        }
        const res = await fetchBackend("/qr", "POST", data)
        setNewQR({
          id: "",
          eventID: "",
          year: new Date().getFullYear(),
          points: 0,
          isUnlimitedScans: false,
        })
        alert(res.message)
        fetchQRs()
      } catch (err) {
        console.log(err)
      }
    } else {
      setErrors(newErrors)
    }
  }

  return (
    <>
      <Helmet>
        <title>BizTech Admin Companion</title>
      </Helmet>

      <div className={classes.row}>
        <div className={classes.columnLeft}>
          <Typography variant="h1" style={{ color: COLORS.BIZTECH_GREEN }}>
            Companion QRs
          </Typography>
          <Paper className={classes.section}>
            <Box
              color="#AEC4F4"
              fontFamily="Gilroy"
              fontStyle="normal"
              fontWeight="bold"
              fontSize="26px"
            >
              Create New QR
            </Box>
            <Box className={classes.grid}>
              <Tooltip title="To prevent cheating, a random 5-character string will be attached to the front of the name upon creation." arrow>
                <TextField
                  id="name"
                  name="name"
                  label="Name"
                  required
                  margin="normal"
                  variant="filled"
                  onChange={(e) => {
                    setErrors({...errors, id: false})
                    setNewQR({...newQR, id: e.target.value})}
                  }
                  value={newQR.id}
                  error={errors.id}
                  helperText={errors.id && "Missing value is required"}
                />
              </Tooltip>
              <Tooltip title="Refers to the slug of the event." arrow>
                <TextField
                  id="eventID"
                  name="eventID"
                  label="Event ID"
                  required
                  margin="normal"
                  variant="filled"
                  onChange={(e) => {
                    setErrors({...errors, eventID: false})
                    setNewQR({...newQR, eventID: e.target.value})}
                  }
                  value={newQR.eventID}
                  error={errors.eventID}
                  helperText={errors.eventID && "Missing value is required"}
                />
              </Tooltip>
              <TextField
                id="year"
                name="year"
                label="Year"
                type="number"
                required
                margin="normal"
                variant="filled"
                onChange={(e) => {
                  setErrors({...errors, year: false})
                  setNewQR({...newQR, year: e.target.value})}
                }
                value={newQR.year}
                error={errors.year}
                helperText={errors.year && "Missing value is required"}
              />
              <Tooltip title="Negative values are allowed, which will deduct points (e.g. making a shop)." arrow>
                <TextField
                  id="points"
                  name="points"
                  label="Points"
                  type="number"
                  required
                  margin="normal"
                  variant="filled"
                  onChange={(e) => {
                    setErrors({...errors, points: false})
                    setNewQR({...newQR, points: e.target.value})}
                  }
                  value={newQR.points}
                  error={errors.points}
                  helperText={errors.points && "Missing value is required"}
                />
              </Tooltip>
            </Box>
            <Box className={classes.rowFlex}>
              <Box>
                Unlimited Scans?
                <Checkbox
                  id="unlimited"
                  name="unlimited"
                  color="primary"
                  aria-label="Unlimited Scans?"
                  checked={newQR.isUnlimitedScans}
                  onChange={() => setNewQR({...newQR, isUnlimitedScans: !newQR.isUnlimitedScans})}
                />
              </Box>
              <Button
                variant="contained"
                color="primary"
                onClick={() => createQR()}
              >
                Add
              </Button>
            </Box>
          </Paper>
          <Paper className={classes.section}>
            <Box
              color="#AEC4F4"
              fontFamily="Gilroy"
              fontStyle="normal"
              fontWeight="bold"
              fontSize="26px"
            >
              Existing QRs
            </Box>
            {QRs.map((QR) => 
              <>
                <Box key={QR.id} className={classes.rowFlex}>
                  <Box className={classes.columnFlex}>
                    <Box>Name: {QR.id}</Box>
                    <Box>Event: {QR["eventID;year"]}</Box>
                    <Box>Points: {QR.points}</Box>
                    <Box>{QR.isActive ? "Active" : "Inactive"}</Box>
                    <Box>{QR.isUnlimitedScans ? "Unlimited Scans" : "One-time Scan"}</Box>
                  </Box>
                  <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://${process.env.REACT_APP_STAGE === "production" ? "" : "dev."}app.ubcbiztech.com/redeem/${QR["eventID;year"].split(";")[0]}/${QR["eventID;year"].split(";")[1]}/${QR.id}`}/>
                </Box>
                <Divider className={classes.divider}/>
              </>
            )}
          </Paper>  
        </div>
      </div>
    </>
  )
}

export default Companion