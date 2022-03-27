/**
 * Helper function to get registration responses in an array of userResponses
 * @param {*} registrations the response from the registration endpoint
 */
const parseRegistrationResponses = (registrations) => {
  const { data } = registrations;
  const parsedData = [];

  data.forEach((user) => {
    const { registrationResponses } = user;
    const userResponse = {};

    userResponse.id = user.id;

    if (registrationResponses) {
      registrationResponses.forEach((response) => {
        userResponse[response.questionId] = response.value;
      });
    }

    parsedData.push(userResponse);
  });

  return parsedData;
};

/**
 * Combines the users from the events backend with the registration question responses.
 * @param {*} users the response from the events backend
 * @param {*} registrationResponses the array of user response objects
 */
const combineEventAndRegistrationData = (users, registrationResponses) => {
  const idToUserMap = new Map();

  users.forEach((user) => {
    idToUserMap.set(user.id, user);
  });

  registrationResponses.forEach((registration) => {
    const { id, ...responses } = registration;
    const user = idToUserMap.get(id);

    idToUserMap.set(id, {
      ...user,
      ...responses,
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
    const column = {};

    column.title = question.label;
    column.field = question.questionId;
    column.sorting = false;

    columns.push(column);
  });
};

export {
  parseRegistrationResponses,
  combineEventAndRegistrationData,
  appendRegistrationQuestions,
};
