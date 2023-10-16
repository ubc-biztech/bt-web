import { COLORS } from "./theme";

export const APPLICATION_STATUS = {
  "accepted": {
    dbValue: "accepted",
    label: "Accepted",
    color: COLORS.LIGHT_GREEN,
    getWindowMessage: (fname, lname) => `Do you want to accept ${fname} ${lname}?\nThis will send an email to the user.`
  },
  "rejected": {
    dbValue: "rejected",
    label: "Rejected",
    color: COLORS.LIGHT_RED,
    getWindowMessage: (fname, lname) => `Do you want to reject ${fname} ${lname}?\nThis will send an email to the user.`
  },
  "waitlist": {
    dbValue: "waitlist",
    label: "Waitlisted",
    color: COLORS.LIGHT_YELLOW,
    getWindowMessage: (fname, lname) => `Do you want to waitlist ${fname} ${lname}?\nThis will send an email to the user.`
  },
  "reviewing": {
    dbValue: "reviewing",
    label: "Reviewing",
    color: COLORS.LIGHT_BACKGROUND_COLOR,
    getWindowMessage: (fname, lname) => `Do you want to set ${fname} ${lname} to be reviewing again?\nThis will send an email to the user.`
  }
}

export const REGISTRATION_STATUS = {
  "registered": {
    dbValue: "registered",
    label: "Registered",
    color: COLORS.LIGHT_BACKGROUND_COLOR,
    getWindowMessage: (fname, lname) => `Do you want to register ${fname} ${lname}?\nThis will send an email to the user.`
  },
  "checkedIn": {
    dbValue: "checkedIn",
    label: "Checked In",
    color: COLORS.LIGHT_GREEN,
    getWindowMessage: (fname, lname) => `Do you want to check in ${fname} ${lname}?\nThis will NOT send an email to the user.`
  },
  "waitlist": {
    dbValue: "waitlist",
    label: "Waitlisted",
    color: COLORS.LIGHT_YELLOW,
    getWindowMessage: (fname, lname) => `Do you want to waitlist ${fname} ${lname}?\nThis will send an email to the user.`
  },
  "cancelled": {
    dbValue: "cancelled",
    label: "Cancelled",
    color: COLORS.LIGHT_RED,
    getWindowMessage: (fname, lname) => `Did ${fname} ${lname} cancel?\nThis will send an email to the user.`
  },
  "incomplete": {
    dbValue: "incomplete",
    label: "Incomplete",
    color: COLORS.LIGHT_BACKGROUND_COLOR,
    getWindowMessage: (fname, lname) => `This status is only used when the registrant has not paid. Are you sure ${fname} ${lname} has not paid?`
  }
}