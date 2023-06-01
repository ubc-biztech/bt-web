import React from "react";
import BiztechLogo from "../../assets/biztech_logo_2022.svg";

const Biztech = ({ size, margin }) => (
  <img src={BiztechLogo} alt={"UBC Biztech Logo"} height={size} style={{ margin }}/>
);

export default Biztech;
