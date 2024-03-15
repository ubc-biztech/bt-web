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
import {
  fetchBackend
} from "utils";

const MassUpdateModal = ({
  open,
  onClose,
  eventID,
  eventYear,
  refreshTable
}) => {
  const [emailList, setEmailList] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const fetchFnameByEmail = async (email) => {
    try {
      console.log("calling fname");
      const response = await fetchBackend(`/members/${email}/fname`, "GET");
      console.log("call fname complete");
      if (response.firstName) {
        return response.firstName;
      } else {
        throw new Error(`First name not found for email: ${email}`);
      }
    } catch (error) {
      console.error("Error fetching fname for email:", email, error);
      throw new Error(`Failed to fetch fname for email: ${email}`);
    }
  };

  const handleSubmit = async () => {
    const emails = emailList.split(",").map((email) => email.trim());

    try {
      const updates = await Promise.all(emails.map(async (email) => {
        const fname = await fetchFnameByEmail(email);
        return {
          email,
          fname,
          applicationStatus: selectedStatus
        };
      }));

      const data = {
        eventID,
        eventYear,
        updates
      };

      await fetchBackend("/registrations/massUpdate", "PUT", data);
      alert("Update successful");
      onClose();
      location.reload();
    } catch (error) {
      console.error("Update failed:", error);
      alert(error.message);
    }
  };


  // const handleSubmit = async () => {
  //   const emails = emailList.split(",").map((email) => email.trim());

  //   const updatesPromises = emails.map(async (email) => {
  //     const fname = await fetchFnameByEmail(email);
  //     return {
  //       email,
  //       fname,
  //       applicationStatus: selectedStatus
  //     };
  //   });

  //   const updates = await Promise.all(updatesPromises);

  //   const data = {
  //     eventID,
  //     eventYear,
  //     updates
  //   };
  //   try {
  //     await fetchBackend("/registrations/massUpdate", "PUT", data);
  //     alert("Update successful");
  //     // refreshTable();
  //     onClose();
  //     location.reload();
  //   } catch (error) {
  //     console.error("Update failed:", error);
  //     alert(`Failed: ${error.message}`);
  //   }
  // };

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
