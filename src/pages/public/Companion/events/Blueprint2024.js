import React from "react";
import "react-step-progress-bar/styles.css";

import Mentors from "../components/mentor/Mentors";

const Blueprint2024 = (params) => {
  const {
    event, registrations, FadeInWhenVisible, styles, renderMobileOnly
  } = params;


  return (<>
    {event && registrations &&
    <FadeInWhenVisible>
        <div id="Floorplan" style={styles.column}>
        <h1 style={renderMobileOnly ? styles.mobileTitle : styles.title}>Floorplan</h1>
        {/* <img src={MISNightPartners} alt="MISNight Partners" style={styles.partners}/> */}
      </div>
      <Mentors id="Mentors" event={event} registrations={registrations} styles={styles} />
      <div id="Partners" style={styles.column}>
        <h1 style={renderMobileOnly ? styles.mobileTitle : styles.title}>Attending Partners</h1>
        {/* <img src={MISNightPartners} alt="MISNight Partners" style={styles.partners}/> */}
      </div>
    </FadeInWhenVisible>
    }
  </>
  );
};

export default Blueprint2024;

