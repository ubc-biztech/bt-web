export const ATTENDEE_TABLE_TYPE = "attendee";
export const PARTNER_TABLE_TYPE = "parter";
export const APPLICATION_TABLE_TYPE = "applicationView";
export const REGISTRATION_STATUS_KEY = "registrationStatus";
export const APPLICATION_STATUS_KEY = "applicationStatus";

export const REGISTRATION_STATUS = {
  REGISTERED: "registered",
  CHECKED_IN: "checkedIn",
  WAITLISTED: "waitlist",
  CANCELLED: "cancelled",
  INCOMPLETE: "incomplete"
};
export const REGISTRATION_LABELS = {
  registered: "Registered",
  checkedIn: "Checked In",
  waitlist: "Waitlisted",
  cancelled: "Cancelled",
  incomplete: "Incomplete",
  1: "1st Year",
  2: "2nd Year",
  3: "3rd Year",
  4: "4th Year",
  5: "5th+ Year"
};
export const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
