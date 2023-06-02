import React from "react";

// Constants
const REGISTRATIONSTATUSLABEL = "registrationStatus";
const POINTSLABEL = "points";


/**
 * Helper function to turn registration responses in an array of userResponses,
 * where each object has a id as pk, and multiple key value pairs of questionId: response
 * @param {*} registrations the response from the registration endpoint
 */
const parseDynamicResponses = (registrations) => {
  const {
    data
  } = registrations;
  const parsedData = [];

  data.forEach((user) => {
    const {
      dynamicResponses
    } = user;
    const userResponse = {
    };

    userResponse.id = user.id;
    userResponse.dynamicResponses = dynamicResponses;

    parsedData.push(userResponse);
  });

  return parsedData;
};

/**
 * Helper function to flatten the registration data into a format suitable for the MaterialTable
 * @param {*} users the response from the registration backend
 */
const prepareRowData = (users) => {
  const idToUserMap = new Map();

  users.forEach((user) => {
    idToUserMap.set(user.id, {
      ...user.basicInformation,
      ...user.dynamicResponses,
      studentId: user.studentId,
      id: user.id,
      registrationStatus: user.registrationStatus,
      // convert the date to something more readable
      updatedAt: new Date(user.updatedAt).toLocaleString(),
      isPartner: user.isPartner,
      points: user.points,
      teamID: user.teamID,
    });
  });

  return [...idToUserMap.values()];
};

/**
 * Appends the registrationQuestions to columns in a format suitable for the MaterialTable
 * @param {*} columns the array of columns to be populated
 * @param {*} registrationQuestions an array of registration questions
 */
const appendRegistrationQuestions = (columns, registrationQuestions) => {
  if (!registrationQuestions) {
    return;
  }

  registrationQuestions.forEach((question) => {
    const column = {
    };

    column.title = question.label;
    column.field = question.questionId;
    column.type = question.type;
    column.sorting = true;
    column.render = (rowData) => {
      return (
        <>
          {rowData[question.questionId]}
        </>
      );
    };

    columns.push(column);
  });
};

export {
  REGISTRATIONSTATUSLABEL,
  POINTSLABEL,
  parseDynamicResponses,
  prepareRowData,
  appendRegistrationQuestions,
};
