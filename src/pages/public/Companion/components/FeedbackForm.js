import React from "react";

const FeedbackForm = (props) => {
  const {
    feedbackLink,
    renderMobileOnly,
    styles
  } = props;

  return (
    <div id="FeedbackForm" style={{
      ... styles.column
    }}>
      <h1 style={renderMobileOnly ? styles.mobileTitle : styles.title}>Thanks for attending!</h1>
      <div id="FeedbackIFrameContainer" style={styles.feedbackIFrameContainer }>
        {feedbackLink && (
          <iframe
            src={feedbackLink}
            style={styles.feedbackIFrame}
          >
          Loading…
          </iframe>
        )}
      </div>
    </div>
  );
};

export default FeedbackForm;
