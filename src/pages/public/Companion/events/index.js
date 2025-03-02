import DataAndBeyond2023 from "./DataAndBeyond2023";
import BizTechDBLogo from "../../../../assets/2023/data&beyond/BizTechD&BLogo.png";
import BiztechMISNightLogo from "../../../../assets/2024/misnight/BiztechMISNightLogo.png";
import BiztechLogo from "../../../../assets/2024/blueprint/BiztechLogo.svg";
import BlueprintLogo from "../../../../assets/2024/blueprint/logo.png";
import DBLogo from "../../../../assets/2023/data&beyond/D&BLogo.png";
import MISLogo from "../../../../assets/2024/misnight/logo.svg";
import MISNight2023 from "./MISNight2023";
import Blueprint2024 from "./Blueprint2024";
import BlueprintLanding from "../../../../assets/2024/blueprint/landing.png";
import TechStyle2024 from "./TechStyle2024";
import Produhacks2024 from "./Produhacks2024";
import ProduhacksLogo from "../../../../assets/2024/produhacks/logo.png";
import PHLogo from "../../../../assets/2024/produhacks/btlogo.png";
import TechStyleLogo from "../../../../assets/2024/techstyle/techstyle_logo.png";
import TechStyleTexture from "../../../../assets/2024/techstyle/techstyle_grid.png";
import TSLogo from "../../../../assets/2024/techstyle/techstyle_biztech_logo.png";
import HelloHacks2024 from "./HelloHacks2024";
import UXOpen2024 from "./UXOpen2024";
import UXOpenLogo from "../../../../assets/2024/ux-open/UXOpenLogo.png";
import DataverseLogo from "../../../../assets/2024/dataverse/Dataverse.png";
import DataVerse2024 from "./DataVerse2024";
import ProductX2025 from "./ProductX2025";
import ProductXLogo from "../../../../assets/2025/productx/ProductXLogo.png";

export default [
  {
    /* Date indicating when event ends, this also indicates which app the companion app will render, to be safe, but a couple days after event ends */
    activeUntil: new Date(new Date("03-30-2025").getTime()), // Active until a week after the event
    /* id of event in dynamodb, used for queries */
    eventID: "productx",
    /* year of event in dynamodb, used for queries */
    year: 2025,
    /* component for event body */ // keep the same
    ChildComponent: ProductX2025,
    /* options defining params for the companionLayout */
    options: {
      disableWelcomeHeader: true,
      /* Biztech logo for event */
      BiztechLogo: ProductXLogo,
      /* Logo for event */
      Logo: ProductXLogo,
      /* Displayed title of event */
      title: "ProductX 2025",
      /* Displayed date of event */
      date: "March 22-23, 2025",
      /* Displayed location of event */
      location: "Henry Angus",
      /* color theme of event */
      colors: {
        primary: "white",
        background: "linear-gradient(0.5turn, #000000, #151515, #252525, #151515, #000000)",
      },
      /* function to return schedule of event, schedule is an array of date and title, regData is the responses of a registration */
      getScheduleData: () => [],
      /* Array of welcome paragraphs for event, each new index is a new paragraph */
      welcomeData: [],
      /* Array of header tabs to navigate for event, id is the id of the div in app, and text is the heaidng text */
      headers: []
    }
  },
  {
    /* Date indicating when event ends, this also indicates which app the companion app will render, to be safe, but a couple days after event ends */
    activeUntil: new Date(new Date("03-23-2024").getTime() + (7 * 24 * 60 * 60 * 1000)), // change 3 days after date
    /* id of event in dynamodb, used for queries */
    eventID: "produhacks",
    /* year of event in dynamodb, used for queries */
    year: 2024,
    /* component for event body */ // keep the same
    ChildComponent: Produhacks2024,
    /* options defining params for the companionLayout */
    options: {
      disableWelcomeHeader: true,
      /* Biztech logo for event */
      BiztechLogo: PHLogo,
      /* Logo for event */
      Logo: ProduhacksLogo,
      /* Displayed title of event */
      title: "Produhacks",
      /* Displayed date of event */
      date: "March 23-24, 2024",
      /* Displayed location of event */
      location: "The Great Hall, AMS Student Nest (2nd Floor)",
      /* color theme of event */
      colors: {
        primary: "linear-gradient(180deg, white, white)",
        background: "linear-gradient(0.5turn, #98BEA2,  #98BEA2, #98BEA2)",
      },
      /* function to return schedule of event, schedule is an array of date and title, regData is the responses of a registration */
      getScheduleData: () => [],
      /* Array of welcome paragraphs for event, each new index is a new paragraph */
      welcomeData: [
      ],
      /* Array of header tabs to navigate for event, id is the id of the div in app, and text is the heaidng text */
      headers: [
      ]
    }
  },
  {
    /* Date indicating when event ends, this also indicates which app the companion app will render, to be safe, but a couple days after event ends */
    activeUntil: new Date(new Date("03-03-2024").getTime()), // change 3 days after date
    /* id of event in dynamodb, used for queries */
    eventID: "techstyle",
    /* year of event in dynamodb, used for queries */
    year: 2024,
    /* component for event body */ // keep the same
    ChildComponent: TechStyle2024,
    /* options defining params for the companionLayout */
    options: {
      disableWelcomeHeader: true,
      /* Biztech logo for event */
      BiztechLogo: TSLogo,
      /* Logo for event */
      Logo: TechStyleLogo,
      /* Background image */
      BackgroundImage: TechStyleTexture,
      /* Displayed title of event */
      title: "TechStyle",
      /* Displayed date of event */
      date: "Saturday, March 3rd, 2024",
      /* Displayed location of event */
      location: "The Great Hall, AMS Student Nest (2nd Floor)",
      /* color theme of event */
      colors: {
        primary: "linear-gradient(180deg, black, black)",
        background: "linear-gradient(0.5turn, #E2E2E2,  #E2E2E2, #E2E2E2)",
      },
      /* function to return schedule of event, schedule is an array of date and title, regData is the responses of a registration */
      getScheduleData: () => [],
      /* Array of welcome paragraphs for event, each new index is a new paragraph */
      welcomeData: [
        "Welcome to TechStyle! This will be your friend throughout the event. Feel free to check back here to see today's schedule and browse through who's in attendance."
      ],
      /* Array of header tabs to navigate for event, id is the id of the div in app, and text is the heaidng text */
      headers: [
        {
          text: "Points",
          id: "Leaderboard"
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
        background: "linear-gradient(0.5turn, #060818,  #0A0B25, #060818)",
      },
      landing: BlueprintLanding,
      /* function to return schedule of event, schedule is an array of date and title, regData is the responses of a registration */
      getScheduleData: () => [],
      /* Array of welcome paragraphs for event, each new index is a new paragraph */
      welcomeData: [
        "Welcome to Blueprint 2024! This will be your friend throughout the event. Feel free to check back here to see today's schedule and browse through who's in attendance."
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
        "Welcome to MIS Night 2023! This will be your friend throughout the event. Feel free to check back here to see tonight's schedule and browse through who's in attendance.",
        "MIS Night is BizTech's annual networking event which gives students the opportunity to connect with MIS faculty, our Tri-Mentorship Program mentors, and more.",
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
  },
  {
    /* Date indicating when event ends, this also indicates which app the companion app will render, to be safe, but a couple days after event ends */
    activeUntil: new Date(new Date("2024-10-08").getTime() + (7 * 24 * 60 * 60 * 1000)),
    /* id of event in dynamodb, used for queries */
    eventID: "hello-hacks",
    /* year of event in dynamodb, used for queries */
    year: 2024,
    /* component for event body */ // keep the same
    ChildComponent: HelloHacks2024,
    /* options defining params for the companionLayout */
    options: {
      disableWelcomeHeader: true,
      /* Biztech logo for event */
      BiztechLogo: BiztechLogo,
      /* Logo for event */
      Logo: BiztechLogo,
      /* Displayed title of event */
      title: "HelloHacks 2024",
      /* Displayed date of event */
      date: "October 5-6, 2024",
      /* Displayed location of event */
      location: "Sauder Henry Angus",
      /* color theme of event */
      colors: {
        primary: "linear-gradient(180deg, white, white)",
        background: "linear-gradient(0.5turn, #98BEA2,  #98BEA2, #98BEA2)",
      },
      /* function to return schedule of event, schedule is an array of date and title, regData is the responses of a registration */
      getScheduleData: () => [],
      /* Array of welcome paragraphs for event, each new index is a new paragraph */
      welcomeData: [
      ],
      /* Array of header tabs to navigate for event, id is the id of the div in app, and text is the heaidng text */
      headers: [
      ]
    }
  },
  {
    /* Date indicating when event ends, this also indicates which app the companion app will render, to be safe, but a couple days after event ends */
    activeUntil: new Date(new Date("2024-11-03").getTime() + (7 * 24 * 60 * 60 * 1000)),
    /* id of event in dynamodb, used for queries */
    eventID: "ux-open",
    /* year of event in dynamodb, used for queries */
    year: 2024,
    /* component for event body */ // keep the same
    ChildComponent: UXOpen2024,
    /* options defining params for the companionLayout */
    options: {
      disableWelcomeHeader: true,
      /* Biztech logo for event */
      BiztechLogo: UXOpenLogo,
      /* Logo for event */
      Logo: UXOpenLogo,
      /* Displayed title of event */
      title: "UXOpen 2024",
      /* Displayed date of event */
      date: "Nov 2-3, 2024",
      /* Displayed location of event */
      location: "Henry Angus Building (Sauder)",
      /* color theme of event */
      colors: {
        primary: "linear-gradient(180deg, white, white)",
        background: "linear-gradient(0.5turn, #2A0538,  #744188, #CB679B, #FFAF40, #FFA26E )",
      },
      /* function to return schedule of event, schedule is an array of date and title, regData is the responses of a registration */
      getScheduleData: () => [],
      /* Array of welcome paragraphs for event, each new index is a new paragraph */
      welcomeData: [
      ],
      /* Array of header tabs to navigate for event, id is the id of the div in app, and text is the heaidng text */
      headers: [
      ]
    }
  },
  {
    /* Date indicating when event ends, this also indicates which app the companion app will render, to be safe, but a couple days after event ends */
    activeUntil: new Date(new Date("2024-12-01").getTime() + (7 * 24 * 60 * 60 * 1000)),
    /* id of event in dynamodb, used for queries */
    eventID: "dataverse",
    /* year of event in dynamodb, used for queries */
    year: 2024,
    /* component for event body */ // keep the same
    ChildComponent: DataVerse2024,
    /* options defining params for the companionLayout */
    options: {
      disableWelcomeHeader: true,
      /* Biztech logo for event */
      BiztechLogo: DataverseLogo,
      /* Logo for event */
      Logo: DataverseLogo,
      /* Displayed title of event */
      title: "Dataverse 2024",
      /* Displayed date of event */
      date: "November 30, 2024",
      /* Displayed location of event */
      location: "Great Hall",
      /* color theme of event */
      colors: {
        primary: "linear-gradient(180deg, white, white)",
        background: "linear-gradient(135deg, #3C1F62, #5A3D89, #2F3C53, #121C2C)"
      },
      /* function to return schedule of event, schedule is an array of date and title, regData is the responses of a registration */
      getScheduleData: () => [],
      /* Array of welcome paragraphs for event, each new index is a new paragraph */
      welcomeData: [
      ],
      /* Array of header tabs to navigate for event, id is the id of the div in app, and text is the heaidng text */
      headers: [
      ]
    }
  },
];
