import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, TextField, Typography, makeStyles, Modal } from "@material-ui/core";
import { fetchBackend } from "utils";
import Loading from "pages/Loading";

const styles = {
  container: {
    height: "100vh",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  inputContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "#172037",
    borderColor: "#172037",
    margin: "auto",
    borderRadius: 5,
    padding: 10,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  modalText: {
    marginTop: 20,
    marginBottom: 20,
  },
  modalButtons: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  }
};

const useStyles = makeStyles((theme) => ({
  textfield: {
    background: "#1F2A47",
    width: "75%",
    borderRadius: 10,
    marginTop: 8,
    marginBottom: 8,
  },
  centerText: {
    textAlign: "center",
  },
  boldText: {
    fontWeight: "bold",
    fontSize: "24px",
    marginBottom: 8,
  },
  errorText: {
    fontWeight: "bold",
    color: "red",
    fontSize: "16px",
    textAlign: "center",
  }
}));

const EventRedeem = () => {
  const [input, setInput] = useState("");
  const [email, setEmail] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [registrations, setRegistrations] = useState([]);
  const [error, setError] = useState("");

  const classes = useStyles();

  const { eventID, year, qrID } = useParams()

  const fetchRegistrations = async () => {
    const params = new URLSearchParams({
      eventID: "blueprint",
      year: "2023"
    });
    await fetchBackend(`/registrations?${params}`, "GET")
      .then((response) => {
        setRegistrations(response.data)
        setIsLoading(false)
    })
  }

  const checkEmail = () => registrations.some((entry) => entry.id === email)

  const submitEmail = async () => {
    setIsLoading(true)
    if (checkEmail()) {
      await fetchBackend("/qr", "POST", {
        "qrCodeID": qrID,
        "eventID": eventID,
        "year": Number(year),
        "email": email
      }).then((res) => {
        localStorage.setItem("BP2023EMAIL", email)
        setIsModalOpen(false)
        setIsLoading(false)
      }).catch((err) => {
        setError(err.message.message)
        setIsLoading(false)
      })
    } else {
      setError("This email does not match an existing entry in our records. Please check that your input is valid and is the same email you used to register for the event. Note that emails are case-sensitive.")
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchRegistrations();
    const email = localStorage.getItem("BP2023EMAIL");
    if (email) {
      setEmail(email)
    }
  }, [])

  useEffect(() => {
    if (email && registrations.length > 0) {
      submitEmail()
    }
  }, [email, registrations])

  return (
    <>
      <Modal
        open={isModalOpen}
        >
        <div style={styles.modal}>
          <Typography className={classes.boldText}>{input}</Typography>
          <Typography className={classes.errorText}>{error}</Typography>
          <div style={styles.modalText}>
            <Typography className={classes.centerText}>Are you sure you want to use this email?</Typography>
            <Typography className={classes.centerText}>Once you confirm, you will not be able to change this, and all future points at the event will be redeemed to this email.</Typography>
          </div>
          <div style={styles.modalButtons}>
            <Button variant="contained" color="primary" 
              onClick={() => {
                setEmail(input)
              }}
            >
              Yes
            </Button>
            <Button variant="contained" color="primary" 
              onClick={() => {
                setError("")
                setIsModalOpen(false)
              }}>
              No
            </Button>
          </div>
        </div>
      </Modal>
      {isLoading ? (
        <div style={styles.container}>
          <Loading/>
        </div>
      ) : (
        <div style={styles.container}>
          {email ? (
            <Typography className={classes.centerText}>{error || `Redeemed Successfully! Email used: ${email}`}</Typography>
            ) : (
            <div style={styles.inputContainer}>
              <Typography className={classes.centerText}>To redeem points, please enter the email you used to register for Blueprint.</Typography>
              <TextField 
                className={classes.textfield}
                onChange={(e) => setInput(e.target.value)}
                value={input}
                variant="outlined"
              />
              <Button
                variant="contained" 
                color="primary" 
                onClick={() => {
                  setIsModalOpen(true)
                }}
              >
                Confirm
              </Button>
            </div>
            )
          }
        </div>
      )}
    </>
  )
}

export default EventRedeem;