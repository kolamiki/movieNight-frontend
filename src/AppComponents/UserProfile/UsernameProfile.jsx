import React, { useState, useEffect } from "react";

import "./UsernameProfile.css";

function UsernameProfile({ username }) {
  return (
    <div>
      <div className="avatar"></div>
      <p className="username">{username}</p>
    </div>
  );
}

export default UsernameProfile;
