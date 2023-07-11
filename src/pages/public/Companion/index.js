import React, {
  useState, useEffect
} from "react";

import {
  fetchBackend
} from "utils";

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

const Companion = () => {
  const [email, setEmail] = useState("");
  const [pageError, setPageError] = useState("");
  const [error, setError] = useState("");
  const [registrations, setRegistrations] = useState([]);
  const [regData, setRegData] = useState(null);
  const [scheduleData, setScheduleData] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const events = Events.sort((a, b) => {
    return  a.activeUntil - b.activeUntil;
  });

  const {
    options, eventID, year, ChildComponent
  } = events.find(event => {
    const today = new Date();
    return event.activeUntil > today;
  }) || events[0];

  const fetchUserData = async () => {
    const reg = registrations.find((entry) => entry.id === email);
    if (reg) {
      setError("");
      setRegData(reg);
      localStorage.setItem("companionEmail", email);
    } else {
      setError("This email does not match an existing entry our records. Please check that your input is valid and is the same email you used to register for the event. Note that emails are case-sensitive.");
      setIsLoading(false);
    }
  };

  const fetchRegistrations = async () => {
    setIsLoading(true);
    const params = new URLSearchParams({
      eventID,
      year
    });
    await fetchBackend(`/registrations?${params}`, "GET", undefined, false)
      .then((response) => {
        setRegistrations(response.data);
        setIsLoading(false);
      }).catch((err) => {
        setPageError(err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchRegistrations();
    const email = localStorage.getItem("companionEmail");
    if (email) {
      setEmail(email);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setError("");
    if (email && registrations.length > 0) {
      fetchUserData();
    }
  }, [email, registrations]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (regData) {
      setScheduleData(options.getScheduleData(regData));
    }
  },[regData]);

  if (pageError) {
    return (
      <div style={styles.error}>
        <div>A page error occured, please refresh the page. If the problem persists, contact a BizTech exec for support.</div>
      </div>
    );
  }

  return (
    <CompanionLayout options={options} email={email} setEmail={setEmail} regData={regData} isLoading={isLoading} error={error}
      scheduleData={scheduleData}
      ChildComponent={ChildComponent}
    />
  );
};

export default Companion;
