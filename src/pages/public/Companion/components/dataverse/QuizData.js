const quizData = {
  1: {
    questions: [
      "Which player had the most rebounds in a single game?",
      "How many points did the players on ATL score in total?",
      "Determine whether Field Goal Attempts, 3 Pointer Attempts, or Free Throw Attempts has the strongest positive correlation with Total Points Scored. Report the correlation coefficient of the variable with the strongest positive relationship (Round to two decimal places).",
      "What is this SQL query trying to do? \n\nSELECT player \nFROM NBA \nWHERE team = 'NYK' AND total_points >= 20",
      "Based on historical outcomes, if the Boston Celtics and Charlotte Hornets play against each other, who would you predict would win?"
    ],
    questionType: [
      "text", // Free text question
      "text", // Free text question
      "text", // Free text question
      "multiple-choice", // Free text question
      "multiple-choice" // Free text question
    ],
    correctAnswers: [
      "Victor Wembanyama",
      "703",
      "0.89",
      "Retrieve all players who play for the New York Knicks and scored at least 20 points in a game",
      "BOS"
    ],
    options: [
      [],
      [],
      [],
      [
        "Retrieve all players who scored at least 20 points in a game",
        "Retrieve the total points scored by New York Knicks players who scored more than 20 points in a game",
        "Retrieve all players who play for the New York Knicks and scored at least 20 points in a game"
      ],
      ["BOS", "CHO"]
    ] // No multiple choice questions for this quiz
  },
  2: {
    questions: [
      "Which of the following graphs would best display the relationship between vid_duration and views?\n\na) Bar Chart\nb) Pie Chart\nc) Scatter Plot",
      "What's the ID of the video with the highest net subscriber gain (subs gained - unsubs)?",
      "What's the ID of the video with the highest ratio of likes to dislikes?",
      "Youtube Ads were the channel's largest source of revenue in 2024. What percentage of 2024's total revenue came from these ads? (Round to the nearest percentage and do not include the \"%\" in your answer)",
      "Videos published on which day of the week have the highest average number of views?"
    ],
    questionType: [
      "multiple-choice", // Multiple choice question
      "text", // Free text question
      "text", // Free text question
      "text", // Free text question
      "multiple-choice"
    ],
    correctAnswers: ["Scatter Plot", "188", "325", "63", "Friday"],
    options: [
      ["Bar Chart", "Pie Chart", "Scatter Plot"], // Multiple choice options for the first question
      [], // No options for this text question
      [], // No options for this text question
      [],
      ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] // No options for this text question
    ]
  },
  3: {
    questions: [
      "How many hours per day on average does a student spend socializing? (Round to the nearest whole number)",
      "What's the difference between the average GPA of a student who gets <= 6 hours of sleep per day vs a student who gets >= 9 hours of sleep per day? (Round to 3 decimal places)",
      "What should be placed in the blank to complete the following SQL query, which retrieves the ID of the most physically active student? (type out the value of A before B, and separate them by a comma -> \"A, B\") \n\nSELECT id \nFROM students \nWHERE [A] = (SELECT [B](physical_hours_daily) FROM students)",
      "Of all the students who are experiencing high stress (3), what's the ID of the one with the highest GPA?",
      "What's the correlation between study hours and sleep hours? (Round to 2 decimal places)"
    ],
    questionType: [
      "text", // Free text question
      "text", // Free text question
      "text", // Free text question
      "text", // Free text question
      "text"
    ],
    correctAnswers: ["3", "0.015", "physical_hours_daily, MAX", "52", "0.03"],
    options: [
      [], // No options for this text question
      [], // No options for this text question
      [], // No options for this text question
      [], // No options for this text question
      []
    ]
  }
};

const areAllQuestionsInArray = ({
  quizNumber, checkArray
}) => {
  const quizQuestions = quizData[quizNumber]?.questions || [];
  return quizQuestions.every((question) => checkArray.includes(question));
};

export {
  areAllQuestionsInArray, quizData
};
