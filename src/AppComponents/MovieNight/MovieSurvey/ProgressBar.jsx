import React from "react";

import "./ProgressBar.css";

function ProgressBar({ percentage }) {
  return (
    <div className="progress-container">
      <div className="progress-bar" style={{ width: `${percentage}%` }}></div>
      <span className="progress-text">{percentage}%</span>
    </div>
  );
}

export default ProgressBar;
