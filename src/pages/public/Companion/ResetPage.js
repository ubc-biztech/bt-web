import React from "react";

const CompanionReset = () => {
  const [finished, setFinished] = React.useState(false);

  React.useEffect(() => {
    // reset local storage key for BP2023
    localStorage.removeItem("BP2023EMAIL");
    setFinished(true);
  }, []);

  return (
    <div>
      <h1>Reset key</h1>
      {finished ? <p>Reset complete</p> : <p>Resetting...</p>}
    </div>
  );
};

export default CompanionReset;
