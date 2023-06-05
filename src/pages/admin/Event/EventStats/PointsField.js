import { TextField, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { fetchBackend } from "../../../../utils";

const PointsField = (props) => {
  const [value, setValue] = useState(props.points);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setValue(props.points);
  }, [props.points]);


  const handleBlur = async (event) => {
    if (event.type === "blur" || event.key === "Enter") {
      setIsEditing(false);

      if (value !== props.points) {
        changeUserPoints();
      }
    }
  };

  const changeUserPoints = async () => {
    try {
      validatePoints(value);

      if (window.confirm("Are you sure you want to change the points value?")) {
        await updateUserPoints(props.id, props.fname, value);
      } else {
        setValue(props.points);
      }
    } catch (error) {
      console.log(error);
      alert(error);
      setValue(props.points);
    }
  };

  const updateUserPoints = async (id, fname, points) => {
    const body = {
      eventID: props.eventID,
      year: props.eventYear,
      points: parseInt(points)
    };
    await fetchBackend(`/registrations/${id}/${fname}`, "PUT", body);

    props.refreshTable();
  };

  const validatePoints = (points) => {
    if (isNaN(points) || points == null || points === "") {
      throw new Error("Points must be a number");
    }
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleFocus = () => {
    setIsEditing(true);
  };

  if (!isEditing) {
    return (
      <Typography
        onClick={handleFocus}
      >
        {value}
      </Typography>
    );
  } else {
    return (
      <TextField
        autoFocus
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyPress={handleBlur}
      />
    );
  }
};

export default PointsField;
