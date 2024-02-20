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
        marginRight: "0.15em",
        marginLeft: "0.15em",
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
          color: "black"
        }}>{winner.fname} {winner.lname}</div>
      </motion.div>
      <motion.div
        style={{
          backgroundColor: "#8994a3",
          boxShadow: "0px 0px 5px 0px rgba(0, 0, 0, 0.5)", 
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
        {/* <span style={{
          alignSelf: "flex-end",
          color: "white",
          textAlign: "center",
        }}>
          {position + 1}
        </span> */}
      </motion.div>
    </div>
  );
}
