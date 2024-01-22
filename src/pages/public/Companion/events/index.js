import DataAndBeyond2023 from "./DataAndBeyond2023";
import BizTechDBLogo from "../../../../assets/2023/data&beyond/BizTechD&BLogo.png";
import BiztechMISNightLogo from "../../../../assets/2024/misnight/BiztechMISNightLogo.png";
import BiztechLogo from "../../../../assets/2024/blueprint/BiztechLogo.svg";
import BlueprintLogo from "../../../../assets/2024/blueprint/logo.png";
import DBLogo from "../../../../assets/2023/data&beyond/D&BLogo.png";
import MISLogo from "../../../../assets/2024/misnight/logo.svg";
import MISNight2023 from "./MISNight2023";
import Blueprint2024 from "./Blueprint2024";
import BlueprintLanding from "../../../../assets/2024/blueprint/landing.svg";

export default [
  { /* TODO: This hello hacks component is incomplete and exists only for the sake of testing out how mentors list looks */
    /* Date indicating when event ends, this also indicates which app the companion app will render, to be safe, but a couple days after event ends */
    activeUntil: new Date(new Date("01-30-2024").getTime() + (7 * 24 * 60 * 60 * 1000)), // change 3 days after date
    /* id of event in dynamodb, used for queries */
    eventID: "blueprint",
    /* year of event in dynamodb, used for queries */
    year: 2024,
    /* component for event body */ // keep the same
    ChildComponent: Blueprint2024,
    /* options defining params for the companionLayout */
    options: {
      disableWelcomeHeader: true,
      /* Biztech logo for event */
      BiztechLogo: BiztechLogo,
      /* Logo for event */
      Logo: BlueprintLogo,
      /* Displayed title of event */
      title: "Blueprint",
      /* Displayed date of event */
      date: "Saturday, January 27th, 2024",
      /* Displayed location of event */
      location: "The Great Hall, AMS Student Nest (2nd Floor)",
      /* color theme of event */
      colors: {
        primary: "linear-gradient(180deg, #FFE0F9, #FFFCFE)",
        // background: "",
        background: "linear-gradient(0.5turn, #060818,  #0A0B25, #060818)",
      },
      landing: BlueprintLanding,
      /* function to return schedule of event, schedule is an array of date and title, regData is the responses of a registration */
      getScheduleData: () => [],
      // getScheduleData: (regData) => [
      //   {
      //     date: "10:30 am - 11:00 am",
      //     title: "Registration",
      //   },
      //   {
      //     date: "11:00 am - 11:25 am",
      //     title: "Opening Remarks & Keynote",
      //   },
      //   {
      //     date: "11:30 am - 12:00 pm",
      //     title: "Panel",
      //   },
      //   {
      //     date: "12:10 pm - 12:50 pm",
      //     title: "Lunch",
      //   },
      //   {
      //     date: "1:00 pm - 1:40 pm",
      //     title: "Workshop 1 in Great Hall North OR Boothing & Networking in Great Hall South",
      //   },
      //   {
      //     date: "1:55 pm - 2:35 pm",
      //     title: "Workshop 2 in Great Hall North OR Boothing & Networking in Great Hall South",
      //   },
      //   {
      //     date: "2:50pm - 3:30 pm",
      //     title: "Workshop 3 in Great Hall North OR Boothing & Networking in Great Hall South",
      //   },
      //   {
      //     date: "3:45 pm - 4:25 pm",
      //     title: "Workshop 4 in Great Hall North OR Boothing & Networking in Great Hall South",
      //   },
      //   {
      //     date: "4:30 pm - 5:00 pm",
      //     title: "Closing Remarks/Prize Raffle",
      //   },
      // ],
      /* Array of welcome paragraphs for event, each new index is a new paragraph */
      welcomeData: [
        "Welcome to Blueprint 2024! This will be your friend throughout the event. Feel free to check back here to see today's schedule and browse through who’s in attendance."
      ],
      /* Array of header tabs to navigate for event, id is the id of the div in app, and text is the heaidng text */
      headers: [
        {
          text: "Points",
          id: "Leaderboard"
        },
        {
          text: "Floorplan",
          id: "Floorplan"
        },
        {
          text: "Mentors",
          id: "Mentors"
        }
      ]
    }
  },
  { /* TODO: This hello hacks component is incomplete and exists only for the sake of testing out how mentors list looks */
    /* Date indicating when event ends, this also indicates which app the companion app will render, to be safe, but a couple days after event ends */
    activeUntil: new Date(new Date("10-01-2023").getTime() + (7 * 24 * 60 * 60 * 1000)),
    /* id of event in dynamodb, used for queries */
    eventID: "hello-hacks",
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
      title: "Hello Hacks",
      /* Displayed date of event */
      date: "Saturday, September 30th",
      /* Displayed location of event */
      location: "TBD",
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
        "placeholder"
      ],
      /* Array of header tabs to navigate for event, id is the id of the div in app, and text is the heaidng text */
      headers: [{
        text: "Partners",
        id: "Partners"
      }]
    }
  },
  {
    /* Date indicating when event ends, this also indicates which app the companion app will render, to be safe, but a couple days after event ends */
    activeUntil: new Date(new Date("2023-09-17").getTime() + (7 * 24 * 60 * 60 * 1000)),
    /* id of event in dynamodb, used for queries */
    eventID: "mis-night",
    /* year of event in dynamodb, used for queries */
    year: 2023,
    /* component for event body */
    ChildComponent: MISNight2023,
    /* options defining params for the companionLayout */
    options: {
      // @TODO change this
      BiztechLogo: BiztechMISNightLogo,
      // @TODO change this
      Logo: MISLogo,
      /* Displayed title of event */
      title: "MIS Night 2023",
      /* Displayed date of event */
      date: "Friday, September 15th",
      // @TODO change this
      location: "UBC Asian Centre Auditorium",
      // @TODO change this
      colors: {
        primary: "linear-gradient(180deg, #FFFFFF, #FFFFFF)",
        background: "linear-gradient(180deg, #0062A9, #7ABAE9)",
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
          title: "Networking Activity",
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
        text: "Mentors",
        id: "Mentors"
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
