import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Select,
  MenuItem,
  DialogActions,
  Button
} from "@material-ui/core";
import { APPLICATION_STATUS } from "constants/_constants/eventStatsStatusFields";
import { fetchBackend } from "utils";

const MassUpdateModal = ({
  open,
  onClose,
  eventID,
  eventYear,
  refreshTable
}) => {
  const [emailList, setEmailList] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const handleSubmit = async () => {
    const emails = emailList.split(",").map((email) => email.trim());
    const updates = emails.map((email) => ({
      email: email,
      fname: "User", // TODO !!! Figure out how to get fname using email
      status: selectedStatus
    }));

    const data = {
      eventID,
      eventYear,
      updates
    };
    try {
      await fetchBackend("/registrations/massUpdate", "PUT", data);
      alert("Update successful");
      refreshTable();
      onClose();
    } catch (error) {
      console.error("Update failed:", error);
      alert(`Failed: ${error.message}`);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Mass Update User Status</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="emailList"
          label="Email Addresses (comma-separated)"
          type="email"
          fullWidth
          variant="outlined"
          value={emailList}
          onChange={(e) => setEmailList(e.target.value)}
        />
        <Select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          fullWidth
          displayEmpty
          inputProps={{
            "aria-label": "Without label"
          }}
        >
          <MenuItem value="" disabled>
            Select Status
          </MenuItem>
          {Object.entries(APPLICATION_STATUS).map(
            ([key, { dbValue, label }]) => (
              <MenuItem key={key} value={dbValue}>
                {label}
              </MenuItem>
            )
          )}
        </Select>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MassUpdateModal;
