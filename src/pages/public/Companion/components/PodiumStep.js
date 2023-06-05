import React from "react";
import {
  motion
} from "framer-motion";

import First from "../../../../assets/2023/data&beyond/1st.png";
import Second from "../../../../assets/2023/data&beyond/2nd.png";
import Third from "../../../../assets/2023/data&beyond/3rd.png";
import Star from "../../../../assets/2023/data&beyond/star.png";

export default function PodiumStep({
  podium, winner
}) {
  const offset = podium.length - winner.position;
  const placements = {
    0: First,
    1: Second,
    2: Third
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        placeContent: "end",
        width: "100%",
        height: "100%",
      }}
    >
      <motion.div
        style={{
          alignSelf: "center",
          marginBottom: ".25rem",
        }}
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {
            opacity: 0
          },
          visible: {
            opacity: 1,
            transition: {
              delay: 1 + (offset + 2),
              duration: 0.75,
            },
          },
        }}
      >
        <div style={{
          fontWeight: "bold",
          color: "white",
          fontSize: "36px"
        }}>{winner.name}</div>
      </motion.div>
      <motion.div
        style={{
          backgroundColor: "white",
          borderImage: "linear-gradient(270deg, #ABADF7, #8FEEE7, #FFFFFF) 30",
          borderWidth: "6px 6px 0 6px",
          borderStyle: "solid",
          boxShadow: "1.58637px 1.58637px 3.17274px rgba(114, 142, 171, 0.1), -5.75912px -5.75912px 20.8637px #FFFFFF, 3.17274px 3.17274px 20.8637px rgba(111, 140, 176, 0.41)",
          borderTopLeftRadius: "3px",
          borderTopRightRadius: "3px",
          display: "flex",
          marginBottom: -1,
          placeContent: "center",
          width: "100%",
        }}
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {
            height: 0,
            opacity: 0
          },
          visible: {
            height: `${(70 * (offset / podium.length)) + 30}%`,
            opacity: 1,
            transition: {
              delay: 1 + offset,
              duration: 2,
              ease: "backInOut",
            },
          },
        }}
      >
        <img src={placements[winner.position]} alt="Placement" style={{
          width: "15%",
          height: "auto",
          alignSelf: "center",
          ...(winner.position === 0 && {
            marginRight: "7%"
          })
        }}></img>
        {winner.position === 0 && (
          <motion.div
            style={{
              position: "absolute",
              left: "52%",
              top: "40%",
              width: "15%",
              height: "auto"
            }}
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {
                opacity: 0
              },
              visible: {
                opacity: 1,
                transition: {
                  delay: 1 + (offset + 2),
                  duration: 0.75,
                },
              },
            }}
          >
            <img src={Star} alt="Star"></img>
          </motion.div>
        )}
        <span style={{
          alignSelf: "flex-end",
          color: "white"
        }}>
          {winner.position + 1}
        </span>
      </motion.div>
    </div>
  );
}
