import React from "react";
import RegistrationField from "./RegistrationField";
import PointsField from "./PointsField";
import {
  REGISTRATIONSTATUSLABEL, POINTSLABEL
} from "./utils";

const getDefaultColumns = (eventID, eventYear, refreshTable) => [
  {
    title: "Registration Status",
    field: REGISTRATIONSTATUSLABEL,
    cellStyle: {
      whiteSpace: "nowrap"
    },
    render: (rowData) => (
      <div>
        <RegistrationField
          id={rowData.id}
          fname={rowData.fname}
          lname={rowData.lname}
          registrationStatus={rowData.registrationStatus}
          eventID={eventID}
          eventYear={eventYear}
          refreshTable={refreshTable}/>
      </div>
    )
  },
  {
    title: "First Name",
    field: "fname",
    cellStyle: {
      whiteSpace: "nowrap"
    },
    render: (rowData) => (
      <>
        {rowData.fname}
      </>
    )
  },
  {
    title: "Last Name",
    field: "lname",
    cellStyle: {
      whiteSpace: "nowrap"
    },
    render: (rowData) => (
      <>
        {rowData.lname}
      </>
    )
  },
  {
    title: "Email",
    field: "id",
    cellStyle: {
      whiteSpace: "nowrap"
    },
    render: (rowData) => (
      <>
        {rowData.id}
      </>
    )
  },
  {
    title: "Points (user)",
    field: POINTSLABEL,
    cellStyle: {
      whiteSpace: "nowrap"
    },
    render: (rowData) => (
      <div>
        <PointsField
          points={rowData.points}
          id={rowData.id}
          fname={rowData.fname}
          registrationStatus={rowData.registrationStatus}
          eventID={eventID}
          eventYear={eventYear}
          refreshTable={refreshTable}
        />
      </div>
    )
  },
  {
    title: "Last Updated",
    field: "updatedAt",
    cellStyle: {
      whiteSpace: "nowrap"
    },
    render: (rowData) => (
      <>
        {rowData.updatedAt}
      </>
    )
  },
  {
    title: "Diet",
    field: "diet",
    cellStyle: {
      whiteSpace: "nowrap"
    },
    render: (rowData) => (
      <>
        {rowData.diet}
      </>
    )
  },
  {
    title: "Student Number",
    field: "studentId",
    cellStyle: {
      whiteSpace: "nowrap"
    },
    render: (rowData) => (
      <>
        {rowData.studentId}
      </>
    )
  },
  {
    title: "Faculty",
    field: "faculty",
    cellStyle: {
      whiteSpace: "nowrap"
    },
    render: (rowData) => (
      <>
        {rowData.faculty}
      </>
    )
  },
  {
    title: "Year Level",
    field: "year",
    cellStyle: {
      whiteSpace: "nowrap"
    },
    render: (rowData) => (
      <>
        {rowData.year}
      </>
    )
  },
  {
    title: "Pronouns",
    field: "gender",
    cellStyle: {
      whiteSpace: "nowrap"
    },
    render: (rowData) => (
      <>
        {rowData.gender}
      </>
    )
  },
  {
    title: "Heard about event from",
    field: "heardFrom",
    cellStyle: {
      whiteSpace: "nowrap"
    },
    render: (rowData) => (
      <>
        {rowData.heardFrom}
      </>
    )
  },
  {
    title: "Team ID",
    field: "teamID",
    cellStyle: {
      whiteSpace: "nowrap"
    },
    render: (rowData) => (
      <>
        {rowData.teamID}
      </>
    )
  }
];

const getDefaultPartnerColumns = (eventID, eventYear, refreshTable) => [
  {
    title: "Registration Status",
    field: REGISTRATIONSTATUSLABEL,
    cellStyle: {
      whiteSpace: "nowrap"
    },
    render: (rowData) => (
      <div>
        <RegistrationField
          id={rowData.id}
          fname={rowData.fname}
          lname={rowData.lname}
          registrationStatus={rowData.registrationStatus}
          eventID={eventID}
          eventYear={eventYear}
          refreshTable={refreshTable}/>
      </div>
    )
  },
  {
    title: "First Name",
    field: "fname",
    cellStyle: {
      whiteSpace: "nowrap"
    },
    render: (rowData) => (
      <>
        {rowData.fname}
      </>
    )
  },
  {
    title: "Last Name",
    field: "lname",
    cellStyle: {
      whiteSpace: "nowrap"
    },
    render: (rowData) => (
      <>
        {rowData.lname}
      </>
    )
  },
  {
    title: "Email",
    field: "id",
    cellStyle: {
      whiteSpace: "nowrap"
    },
    render: (rowData) => (
      <>
        {rowData.id}
      </>
    )
  },
  {
    title: "Last Updated",
    field: "updatedAt",
    cellStyle: {
      whiteSpace: "nowrap"
    },
    render: (rowData) => (
      <>
        {rowData.updatedAt}
      </>
    )
  },
  {
    title: "Pronouns",
    field: "gender",
    cellStyle: {
      whiteSpace: "nowrap"
    },
    render: (rowData) => (
      <>
        {rowData.gender}
      </>
    )
  },
  {
    title: "Company Name",
    field: "companyName",
    cellStyle: {
      whiteSpace: "nowrap"
    },
    render: (rowData) => (
      <>
        {rowData.companyName}
      </>
    )
  },
  {
    title: "Role/Occupation at Company",
    field: "role",
    cellStyle: {
      whiteSpace: "nowrap"
    },
    render: (rowData) => (
      <>
        {rowData.role}
      </>
    )
  }
];

const getDynamicQuestionColumns = (registrationQuestions) => {
  if (!registrationQuestions) {
    return;
  }

  const columns = [];
  registrationQuestions.forEach((question) => {
    columns.push({
      title: question.label,
      field: question.questionId,
      type: question.type,
      sorting: true,
      cellStyle: {
        whiteSpace: "nowrap"
      },
      render: (rowData) => (
        <>
          {rowData[question.questionId]}
        </>
      )
    });
  });
  return columns;
};

export {
  getDefaultColumns, getDefaultPartnerColumns, getDynamicQuestionColumns
};
