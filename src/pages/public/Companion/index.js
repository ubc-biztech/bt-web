import React, {
  useState, useEffect
} from "react";

import {
  fetchBackend
} from "utils";

import CAPITALIZED_EMAILS from "../../../constants/_constants/emails.js";
import CompanionLayout from "./components/CompanionLayout";
import Events from "./events";

const styles = {
  error: {
    backgroundColor: "transparent",
    background: "white",
    overflow: "hidden",
    minHeight: "100vh",
    display: "flex",
    padding: "10px",
    flexDirection: "column",
    width: "100%",
  },
};

const getRealEmail = (email) => {
  const res = CAPITALIZED_EMAILS.find(emailObj => emailObj.lowercaseEmail === email);
  if (res) {
    return res.email;
  }
};

const Companion = () => {
  const [email, setEmailFunc] = useState("");
  const [pageError, setPageError] = useState("");
  const [error, setError] = useState("");
  const [registrations, setRegistrations] = useState([]);
  const [event, setEvent] = useState(null);
  const [userRegistration, setUserRegistration] = useState(null);
  const [scheduleData, setScheduleData] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const events = Events.sort((a, b) => {
    return a.activeUntil - b.activeUntil;
  });

  const {
    options, eventID, year, ChildComponent
  } = events.find(event => {
    const today = new Date();
    return event.activeUntil > today;
  }) || events[0];

  const setEmail = (email) => {
    const realEmail = getRealEmail(email);
    if (realEmail) {
      setEmailFunc(realEmail);
    } else {
      setEmailFunc(email);
    }
  };

  const fetchUserData = async () => {
    const reg = registrations.find((entry) => entry.id === email);
    if (reg) {
      setError("");
      setUserRegistration(reg);
      localStorage.setItem("companionEmail", email);
    } else {
      setError("This email does not match an existing entry our records. Please check that your input is valid and is the same email you used to register for the event. Note that emails are case-sensitive.");
      setIsLoading(false);
    }
  };

  const fetchRegistrations = async () => {
    const params = new URLSearchParams({
      eventID,
      year
    });
    await fetchBackend(`/registrations?${params}`, "GET", undefined, false)
      .then((response) => {
        setRegistrations(response.data);
      }).catch((err) => {
        setPageError(err);
      });
  };

  const fetchEvent = async () => {
    await fetchBackend(`/events/${eventID}/${year}`, "GET", undefined, false)
      .then((response) => {
        setEvent(response);
      }).catch((err) => {
        console.log("Error while fetching event info : ", err);
        setPageError(err);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    fetchRegistrations();
    fetchEvent();

    const email = localStorage.getItem("companionEmail");
    if (email) {
      setEmail(email);
    }
    setIsLoading(false);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setError("");
    if (email && registrations.length > 0) {
      fetchUserData();
    }
  }, [email, registrations]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (userRegistration) {
      setScheduleData(options.getScheduleData(userRegistration));
    }
  }, [userRegistration]);

  if (pageError) {
    return (
      <div style={styles.error}>
        <div>A page error occured, please refresh the page. If the problem persists, contact a BizTech exec for support.</div>
      </div>
    );
  }

  return (
    <CompanionLayout options={options} email={email} setEmail={setEmail} registrations={registrations} userRegistration={userRegistration} event={event} isLoading={isLoading} error={error}
      scheduleData={scheduleData}
      ChildComponent={ChildComponent}
    />
  );
};

export default Companion;
