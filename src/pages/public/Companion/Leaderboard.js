import React, { useState, useEffect } from "react";
import { makeStyles, Typography, Modal, Button } from "@material-ui/core";
import readSpreadsheet from "utils/_utils/sheets";
import { ProgressBar, Step } from "react-step-progress-bar";
import Loading from "pages/Loading";

import BizTechDBLogo from "../../../assets/2023/data&beyond/BizTechD&BLogo.png";
import FirstPlace from "../../../assets/2023/data&beyond/firstplace.png";
import SecondPlace from "../../../assets/2023/data&beyond/secondplace.png";
import ThirdPlace from "../../../assets/2023/data&beyond/thirdplace.png";
import Wave from "../../../assets/2023/data&beyond/wave.png"
import "./animations.css"
import Podium from "./components/Podium";
import { fetchBackend } from "utils";

const styles = {
  container: {
    backgroundColor: "transparent",
    backgroundImage: "linear-gradient(180deg, #e3edf7, #e3edf7)",
    overflow: "hidden",
    minHeight: "100vh",
    display: "flex",
    padding: "75px",
    flexDirection: "column",
    alignItems: "center",
  },
  modal: {
    display: "flex",
    flexDirection: "row",
    alignItems: "end",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "#172037",
    borderColor: "#172037",
    margin: "auto",
    borderRadius: 5,
    padding: 10,
  },
  waveFooter: {
    position: "absolute",
    width: "100%",
    height: "20%",
  },
  title: {
    fontFamily: "Proximanova",
    textAlign: "center",
    backgroundImage: "linear-gradient(180deg, #614AD7, #719DF8)",
    WebkitBackgroundClip: "text",
    height: "60px",
    color: "transparent",
    fontSize: 50,
    fontWeight: 700,
    marginBottom: "20px",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: "25px",
  },
  column: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  progressButton: {
    height: 60,
    width: 60,
  },
  icon: {
    height: 60,
    width: "5%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  arrowUp: {
    width: 0,
    height: 0,
    borderLeft: "10px solid transparent",
    borderRight: "10px solid transparent",
    borderBottom: "10px solid #3CB371",
  },
  arrowDown: {
    width: 0,
    height: 0,
    borderLeft: "10px solid transparent",
    borderRight: "10px solid transparent",
    borderTop: "10px solid red",
  },
  glow: {
    backgroundImage: "linear-gradient(to right, #ABADF7, #8FEEE7)",
    animation: "glow 1s ease-in-out infinite alternate"
  }
};

const useStyles = makeStyles((theme) => ({
  boldText: {
    fontWeight: "bold",
    fontSize: "24px",
    fontFamily: "Proximanova",
    color: "#172442",
    width: "10%"
  },
}));

const Leaderboard = () => {
  const classes = useStyles();
  const [teamData, setTeamData] = useState([])
  const [prevTeamData, setPrevTeamData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [timer, setTimer] = useState(30)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const TOTAL_POSSIBLE = 68 + 25
  const colours = {
    "0": "#3CB371",
  }
  const trophies = {
    "0": FirstPlace,
    "1": SecondPlace,
    "2": ThirdPlace,
  }

  window.addEventListener("resize", () => setWindowWidth(window.innerWidth))

  function getSortOrder(prop) {    
    return function(a, b) {    
      if (a[prop] > b[prop]) {    
          return -1;    
      } else if (a[prop] < b[prop]) {    
          return 1;    
      }    
      return 0;    
    }    
  }

  const fetchTeamData = async (first = false) => {
    setPrevTeamData(teamData)
    const spreadsheet = await readSpreadsheet();
    const teams = await fetchBackend("/team/data-and-beyond/2023", "GET", undefined, false)
    const points = []
    spreadsheet.forEach((entry) => {
      if (entry.Score) {
        const result = entry.Score.split("/")
        const score = Number(result[0].trim())
        if (!(points.find((obj) => obj.name === entry.Team))) {
          points.push({name: entry.Team, current: 0})
        }
        const i = points.findIndex((obj) => obj.name === entry.Team)
        points[i].current += isNaN(score) ? 0 : score
      }
    })
    teams.forEach((team) => {
      if (!(points.find((obj) => obj.name === team.teamName))) {
        points.push({name: team.teamName, current: 0})
      }
      const i = points.findIndex((obj) => obj.name === team.teamName)
      points[i].current += team.points
    })
    points.sort(getSortOrder("current"))
    setTeamData(points)
    if (first) {
      setPrevTeamData(points)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    fetchTeamData(true);
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
      setTimeout(() => {
        if (timer === 1) {
          setIsLoading(true)
          fetchTeamData();
          setTimer(30)
        } else {
          setTimer(timer - 1)
        }
      }, 1000)
    }, [timer]) // eslint-disable-line react-hooks/exhaustive-deps

  const renderChangeIcon = (idx) => {
    const oldIdx = prevTeamData.findIndex((team) => 
      team.name === teamData[idx].name
    )
    if (idx < oldIdx) {
      return <div style={styles.arrowUp} />
    }
    if (idx > oldIdx) {
      return <div style={styles.arrowDown} />
    }
    return <></>
  }
  
  const morePoints = (idx) => {
    const oldData = prevTeamData.find((team) => 
      team.name === teamData[idx].name
    )
    return oldData.current < teamData[idx].current
  }

  return (
    <div style={styles.container}>
      <Modal open={isModalOpen} onBackdropClick={() => setIsModalOpen(false)}>
        <div style={styles.modal}>
          <Podium winners={teamData.slice(0, 3).map((winner, position) => ({ ...winner, position}))}/>
          <img src={Wave} alt="wave" style={styles.waveFooter}></img>
        </div>
      </Modal>
      {isLoading ? <Loading /> : 
        <>
          <div style={styles.title}>Data Challenge Leaderboard</div>
          <div style={{marginBottom: "20px"}}>Next update in {timer} second{timer !== 1 && "s"}</div>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setIsModalOpen(true)
            }}
          >
            Show Winners
          </Button>
          <div style={styles.column}>
            {teamData.map((team, idx) => (
              <>
              {team.current !== 0 && 
                <div style={styles.row} key={team.name + idx}>
                  <Typography className={classes.boldText} style={{...(colours[idx] && {color: colours[idx]})}}>{team.name}</Typography>
                  <div style={styles.icon}>
                    {trophies[idx] && <img src={trophies[idx]} alt="trophy" style={{width: "100%", height: "100%", marginRight: "50%"}}/>}
                  </div>
                  <ProgressBar
                    percent={team.current/TOTAL_POSSIBLE * 100}
                    filledBackground="linear-gradient(to right, #ABADF7, #8FEEE7)"
                    unfilledBackground="rgba(173, 173, 173, 0.2)"
                    width="70%"
                    height={25}
                    stepPositions={[team.current/TOTAL_POSSIBLE * 100,team.current/TOTAL_POSSIBLE * 100]}
                  >
                    <Step>
                      {() => (
                        <div style={{...(morePoints(idx) && styles.glow), height: 25, width: `${((windowWidth - 150) * 0.70) * (team.current/TOTAL_POSSIBLE)}px`, borderRadius: 10, position: "absolute", right: "50%"}}></div>
                      )}
                    </Step>
                    <Step>
                      {() => (
                        <img src={BizTechDBLogo} alt="BizTech Logo" style={styles.progressButton}></img>
                      )}
                    </Step>
                  </ProgressBar>
                  <div style={styles.icon}>
                    {renderChangeIcon(idx)}
                  </div>
                  <Typography className={classes.boldText} style={{...(colours[idx] && {color: colours[idx]})}}>{`${team.current} Points`}</Typography>
                </div>
              }
              </>
            ))}
          </div>
        </>
      }
    </div>
  )
}

export default Leaderboard;