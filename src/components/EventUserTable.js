import React, { useState } from "react";
import MaterialTable from "material-table";
import { API_URL, API_KEY } from "../utils";

/**
 * Functional component that displays event user table populated from the backend
 * When a user check-in status is changed, the backend is updated and it fetches new data
 * @param {*} props userData from redux store; eventID from parent Events page
 */
export default function EventUserTable(props) {
  const eventID = props.eventID;
  const [rows, setRows] = useState();
  if (!rows) getEventTableData(eventID);
  const REGISTRATION_STATUS = {
    REGISTERED: "registered",
    CHECKED_IN: "checkedIn",
    WAITLISTED: "waitlist",
    CANCELLED: "cancelled"
  };
  // const rows = [
  //   {
  //     fname: "user",
  //     updatedAt: 1580373971522,
  //     year: 3,
  //     diet: "none",
  //     createdAt: 1580373971522,
  //     lname: "last",
  //     id: 777,
  //     email: "testmail@mail.com",
  //     faculty: "science",
  //     registrationStatus: "cancelled"
  //   }
  // ];
  /**
   * Helper function to determine whether to display action for check-in or undo check-in
   * @param {*} status current status of user
   */
  function displayAction(rowData) {
    switch (rowData.registrationStatus) {
      case REGISTRATION_STATUS.REGISTERED:
        return {
          icon: "check",
          tooltip: "Check-in member to event to confirm attendance",
          onClick: (event, rowData) => {
            // Do check-in operation
            if (
              window.confirm(
                "You want to check-in " +
                  rowData.fname +
                  " " +
                  rowData.lname +
                  "?"
              )
            ) {
              const registrationStatus = REGISTRATION_STATUS.CHECKED_IN;
              registerUser(rowData.id, registrationStatus);
            }
          }
        };
      case REGISTRATION_STATUS.CHECKED_IN:
        return {
          icon: "remove",
          tooltip: "Undo member check-in",
          onClick: (event, rowData) => {
            // Do undo check-in operation
            if (
              window.confirm(
                "You want to undo check-in " + rowData.fullName + "?"
              )
            ) {
              const registrationStatus = REGISTRATION_STATUS.REGISTERED;
              registerUser(rowData.id, registrationStatus);
            }
          }
        };
      case REGISTRATION_STATUS.WAITLISTED:
        return {
          icon: "queue",
          tooltip: "Take member off waitlist and check them in",
          onClick: (event, rowData) => {
            // Do check-in operation
            if (
              window.confirm(
                "You want to take " +
                  rowData.fullName +
                  " off of waitlist and check-in?"
              )
            ) {
              const registrationStatus = REGISTRATION_STATUS.CHECKED_IN;
              registerUser(rowData.studentNumber, registrationStatus);
            }
          }
        };
      case REGISTRATION_STATUS.CANCELLED:
        return {
          icon: "remove",
          tooltip: "Member cancelled registration"
        };
      default:
        return {
          icon: "close",
          tooltip: "it's broken"
        };
    }
  }

  async function registerUser(id, registrationStatus) {
    const body = JSON.stringify({
      eventID: eventID,
      id: id,
      registrationStatus: registrationStatus
    });

    fetch(API_URL + "/registration/create", {
      method: "POST",
      headers: {
        "x-api-key": API_KEY,
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
      })
      .finally(getEventTableData(eventID));
  }

  async function getEventTableData(eventID) {
    const params = new URLSearchParams({
      id: eventID
    });

    fetch(API_URL + "/events/getUsers?" + params, {
      method: "GET",
      headers: {
        "x-api-key": API_KEY,
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
        setRows(response);
      });
  }
  /**
   * Creates event table using MaterialTable library
   */
  return (
    <MaterialTable
      title="Event Attendance"
      columns={[
        { title: "First Name", field: "fname" },
        { title: "Last Name", field: "lname" },
        {
          title: "Student Number",
          field: "id",
          type: "numeric",
          sorting: false
        },
        { title: "Email", field: "email", sorting: false },
        {
          title: "Registration Status",
          field: "registrationStatus",
          sorting: false
        }
      ]}
      data={rows}
      // Configure options for the table
      options={{
        search: true,
        draggable: false,
        padding: "dense",
        pageSize: 20,
        pageSizeOptions: [20, 50, 100],
        actionsColumnIndex: 5,
        exportButton: true,
        headerStyle: {
          fontWeight: "bold"
        },
        rowStyle: rowData => ({
          backgroundColor:
            rowData.registrationStatus === REGISTRATION_STATUS.CHECKED_IN
              ? "#54D26E"
              : "#FFF"
        })
      }}
      actions={[rowData => displayAction(rowData)]}
    />
  );
}
