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

    userResponse["id"] = user.id;

    if (registrationResponses) {
      registrationResponses.forEach((response) => {
        userResponse[response.questionId] = response.value;
      });
    }

    parsedData.push(userResponse);
  });

  return parsedData;
};

const combineEventAndRegistrationData = (users, registrationResponses) => {
  let idToUserMap = new Map();

  users.forEach((user) => {
    idToUserMap.set(user.id, user);
  });

  registrationResponses.forEach((registration) => {
    const {id, ...responses} = registration;
    const user = idToUserMap.get(id);

    idToUserMap.set(id, {
      ...user,
      ...responses
    });
  });

  return [...idToUserMap.values()]
};

const appendRegistrationQuestions = (columns, registrationQuestions) => {
  registrationQuestions.forEach((question) => {
    let column = {};

    column["title"] = question.label;
    column["field"] = question.questionId;
    column["sorting"] = false;

    columns.push(column);
  });
}

export { parseRegistrationResponses, combineEventAndRegistrationData, appendRegistrationQuestions };
