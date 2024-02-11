import React, {
  useState
} from "react";
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
import {
  APPLICATION_STATUS
} from "constants/_constants/eventStatsStatusFields";

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
    try {
      const response = await fetch("/api/registrations/massUpdate", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          eventID,
          eventYear,
          status: selectedStatus, // Assuming this is the dbValue from the dropdown
          emails
        })
      });
      const result = await response.json();

      if (response.ok) {
        alert("Update successful");
        refreshTable(); // Make sure to implement this function in the parent component
        onClose(); // Close the modal after successful update
      } else {
        // Handle any errors returned from the server
        alert(`Failed: ${result.message}`);
      }
    } catch (error) {
      console.error("Update failed:", error);
      alert("Update failed. Please try again.");
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
            ([key, {
              dbValue, label
            }]) => (
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
