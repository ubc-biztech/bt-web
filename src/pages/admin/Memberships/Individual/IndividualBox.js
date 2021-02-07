import React from "react";
import Box from "@material-ui/core/Box";

const IndividualBox = (props) => {
  return (
    <Box
      paddingTop={1.5}
      alignItems="left"
      color="FFFFFF"
      fontFamily="Gilroy"
      fontStyle="normal"
      fontWeight="normal"
      fontSize="19px"
    >
      {props.label}
    </Box>
  );
};

export default IndividualBox;
