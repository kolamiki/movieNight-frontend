import React from "react";

//** IMPORT STYLES */
import "./Date.css";
function Date({ children }) {
  return (
    <div className="date-position">
      <div className="date">{children}</div>
    </div>
  );
}

export default Date;
