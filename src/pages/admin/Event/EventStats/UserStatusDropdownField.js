import React from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {
  fetchBackend
} from "../../../../utils";
import {
  COLORS, REGISTRATION_STATUS
} from "../../../../constants";

// props that will be passed in will be one of eventStatsStatusFields
// props: {statusOptions: {ACCEPTED: {dbValue: "", label: "", color: "", getWindowMessage: (fname, lname) => string}}}

const UserStatusDropdownField = (props) => {
  const { id, fname, lname, currentStatus, eventID, eventYear, refreshTable, statusOptions, statusTypeKey } = props;
  const updateUserStatus = async (status) => {
    const body = {
      eventID: eventID,
      year: eventYear,
      [statusTypeKey]: status
    };
    await fetchBackend(`/registrations/${id}/${fname}`, "PUT", body);

    refreshTable();
  };

  /**
     * Helper function to determine whether to display action for check-in or undo check-in
     * @param {*} props data about the current row
     */
  const changeStatus = (event) => {
    const newStatus = event.target.value;
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
      value={currentStatus}
      onClick={(event) => {
        console.log('changin')
        changeStatus(event)
      }}
      style={{
        backgroundColor: statusOptions[currentStatus].color,
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
