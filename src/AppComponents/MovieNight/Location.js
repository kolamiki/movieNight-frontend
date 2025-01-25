import React from "react";

//***   IMPORT STYLES */

import "./Location.css";

function Location({ children }) {
  return (
    <div className="location-position">
      <div className="location-frame">{children}</div>
      <div className="triangle"></div>
    </div>
  );
}

export default Location;
