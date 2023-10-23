import React, {
  useState
} from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {
  fetchBackend
} from "../../../../utils";

// props that will be passed in will be one of eventStatsStatusFields
// props: {statusOptions: {ACCEPTED: {dbValue: "", label: "", color: "", getWindowMessage: (fname, lname) => string}}}

const UserStatusDropdownField = (props) => {
  const {
    id, fname, lname, currentStatus, eventID, eventYear, refreshTable, statusOptions, statusTypeKey
  } = props;
  const [statusDisplayed, setStatusDisplayed] = useState(currentStatus);
  const updateUserStatus = async (status) => {
    const body = {
      eventID: eventID,
      year: eventYear,
      [statusTypeKey]: status
    };
    try {
      const result = await fetchBackend(`/registrations/${id}/${fname}`, "PUT", body);
      if (result) {
        setStatusDisplayed(status);
      }
    } catch {
      alert("An error as occured! Please try again or contact a dev");
      refreshTable();
    }
  };

  const changeStatus = (event) => {
    const newStatus = event.target.value;

    if (newStatus === "accepted" || newStatus === "rejected") {
      updateUserStatus(
        statusOptions[newStatus].dbValue
      );
      return;
    }

    if (window.confirm(
      statusOptions[newStatus].getWindowMessage(fname, lname)
    )) {
      updateUserStatus(
        statusOptions[newStatus].dbValue
      );
    };
  };

  return (
    <Select
      value={statusDisplayed}
      onChange={(event) => {
        changeStatus(event);
      }}
      style={{
        backgroundColor: statusOptions[statusDisplayed].color,
        paddingLeft: "10px"
      }}
    >
      {
        Object.keys(statusOptions).map((status, idx) =>
          <MenuItem key={idx} value={status}>
            {statusOptions[status].label}
          </MenuItem>
        )
      }
    </Select>
  );
};

export default UserStatusDropdownField;
