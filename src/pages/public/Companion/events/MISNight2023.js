import React from "react";
import "react-step-progress-bar/styles.css";
import MISNightPartners from "../../../../assets/2024/misnight/MISNightPartners.png";

import Mentors from "../components/mentor/Mentors";

const MISNight2023 = (params) => {
  const {
    event, registrations, FadeInWhenVisible, styles, renderMobileOnly
  } = params;


  return (<>
    {event && registrations &&
    <FadeInWhenVisible>
      <Mentors id="Mentors" event={event} registrations={registrations} styles={styles} />
      <div id="Partners" style={styles.column}>
        <h1 style={renderMobileOnly ? styles.mobileTitle : styles.title}>Attending Partners</h1>
        <img src={MISNightPartners} alt="MISNight Partners" style={styles.partners}/>
      </div>
    </FadeInWhenVisible>
    }
  </>
  );
};

export default MISNight2023;


