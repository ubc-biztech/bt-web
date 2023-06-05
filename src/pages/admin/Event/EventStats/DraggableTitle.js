import React from "react";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";

const DraggableTitle = ({
  title
}) => {
  return (
    <div style={{
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <DragIndicatorIcon />
      <span>{title}</span>
    </div>
  );
};

export default DraggableTitle;
