import React from "react";
import Box from "@material-ui/core/Box";

const IndividualHeaderBox = (props) => {
  return (
    <Box
      paddingLeft={1}
      paddingTop={1}
      fontSize="23px"
      fontFamily="Gilroy"
      fontWeight="fontWeightBold"
      fontStyle="italic"
    >
      {props.label}
    </Box>
  );
};

export default IndividualHeaderBox; 