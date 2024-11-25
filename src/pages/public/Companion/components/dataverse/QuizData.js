const quizData = {
  1: {
    questions: [
      "Which player had the most rebounds in a single game?",
      "Which of the following teams scored the most points?",
      "Based on historical outcomes, if the Boston Celtics and Charlotte Hornets play against each other, who would you predict would win?",
      "Which of the following attributes is most positively correlated with Total Points Scored?",
      "What is this SQL query trying to do? \n\nSELECT player \nFROM NBA \nWHERE team = 'NYK' AND total_points >= 20"
    ],
    questionType: [
      "text", // Free text question
      "multiple-choice", // Free text question
      "multiple-choice", // Free text question
      "multiple-choice", // Free text question
      "multiple-choice" // Free text question
    ],
    correctAnswers: [
      "Victor Wembanyama",
      "TOR",
      "BOS",
      "Field Goal Attempts",
      "Retrieve all players who play for the New York Knicks and scored at least 20 points in a game"
    ],
    options: [
      [],
      ["ATL", "TOR", "WAS"],
      ["BOS", "CHO"],
      ["Field Goal Attempts", "3 Pointer Attempts", "Free Throw Attempts"],
      [
        "Retrieve all players who scored at least 20 points in a game",
        "Retrieve the total points scored by New York Knicks players who scored more than 20 points in a game",
        "Retrieve all players who play for the New York Knicks and scored at least 20 points in a game"
      ]
    ] // No multiple choice questions for this quiz
  },
  2: {
    questions: [
      "Which of the following graphs would best display the relationship between vid_duration and views?\n\na) Bar Chart\nb) Pie Chart\nc) Scatter Plot",
      "How many subscribers did this channel gain in the year with the highest subscriber growth?",
      "What's the ID of the video with the highest ratio of likes to dislikes?",
      "Youtube Ads were the channel's largest source of revenue in 2024. What percentage of 2024's total revenue came from these ads? (Round to the nearest percentage)",
      "Videos published on which day of the week have the highest average number of views?\n\na) Sunday\nb) Monday\nc) Tuesday\nd) Wednesday\ne) Thursday\nf) Friday\ng) Saturday"
    ],
    questionType: [
      "multiple-choice", // Multiple choice question
      "text", // Free text question
      "text", // Free text question
      "text", // Free text question
      "multiple-choice" // Multiple choice question
    ],
    correctAnswers: ["c) Scatter Plot", "42187", "325", "63%", "f) Friday"],
    options: [
      ["a) Bar Chart", "b) Pie Chart", "c) Scatter Plot"], // Multiple choice options for the first question
      [], // No options for this text question
      [], // No options for this text question
      [], // No options for this text question
      [
        "a) Sunday",
        "b) Monday",
        "c) Tuesday",
        "d) Wednesday",
        "e) Thursday",
        "f) Friday",
        "g) Saturday"
      ] // Multiple choice options for the last question
    ]
  },
  3: {
    questions: [
      "How many hours per day on average does a student spend socializing? (Round to the nearest whole number)",
      "How many hours per day does the student with the median GPA in this dataset spend studying and participating in extracurriculars?",
      "Students with higher GPAs tend to have higher stress levels. \na) True\nb) False",
      "What's the difference between the average GPA of a student who gets <= 6 hours of sleep per day vs a student who gets >= 9 hours of sleep per day? (Round to 3 decimal places)",
      "What should be placed in the blank to complete the following SQL query, which retrieves the ID of the most physically active student? (type out the value of A before B, and separate them by a comma -> 'A, B')"
    ],
    questionType: [
      "text", // Free text question
      "text", // Free text question
      "multiple-choice", // Multiple choice question
      "text", // Free text question
      "text" // Free text question
    ],
    correctAnswers: [
      "3",
      "9.9",
      "a) True",
      "0.015",
      "b) physical_hours_daily, MAX"
    ],
    options: [
      [], // No options for this text question
      [], // No options for this text question
      ["True", "False"], // Multiple choice options
      [], // No options for this text question
      [] // No options for this text question
    ]
  }
};

const areAllQuestionsInArray = ({ quizNumber, checkArray }) => {
  const quizQuestions = quizData[quizNumber]?.questions || [];
  return quizQuestions.every((question) => checkArray.includes(question));
};

export { areAllQuestionsInArray, quizData };
