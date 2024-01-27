import React, {
  useState, useEffect
} from "react";
import {
  Accordion, AccordionDetails, AccordionSummary, Tab, Tabs,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  fetchBackend
} from "utils";
import {
  CircularProgressbar,
  buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  constantStyles
} from "../../../../constants/_constants/companion";
import {
  styled
} from "@material-ui/styles";
import {
  ScrollingCarousel
} from "@trendyol-js/react-carousel";
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Pagination, Navigation } from 'swiper/modules';

import Companies from "../../../../assets/2024/blueprint/companies.svg";
import Sched from "../../../../assets/2024/blueprint/schedule_glow.svg";
import SchedMobile from "../../../../assets/2024/blueprint/schedule_mobile.svg";
import Mentors from "../components/mentor/Mentors";
import Podium from "../components/Podium";
import GamificationActivityTable from "../components/GamificationActivityTable";
import GamificationRewardTable from "../components/GamificationRewardTable";
import ShowcaseCard from "../components/ShowcaseCard";
import GreatHallNorth from "../../../../assets/2024/blueprint/GreatHallN.svg";
import GreatHallSouth from "../../../../assets/2024/blueprint/GreatHallS.svg";


const CustomAccordion = styled(Accordion)(({
  theme
}) => {
  return {
    background: "transparent"
  };
});

const projects = [
  {
    title: "ShipAI",
    desc: "AI project management tool helping you do less PMing",
    members: "James Shi, Serena Ge, Charley Lee",
    link: "https://unclegpt.app",
    image: "card1.png"
  },
  {
    title: "Gruwup",
    desc: "Our project enables travelers, like those flying solo to Toronto, to connect with new people sharing similar interests and plans. Unlike typical social media, which focuses on existing connections, our platform offers destination-based matching.",
    members: "Sijan Poudel, Kaleb Hui, Jerry Shao, Grant Li",
    link: "https://drive.google.com/drive/u/1/folders/1C2Ap7VbVOHJYZxZ1hF5239o_adyMEDHf",
    image: "card2.png"
  },
  {
    title: "Marketing Job Portal",
    desc: "This is a full-stack web application that serves as a job portal for marketing students to apply for internships and new-grad jobs, created for the UBC Marketing Association.",
    members: "Indira Sowy, Eric Lu, James Shi",
    link: "https://devpost.com/software/marketing-job-portal",
    image: "card3.png"
  },
  {
    title: "Glide- A ride sharing App",
    desc: "Glide is a ride-sharing app that enables users to seamlessly transition between being a rider or a glider (driver). It is a twist on the typical ride-sharing app experience. It encompasses a number of functionalities such as finding a ride, editing a ride, live communication with the driver through a chat feature, booking & confirming a ride, etc.",
    members: "Omar Ankit, Ammaar Khan, Raghav Bhagria, Raphael Mwachiti",
    link: "https://github.com/oankit/Glide-A-Ride-Sharing-App",
    image: "card4.jpeg"
  },
  {
    title: "TimeCapsules",
    desc: "TimeCapsules uses Computer Vision, AI, and SMS to innovate how we use medication. Our application will leverage OpenCV to take a picture of your pill bottle, parse the text, and then utilize OpenAI to interpret, and create a custom SMS reminder to your phone. Twilio will then send text reminders to take your pills depending on the instructions listed on the bottle.",
    members: "Jason Kuo, Marcus Kam, Jaden Lai, Jasper Mao",
    link: "https://devpost.com/software/timecapsules?ref_content=my-projects-tab&ref_feature=my_projects",
    image: "card11.png"
  },
  {
    title: "Yudo Fitness Trainer",
    desc: "Uses a custom-developed exercise detection algorithm, self-created datasets, TensorFlow AI, and Chat-GPT3 to help users improve their form and state relative accuracy score, feedback, and compliments/criticisms while doing various exercises.",
    members: "Darryl Tanzil, Michelle Wang, Joshua Chan, Theresa Xiao",
    link: "https://devpost.com/software/yudo",
    image: "card6.png"
  },
  {
    title: "Expense Buddy",
    desc: "A user-friendly web app designed to simplify the task of recording and managing business-related travel and vehicle expenses for self-employed individuals and business owners.",
    members: "Ryan Ngai, Connie Nguy, Krishna Patel, Gian Carlo Torres",
    link: "https://colab-expense-buddy.netlify.app/",
    image: "card8.PNG"
  },
  {
    title: "Small Molecular Analysis Reporting Tool (SMART)",
    desc: "SMART’s solution to accelerate the process of drug discovery, is to create a machine learning technological platform utilizing artificial intelligence for drug toxicity identification. Through this platform, scientists can leverage mapped relationships to help them find otherwise hidden drug-target insights, design better experiments.",
    members: "Caleb Lo, Henry Zhou, Carter Tsang, Muhammed Mughal",
    link: "https://m-tameem.github.io/SMART/index.html",
    image: "card7.png"
  },
  {
    title: "ReStyle",
    desc: "Developed an image-based matching service allowing users to upload clothing photos and connect with buyers.",
    members: "Steven Son, Eric Tao, Rachel Wang, Eric Zhou",
    link: "https://devpost.com/software/restyle-5owdxa",
    image: "card9.png"
  },
  {
    title: "ZenZone 3D - Reframe your Mind",
    desc: "The ZenZone is a place where we reframe your thoughts for you and let you explore our calming space. It's a 3D web app made for cmd-f in 24 hours that uses AI technology to reframe users’ worries or stressors into positive and constructive affirmations and has a 3D \"hub world\" with various interactive elements to play with.",
    members: "Tiffany Leong, Floria Gu, Yirui Li, Zelalem Araya",
    link: "https://devpost.com/software/zenzone-3d",
    image: "card10.png"
  },
  {
    title: "Planes + Electronics + Computer Vision",
    members: "UBC AeroDesign, Engineering Design Team",
    desc: "We are a group of 70+ students working on several projects to compete internationally in the SAE AeroDesign competition. Our active work include a high-performance package delivery aircraft, a drone-deploying mothership aircraft, a wireless distributed computing system, and more.",
    link: "https://www.instagram.com/ubcaerodesign/?hl=en",
    image: "card12.png"
  },
  {
    title: "ASL Translate",
    members: "Anthony Ji, Jack Yao, Sammy Kuang, Ernie Han",
    desc: "A web app that takes in text and generates the corresponding American Sign Language video of the sentence. It also has a quiz section that generates random flashcards with the videos included.",
    link: "https://devpost.com/software/asltranslate",
    image: "ASL.jpeg"
  },
  {
    title: "Planda",
    members: "Christina Yang, Annie Geng, Keshav Gopinath, Edward Zou",
    desc: "Planda is a calendar and task-management system designed by and for students. It aims to streamline time and energy for task and time management. It offers course syllabus parsing, external calendar integrations, productivity tracking, and more.",
    link: "https://planda.ca/about",
    image: "Planda.png"
  },
  {
    title: "Kadirov Shop",
    members: "Gyunay Kadirov",
    desc: "Your fashion-forward marketplace. Discover curated clothing and unique makeup accessories. Filter, search, and add favorites with ease. Checkout securely with Stripe. Sign up for personalized shopping and order tracking.",
    link: "https://my-commerce-kadirov.vercel.app/",
    image: "Kadirov.png"
  },
  {
    title: "Weave",
    members: "Alex Ma, Kai Koyama-Wong, Andrew Fan, Alessandra Liu",
    desc: `Scheduling a group meeting? Planning a road trip? Got an event coming up? The hardest part of getting together is finding time for it. And finding time for it can be frustrating. We get you.  


    With Weave, you’ll be able to schedule group events with ease, and enjoy doing so.Create.Add.Share.We make things fun and simple.`,
    link: "https://www.linkedin.com/company/try-weave/about/",
    image: "Weave.jpeg"
  }
];


const StyledAccordionSummary = styled(AccordionSummary)(() => {
  return {
    display: "flex",
    alignContent: "center",
    marginLeft: "48px !important",
  };
});

const activities = [
  {
    name: "Early check-in",
    points: "25 points"
  },
  {
    name: "Scan a professional's Linkedin QR Code (can only redeem once)",
    points: "25 points"
  },
  {
    name: "Ask a question during the panel discussion",
    points: "20 points"
  },
  {
    name: "Attend a workshop",
    points: "25 points each"
  },
  {
    name: "Post an Instagram story using the Blueprint event filter (Visit the Biztech booth and show your post to redeem)",
    points: "30 points"
  },
  {
    name: "Take a photo at the photo booth",
    points: "20 points"
  },
  {
    name: "Get interviewed by BizTech’s marketing team for Instagram reels",
    points: "20 points"
  },
  {
    name: "View the attendee showcase & vote for a personal project!",
    points: "35 points"
  },
  {
    name: "Get your photo taken at our headshot station",
    points: "20 points"
  },
  {
    name: "Participate in our attendee showcase",
    points: "25 points"
  },
];

const rewards = [
  {
    name: "Meta Quest",
    points: "180 points",
    value: 180
  },
  {
    name: "FitBit 6",
    points: "130 points",
    value: 130
  },
  {
    name: "Kindle",
    points: "100 points",
    value: 100
  },
  {
    name: "Amazon Echo Speaker",
    points: "80 points",
    value: 80
  },
  {
    name: "Blueprint Hoodie",
    points: "50 points",
    value: 50
  },
];

const Blueprint2024 = (params) => {
  const {
    event, registrations, styles, renderMobileOnly, userRegistration
  } = params;
  const [websocket, setWebsocket] = useState(null);
  const [leaderboard, setLeaderboard] = useState();

  const rewardsAscending = [...rewards].sort((a, b) => a?.value - b?.value);
  const nextGoal = rewardsAscending.find(reward => userRegistration?.points ? userRegistration?.points < reward?.value : true);

  const [tabValue, setTabValue] = useState(0);
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const refetchLeaderboard = async () => {
    const res = await fetchBackend(`/registrations/leaderboard/?eventID=${event?.id}&year=${event?.year}`, "GET", undefined, false);
    setLeaderboard(res);
  };

  useEffect(() => {
    refetchLeaderboard();
  }, [event]);

  useEffect(() => {
    try {
      // Establish WebSocket connection
      const ws = new WebSocket(process.env.REACT_APP_WEBSOCKET_API);

      // WebSocket on open
      ws.onopen = () => {
        console.log("WebSocket connected");
      };

      // WebSocket on message
      ws.onmessage = (event) => {
        // Handle WebSocket messages
        const data = event.data;
        console.log("WebSocket message received:", data);
        refetchLeaderboard();
      };

      // WebSocket on close
      ws.onclose = () => {
        console.log("WebSocket disconnected");
      };
      setWebsocket(ws);
    } catch {
      console.error("Error connecting to websocket");
    } finally {
      refetchLeaderboard();
    }
    return () => {
      // Close WebSocket connection on component unmount
      if (websocket) {
        websocket.close();
      }
    };
  }, []); // Only runs on component mount and unmount
  return (<>
    {event && registrations &&
      <div>
        <div id="Schedule" style={styles.column}>
          <h1 style={renderMobileOnly ? styles.mobileTitle : styles.title}>Schedule</h1>
          {renderMobileOnly ? <img src={SchedMobile} alt="Schedule" style={renderMobileOnly ? styles.scheduleMobile : styles.schedule} />
            : <img src={Sched} alt="Schedule" style={renderMobileOnly ? styles.scheduleMobile : styles.schedule} />}
        </div>
        <div id="Leaderboard" style={styles.column}>
          <h1 style={renderMobileOnly ? styles.mobileTitle : styles.title}>Your Points</h1>
          <div style={{
            width: renderMobileOnly ? "60%" : "20%"
          }}>
            <CircularProgressbar styles={
              buildStyles({
                textSize: "12px",
                textColor: "#FFC3F4",
                pathColor: "#FFC3F4",
                trailColor: "#261946",
                strokeLinecap: "butt"
              })
            } value={nextGoal ? (userRegistration?.points / nextGoal?.value) * 100 : 100} text={`${userRegistration?.points ? userRegistration?.points : 0} points`} />;
          </div>
          <span style={{
            ...styles.text,
            ...(renderMobileOnly && {
              fontSize: constantStyles.mobileFontSize
            })
          }}>{nextGoal ? `Only ${nextGoal?.value - userRegistration?.points} points away from a ${nextGoal?.name} entry!` : "You're eligible for all entries! See if you can top the leaderboards 👀"}</span>
          {leaderboard && <Podium winners={leaderboard} />}
        </div>
        <div id="Activities" style={{
          ...styles.column,
          width: "90%"
        }}>
          <CustomAccordion>
            <StyledAccordionSummary id="panel-header" aria-controls="panel-content"
              expandIcon={<ExpandMoreIcon />}>
              <h1 style={renderMobileOnly ? styles.mobileTitle : styles.title}>Points Activities</h1>
            </StyledAccordionSummary>
            <AccordionDetails>
              <GamificationActivityTable activitiesProp={activities} />
            </AccordionDetails>
          </CustomAccordion>

        </div>
        <div id="Rewards" style={{
          ...styles.column,
          width: "90%"
        }}>
          <CustomAccordion>
            <StyledAccordionSummary id="panel-header" aria-controls="panel-content"
              expandIcon={<ExpandMoreIcon />}>
              <h1 style={renderMobileOnly ? styles.mobileTitle : styles.title}>Raffles</h1>
            </StyledAccordionSummary>
            <AccordionDetails>
              <GamificationRewardTable rewardsProp={rewards} />
            </AccordionDetails>
          </CustomAccordion>
        </div>
        <div id="Floorplan" style={styles.column}>
          <h1 style={renderMobileOnly ? styles.mobileTitle : styles.title}>Floorplan</h1>
          <div style={{
            textAlign: "center"
          }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              centered
              style={{
                color: "white",
                paddingBottom: "20px"
              }}
              TabIndicatorProps={{
                style: {
                  backgroundColor: "#FFC3F4",
                }
              }}
            >
              <Tab label="Great Hall North" id="tab-0" />
              <Tab label="Great Hall South" id="tab-1" />
            </Tabs>
            {tabValue === 0 && (
              <img src={GreatHallNorth} alt="Great Hall North" style={styles.tabImage} />
            )}
            {tabValue === 1 && (
              <img src={GreatHallSouth} alt="Great Hall South" style={styles.tabImage} />
            )}
            <h3 style={styles.subheading}>Activities happening here:</h3>
            {tabValue === 0 && (
              <ul style={styles.listItem}>
                <li>Opening Ceremony</li>
                <li>Keynote and Panel</li>
                <li>Workshops</li>
                <li>Closing Ceremony</li>
              </ul>
            )}
            {tabValue === 1 && (
              <ul style={styles.listItem}>
                <li>Boothing & Networking</li>
                <li>Lunch</li>
              </ul>
            )}
          </div>
        </div>
        <div id="Showcase" style={styles.column}>
          <h1 style={renderMobileOnly ? styles.mobileTitle : styles.title}>Attendee Showcase</h1>
          <span style={{
            ...styles.text,
            ...(renderMobileOnly && {
              fontSize: constantStyles.mobileFontSize
            })
          }}>{"Vote for your favourite project at the attendee showcase booth and earn points!"}</span>
          <ScrollingCarousel style={{
            columnGap: "5px"
          }}>
            {
              projects.map((project, i) => {
                return <ShowcaseCard pos={i} key={i} title={project.title} image={project.image} members={project.members} link={project.link} desc={project.desc} />;
              })
            }
          </ScrollingCarousel>
          {/* <Swiper
          spaceBetween={5}
          navigation={true} modules={[Navigation]} 
          pagination={{dynamicBullets: true,}} modules={[Pagination]}
          >
          {
              projects.map((project, i) => {
              return <SwiperSlide key={i}>
                <ShowcaseCard pos={i} key={i} title={project.title} image={project.image} members={project.members} link={project.link} desc={project.desc}/>
                </SwiperSlide>;
              })
            }
        </Swiper> */}
        </div>
        <Mentors id="Mentors" event={event} registrations={registrations} styles={styles} />
        <div id="Partners" style={styles.column}>
          <h1 style={renderMobileOnly ? styles.mobileTitle : styles.title}>Attending Partners</h1>
          <img src={Companies} alt="Blueprint Partners" style={styles.partners} />
        </div>
      </div>
    }
  </>
  );
};

export default Blueprint2024;

