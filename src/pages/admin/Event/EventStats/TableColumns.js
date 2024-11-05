import React from "react";
import PointsField from "./PointsField";
import {
  REGISTRATIONSTATUSLABEL, POINTSLABEL
} from "./utils";
import UserStatusDropdownField from "./UserStatusDropdownField";
import {
  REGISTRATION_STATUS, APPLICATION_STATUS
} from "constants/_constants/eventStatsStatusFields";
import {
  APPLICATION_TABLE_TYPE, APPLICATION_STATUS_KEY, REGISTRATION_STATUS_KEY
} from "constants/_constants/registration";

const getDefaultColumns = (eventID, eventYear, refreshTable, tableType) => [
  {
    title: "Registration Status",
    field: REGISTRATIONSTATUSLABEL,
    cellStyle: {
      whiteSpace: "nowrap"
    },
    render: (rowData) => (
      <div>
        <UserStatusDropdownField
          id={rowData.id}
          fname={rowData.fname}
          lname={rowData.lname}
          currentStatus={tableType === APPLICATION_TABLE_TYPE ? rowData.applicationStatus : rowData.registrationStatus}
          eventID={eventID}
          eventYear={eventYear}
          refreshTable={refreshTable}
          statusOptions={tableType === APPLICATION_TABLE_TYPE ? APPLICATION_STATUS : REGISTRATION_STATUS}
          statusTypeKey={tableType === APPLICATION_TABLE_TYPE ? APPLICATION_STATUS_KEY : REGISTRATION_STATUS_KEY}
        />
      </div>
    )
  },
  {
    title: "Application Status",
    field: "applicationStatus",
    cellStyle: {
      whiteSpace: "nowrap"
    },
    render: (rowData) => (
      <>
        {rowData?.applicationStatus}
      </>
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
    customSort: (a, b) => {
      const timestampA = Date.parse(a.updatedAt);
      const timestampB = Date.parse(b.updatedAt);
      return timestampA - timestampB;
    },
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
    title: "Date Created",
    field: "createdAt",
    customSort: (a, b) => {
      const timestampA = Date.parse(a.createdAt);
      const timestampB = Date.parse(b.createdAt);
      return timestampA - timestampB;
    },
    cellStyle: {
      whiteSpace: "nowrap"
    },
    render: (rowData) => (
      <>
        {rowData.createdAt === "Invalid Date" ? "" : rowData.createdAt}
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
        <UserStatusDropdownField
          id={rowData.id}
          fname={rowData.fname}
          lname={rowData.lname}
          currentStatus={rowData.registrationStatus}
          eventID={eventID}
          eventYear={eventYear}
          refreshTable={refreshTable}
          statusOptions={REGISTRATION_STATUS}
          statusTypeKey={REGISTRATION_STATUS_KEY}
        />
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
    customSort: (a, b) => {
      const timestampA = Date.parse(a.updatedAt);
      const timestampB = Date.parse(b.updatedAt);
      return timestampA - timestampB;
    },
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
    title: "Date Created",
    field: "createdAt",
    customSort: (a, b) => {
      const timestampA = Date.parse(a.createdAt);
      const timestampB = Date.parse(b.createdAt);
      return timestampA - timestampB;
    },
    cellStyle: {
      whiteSpace: "nowrap"
    },
    render: (rowData) => (
      <>
        {rowData.createdAt === "Invalid Date" ? "" : rowData.createdAt}
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
