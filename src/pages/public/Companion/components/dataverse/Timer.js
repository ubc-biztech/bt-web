import React, {
  useState, useEffect
} from "react";

const TimerDonut = ({
  startTime, endTime
}) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const totalDuration = endTime.getTime() - startTime.getTime();

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = endTime.getTime() - now.getTime();
      setTimeLeft(Math.max(0, difference));
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  const progress = 1 - timeLeft / totalDuration;
  const size = 100;
  const strokeWidth = 10;
  const center = size / 2;
  const radius = center - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;

  const getColor = () => {
    if (progress < 0.5) return "#22c55e"; // Green
    if (progress < 0.75) return "#eab308"; // Yellow
    if (progress < 0.9) return "#f97316"; // Orange
    return "#ef4444"; // Red
  };

  const minutes = Math.floor(timeLeft / 60000);
  const seconds = Math.floor((timeLeft % 60000) / 1000);

  const containerStyle = {
    position: "relative",
    width: "100%",
    height: "300px",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid white",  // Added 2px white border
  };

  const svgStyle = {
    width: "80%",
    height: "80%",
  };

  const textStyle = {
    position: "absolute",
    inset: "0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "2rem",
    fontWeight: "bold",
    color: "white",
  };

  return (
    <div style={containerStyle}>
      <svg style={svgStyle} viewBox={`0 0 ${size} ${size}`}>
        {/* Background Circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
        />
        {/* Progress Circle with Smooth Animation */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={getColor()}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress * circumference}
          style={{
            transition: "stroke-dashoffset 0.5s linear, stroke 0.5s linear",
            transform: "rotate(-90deg)",
            transformOrigin: "center",
          }}
        />
      </svg>
      <div style={textStyle}>
        {`${minutes.toString().padStart(2, "0")}:${seconds
          .toString()
          .padStart(2, "0")}`}
      </div>
    </div>
  );
};

export default TimerDonut;
