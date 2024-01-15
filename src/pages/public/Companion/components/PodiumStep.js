import React, {
  useEffect
} from "react";
import {
  motion, useAnimation
} from "framer-motion";
import {
  useInView
} from "react-intersection-observer";


export default function PodiumStep({
  podium, winner, position
}) {
  const controls = useAnimation();
  const [ref, inView] = useInView();
  const offset = podium.length - position;

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        placeContent: "end",
        width: "100%",
        height: `${((4 - position) / 4) * 100}%`,
      }}
    >
      <motion.div
        style={{
          alignSelf: "center",
          marginBottom: ".25rem",
        }}
        initial="hidden"
        ref={ref}
        animate={controls}
        variants={{
          hidden: {
            opacity: 0
          },
          visible: {
            opacity: 1,
            transition: {
              delay: 0.25 + (offset),
              duration: 0.5,
            },
          },
        }}
      >
        <div style={{
          fontWeight: "bold",
          color: "white"
        }}>{winner.fname} {winner.lname}</div>
      </motion.div>
      <motion.div
        style={{
          backgroundColor: "white",
          borderImage: "linear-gradient(270deg, #FFFFFF, #FFEAFB, #FFE0F9) 30",
          borderWidth: "6px 6px 0 6px",
          borderStyle: "solid",
          boxShadow: "1.58637px 1.58637px 3.17274px rgba(114, 142, 171, 0.1), -5.75912px -5.75912px 20.8637px #FFFFFF, 3.17274px 3.17274px 20.8637px rgba(111, 140, 176, 0.41)",
          borderTopLeftRadius: "3px",
          borderTopRightRadius: "3px",
          display: "flex",
          marginBottom: -1,
          placeContent: "center",
          height: "100%",
          width: "100%",
        }}
        initial="hidden"
        ref={ref}
        animate={controls}
        variants={{
          hidden: {
            height: 0,
            opacity: 0
          },
          visible: {
            height: "100%",
            opacity: 1,
            transition: {
              delay: offset - 1,
              duration: 1.75,
              ease: "backInOut",
            },
          },
        }}
      >
        {winner.points}
        <span style={{
          alignSelf: "flex-end",
          color: "white"
        }}>
          {position + 1}
        </span>
      </motion.div>
    </div>
  );
}
