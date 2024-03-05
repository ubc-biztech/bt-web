import React, {
  useState, useEffect
} from "react";
import {
  Accordion, AccordionDetails, AccordionSummary,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  fetchBackend
} from "utils";
import Backdrop from "../../../../assets/2024/produhacks/background.svg";
import ppl from "../../../../assets/2024/produhacks/ppl.png";
import Reviewing from "../../../../assets/2024/produhacks/reviewing.png";
import Waitlist from "../../../../assets/2024/produhacks/waitlisted.png";

const customStyles = {
  footer: {
    left: "-10px",
    width: "120%",
    right: "-10px",
    bottom: "0"
  },
  background: {
    width: "100%"
  },
  backgroundMobile: {
    width: "140%",
    position: "fixed",
    marginLeft: "-22%",
  }

};

const Produhacks2024 = (params) => {
  const {
    event, registrations, styles, renderMobileOnly, userRegistration
  } = params;
  console.log(userRegistration);


  const renderStatus = () => {
    const status = userRegistration.applicationStatus;
    if (status === "j") {
      return <img src={Reviewing} alt={"Backdrop"} style={renderMobileOnly ? customStyles.backgroundMobile : customStyles.background} />;
    } else if (status === "reviewing") {
      return <img src={Waitlist} alt={"Backdrop"} style={renderMobileOnly ? customStyles.backgroundMobile : customStyles.background} />;
    } else if (status === "accepted") {
      return <img src={ppl} alt={"Backdrop"} style={customStyles.background} />;
    } else if (status === "rejected") {
      return <img src={ppl} alt={"Backdrop"} style={customStyles.background} />;
    }
  };

  return (<>
    {event && registrations &&
            (renderStatus())
    }
  </>
  );
};

export default Produhacks2024;

