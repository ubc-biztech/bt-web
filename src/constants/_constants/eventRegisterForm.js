export const BASIC_QUESTIONS = [
  {
    questionType: "TEXT",
    question: "Email Address",
    choices: "",
    required: true
  },
  {
    questionType: "TEXT",
    question: "First Name",
    choices: "",
    required: true
  },
  {
    questionType: "TEXT",
    question: "Last Name",
    choices: "",
    required: true
  },
  {
    questionType: "SELECT",
    question: "Year Level",
    choices: "1st Year,2nd Year,3rd Year,4th Year,5+ Year,Other,Not Applicable",
    required: true
  },
  {
    questionType: "SELECT",
    question: "Faculty",
    choices:
      "Arts,Commerce,Science,Engineering,Kinesiology,Land and Food Systems,Forestry,Other,Not Applicable",
    required: true
  },
  {
    questionType: "TEXT",
    question: "Major/Specialization",
    choices: "",
    required: true
  },
  {
    questionType: "SELECT",
    question: "Preferred Pronouns",
    choices: "He/Him/His,She/Her/Hers,They/Them/Their,Other/Prefer not to say",
    required: true
  },
  {
    questionType: "SELECT",
    question: "Any dietary restrictions?",
    choices: "None,Vegetarian,Vegan,Gluten Free,Pescetarian,Kosher,Halal",
    required: true
  },
  {
    questionType: "SELECT",
    question: "How did you hear about this event?",
    choices:
      "Boothing,Facebook,Instagram,LinkedIn,Friends/Word of Mouth,BizTech Newsletter,Other",
    required: true
  }
];

export const QUESTION_DOMAINS = {
  SWE: "SWE",
  PM: "PM",
  UX: "UX"
};
