import DataAndBeyond2023 from "./DataAndBeyond2023";
import MISNight2023 from "./MISNight2023";
import BizTechDBLogo from "../../../../assets/2023/data&beyond/BizTechD&BLogo.png";
import DBLogo from "../../../../assets/2023/data&beyond/D&BLogo.png";
import MISLogo from "../../../../assets/2024/misnight/logo.svg";

export default [
  {
    /* Date indicating when event ends, this also indicates which app the companion app will render, to be safe, but a couple days after event ends */
    activeUntil: new Date(new Date("2023-09-17").getTime() + (7 * 24 * 60 * 60 * 1000)),
    /* id of event in dynamodb, used for queries */
    eventID: "data-and-beyond",
    /* year of event in dynamodb, used for queries */
    year: 2023,
    /* component for event body */
    ChildComponent: DataAndBeyond2023,
    /* options defining params for the companionLayout */
    options: {
      // @TODO change this
      BiztechLogo: BizTechDBLogo,
      // @TODO change this
      Logo: MISLogo,
      /* Displayed title of event */
      title: "MIS Night 2023",
      /* Displayed date of event */
      date: "Friday, September 15th",
      // @TODO change this
      location: "TBD",
      // @TODO change this
      colors: {
        primary: "linear-gradient(180deg, #FFFFFF, #FFFFFF)",
        background: "linear-gradient(180deg, #7ABAE9, #3886BF)",
      },
      /* function to return schedule of event, schedule is an array of date and title, regData is the responses of a registration */
      getScheduleData: (regData) => [
        {
          date: "5:45 pm - 6:00 pm",
          title: "Registration & Check in",
        },
        {
          date: "6:00 pm - 6:20 pm",
          title: "Opening Ceremony",
        },
        {
          date: "6:20 pm - 6:50 pm",
          title: "Panel Discussion",
        },
        {
          date: "6:50 pm - 7:20 pm",
          title: "Dinner",
        },
        {
          date: "7:20 pm - 7:30 pm",
          title: "Newtworking Activity",
        },
        {
          date: "7:30 pm - 8:20 pm",
          title: "Open Networking",
        },
        {
          date: "8:20 pm - 8:30 pm",
          title: "Closing Remarks",
        }
      ],
      // @TODO change this
      welcomeData: [
        "Welcome to MIS Night 2023! This will be your friend throughout the event. Feel free to check back here to see tonight’s schedule and browse through who’s in attendance.",
        "MIS Night is BizTech’s annual networking event which gives students the opportunity to connect with MIS faculty, our Tri-Mentorship Program mentors, and more.",
        "Thank you for coming and we hope you enjoy your night!"
      ],
      /* Array of header tabs to navigate for event, id is the id of the div in app, and text is the heaidng text */
      headers: [{
        text: "Partners",
        id: "Partners"
      },
      {
        text: "Mentors",
        route: "/companion/mentors"
      }]
    }
  },
  {
    /* Date indicating when event ends, this also indicates which app the companion app will render, to be safe, but a couple days after event ends */
    activeUntil: new Date(new Date("2023-03-17").getTime() + (7 * 24 * 60 * 60 * 1000)),
    /* id of event in dynamodb, used for queries */
    eventID: "data-and-beyond",
    /* year of event in dynamodb, used for queries */
    year: 2023,
    /* component for event body */
    ChildComponent: DataAndBeyond2023,
    /* options defining params for the companionLayout */
    options: {
      /* Biztech logo for event */
      BiztechLogo: BizTechDBLogo,
      /* Logo for event */
      Logo: DBLogo,
      /* Displayed title of event */
      title: "Data and Beyond 2023",
      /* Displayed date of event */
      date: "Friday, March 17th",
      /* Displayed location of event */
      location: "Birmingham Hall",
      /* color theme of event */
      colors: {
        primary: "linear-gradient(180deg, #614AD7, #719DF8)",
        background: "linear-gradient(180deg, #e3edf7, #e3edf7)",
      },
      /* function to return schedule of event, schedule is an array of date and title, regData is the responses of a registration */
      getScheduleData: (regData) => [
        {
          date: "5:30 pm - 6:00 pm",
          title: "Registration & Check in",
        },
        {
          date: "6:00 pm - 6:15 pm",
          title: "Opening (BizTech and BOLT Introduction)",
        },
        {
          date: "6:15 pm - 6:30 pm",
          title: "Keynote Speech",
        },
        {
          date: "6:30 pm - 7:00 pm",
          title: `Workshop: ${regData.dynamicResponses["a3f58578-219c-4e8f-b4be-8af8f6b9e1fb"]}`,
        },
        {
          date: "7:30 pm - 8:00 pm",
          title: "Data Challenge",
        },
        {
          date: "8:00 pm - 9:00 pm",
          title: "Boothing and Networking Session",
        }
      ],
      /* Array of welcome paragraphs for event, each new index is a new paragraph */
      welcomeData: [
        "This will be your friend throughout the event! Check back regularly to see the event schedule, and your team's current point total during the Data Challenge!",
        "Data & Beyond is a half-day conference hosted in collaboration between UBC BizTech and BOLT UBC. The theme is \"Launching Careers in Data\" - as data becomes ever-present in our lives, there are endless opportunities offered in numerous industries and we want to guide you through the journey of discovering the prospects of data science-related careers.",
        "We hope you have an amazing time with us at Data & Beyond 2023!"
      ],
      /* Array of header tabs to navigate for event, id is the id of the div in app, and text is the heaidng text */
      headers: [{
        text: "Partners",
        id: "Partners"
      }]
    }
  }
];
