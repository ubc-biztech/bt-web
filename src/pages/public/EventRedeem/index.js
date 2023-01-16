import React, { useEffect, useState } from "react";
import { Button, TextField, Typography, makeStyles, Modal } from "@material-ui/core";

const styles = {
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
  boldText: {
    fontWeight: "bold",
    fontSize: "24px",
    marginBottom: 8,
  },
}));

const EventRedeem = () => {
  const [input, setInput] = useState("");
  const [email, setEmail] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    const email = localStorage.getItem("BP2023EMAIL");
    if (email) {
      setEmail(email)
    }
  }, [])

  return (
    <>
      <Modal
        open={isModalOpen}
        >
        <div style={styles.modal}>
          <Typography className={classes.boldText}>{input}</Typography>
          <div style={styles.modalText}>
            <Typography>Are you sure you want to use this email?</Typography>
            <Typography>Once you confirm, you will not be able to change this, and all future points at the event will be redeemed to this email.</Typography>
          </div>
          <div style={styles.modalButtons}>
            <Button variant="contained" color="primary" 
              onClick={() => {
                localStorage.setItem("BP2023EMAIL", input)
                setEmail(input)
                setIsModalOpen(false)
              }}
            >
              Yes
            </Button>
            <Button variant="contained" color="primary" onClick={() => setIsModalOpen(false)}>
              No
            </Button>
          </div>
        </div>
      </Modal>
      {email ? (
        <Typography>Redeemed Successfully! Email used: {email}</Typography>
        ) : (
        <div>
          <Typography>To redeem points, please enter the email you used to register for Blueprint.</Typography>
          <TextField 
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
          <Button 
            color="primary" 
            onClick={() => setIsModalOpen(true)}
          >
            Confirm
          </Button>
        </div>
        )
      }
    </>
  )
}

export default EventRedeem;