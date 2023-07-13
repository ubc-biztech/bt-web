import React from "react";

const FeedbackForm = (props) => {
  const {
    renderMobileOnly,
    styles,
    eventStatus
  } = props;

  const isEvenetOver = eventStatus === "over"; 

  return (
    <>
    {isEvenetOver && (
      <div id="FeedbackForm" style={{
      ...styles.column,
      width: "90%"
    }}>
      {/* TODO: make the iframe dynamically fetch link from the event. */}
      {/* TODO: add styling */}
      {/* TODO: Make sure this form only shows after the event ends */}
      {/* TODO: When this feedback form shows, we can hide all the other things on the companion */}
      <h1 style={renderMobileOnly ? styles.mobileTitle : styles.title}>Feedback Form</h1>
      <iframe src="https://docs.google.com/forms/d/e/1FAIpQLScG8QCuvqw52ndjX8SxAH9hVjuPhMrK4DITMvhkW3i6Oml-uA/viewform?embedded=true"
      width="100%"
      height="700px">Loading…</iframe>
    </div>)} 
    </>
  );
};

export default FeedbackForm;

