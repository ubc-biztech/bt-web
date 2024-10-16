import React from "react";
import PodiumStep from "./PodiumStep";
export default function Podium({
  winners
}) {
  const order = [1, 0, 2];
  const podium = order
    .reduce((podiumOrder, position) => [...podiumOrder, winners[position]], [])
    .filter(Boolean).map((attendee, i) => {
      return {
        ...attendee,
        position: order[i]
      };
    });

  return (
    <div
      style={{
        alignContent: "flex-end",
        alignItems: "flex-end",
        borderBottom: "1px solid #e5e7eb",
        display: "flex",
        flexDirection: "row",
        gridAutoFlow: "column dense",
        justifyContent: "center",
        justifyItems: "center",
        height: "10rem",
        margin: "0 auto",
        width: "80%",
        paddingTop: "2rem",
      }}
    >
      {podium.map((winner, i) => (
        <PodiumStep key={i} podium={podium} winner={winner} position={winner.position} />
      ))}
    </div>
  );
}
