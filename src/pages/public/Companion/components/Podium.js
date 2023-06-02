import React from "react";
import PodiumStep from "./PodiumStep";
export default function Podium({
  winners
}) {
  const podium = [1, 0, 2]
    .reduce((podiumOrder, position) => [...podiumOrder, winners[position]], [])
    .filter(Boolean);
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
        height: "95%",
        marginTop: "2rem",
        width: "80%"
      }}
    >
      {podium.map((winner) => (
        <PodiumStep key={winner.name} podium={podium} winner={winner} />
      ))}
    </div>
  );
}
