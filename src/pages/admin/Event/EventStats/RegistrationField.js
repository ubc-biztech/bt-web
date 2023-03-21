import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { fetchBackend } from '../../../../utils';
import { COLORS, REGISTRATION_STATUS } from '../../../../constants';

const RegistrationField = (props) => {
    const updateUserRegistrationStatus = async (id, fname, registrationStatus) => {
        const body = {
          eventID: props.eventID,
          year: props.eventYear,
          registrationStatus
        };
        await fetchBackend(`/registrations/${id}/${fname}`, "PUT", body);
    
        props.refreshTable();
      }

    /**
     * Helper function to determine whether to display action for check-in or undo check-in
     * @param {*} props data about the current row
     */
    const changeRegistration = (event) => {
      switch (event.target.value) {
        case REGISTRATION_STATUS.REGISTERED:
          if (
            window.confirm(
              `Do you want to register ${props.fname} ${props.lname}?\nThis will send an email to the user.`
            )
          ) {
            updateUserRegistrationStatus(
              props.id,
              props.fname,
              REGISTRATION_STATUS.REGISTERED
            );
          }
          break;
        case REGISTRATION_STATUS.CHECKED_IN:
          if (
            window.confirm(
              `Do you want to check in ${props.fname} ${props.lname}?\nThis will NOT send an email to the user.`
            )
          ) {
            updateUserRegistrationStatus(
              props.id,
              props.fname,
              REGISTRATION_STATUS.CHECKED_IN
            );
          }
          break;
        case REGISTRATION_STATUS.WAITLISTED:
          if (
            window.confirm(
              `Do you want to waitlist ${props.fname} ${props.lname}?\nThis will send an email to the user.`
            )
          ) {
            updateUserRegistrationStatus(
              props.id,
              props.fname,
              REGISTRATION_STATUS.WAITLISTED
            );
          }
          break;
        case REGISTRATION_STATUS.CANCELLED:
          if (
            window.confirm(
              `Did ${props.fname} ${props.lname} cancel?\nThis will send an email to the user.`
            )
          ) {
            updateUserRegistrationStatus(
              props.id,
              props.fname,
              REGISTRATION_STATUS.CANCELLED
            );
          }
          break;
        case REGISTRATION_STATUS.INCOMPLETE:
          if (
            window.confirm(
              `This status is only used when the registrant has not paid. Are you sure ${props.fname} ${props.lname} has not paid?`
            )
          ) {
            updateUserRegistrationStatus(
              props.id,
              props.fname,
              REGISTRATION_STATUS.INCOMPLETE
            );
          }
          break;
        default:
          return {};
      }
    };

    return (
    <Select
        value={props.registrationStatus}
        onClick={(event) => changeRegistration(event)}
        style={{
        backgroundColor:
            props.registrationStatus === REGISTRATION_STATUS.CHECKED_IN
            ? COLORS.LIGHT_GREEN
            : props.registrationStatus ===
                REGISTRATION_STATUS.WAITLISTED
            ? COLORS.LIGHT_YELLOW
            : props.registrationStatus ===
                REGISTRATION_STATUS.CANCELLED
            ? COLORS.LIGHT_RED
            : COLORS.LIGHT_BACKGROUND_COLOR,
        paddingLeft: "10px"
        }}
    >
        <MenuItem value={REGISTRATION_STATUS.WAITLISTED}>Waitlisted</MenuItem>
        <MenuItem value={REGISTRATION_STATUS.CHECKED_IN}>Checked in</MenuItem>
        <MenuItem value={REGISTRATION_STATUS.REGISTERED}>
            Registered
            </MenuItem>
        <MenuItem value={REGISTRATION_STATUS.CANCELLED}>
        Cancelled
        </MenuItem>
        <MenuItem value={REGISTRATION_STATUS.INCOMPLETE}>
        Incomplete
        </MenuItem>
    </Select>
    )
}

export default RegistrationField;