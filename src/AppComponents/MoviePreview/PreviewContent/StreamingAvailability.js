import React from "react";

import "./StreamingAvailability.css";

function StreamingAvailability({ isAvailable, streamingIcon }) {
  return (
    <div className="streaming-square">
      <img className="streaming-logo" src={streamingIcon} alt={streamingIcon} />
    </div>
  );
}

export default StreamingAvailability;
