import React from "react";

const FeedbackForm = (props) => {
  const {
    feedbackLink,
    renderMobileOnly,
    styles
  } = props;

  return (
    <div id="FeedbackForm" style={{
      ...styles.column
    }}>
      {/* TODO: add styling */}
      {/* TODO: When this feedback form shows, we can hide all the other things on the companion */}
      <h1 style={renderMobileOnly ? styles.mobileTitle : styles.title}>Thanks for attending!</h1>
      {feedbackLink && <iframe src={feedbackLink}>Loading…</iframe> }
    </div>
  );
};

export default FeedbackForm;

