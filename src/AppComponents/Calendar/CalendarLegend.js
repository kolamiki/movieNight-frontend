import React, { useState } from "react";
import { Card } from "primereact/card";
import { Skeleton } from "primereact/skeleton";

import "./CalendarLegend.css";
function CalendarLegend({ users, colors }) {
  //   const [users, setUsers] = useState(["Miki", "Krzysiu"]);
  //   const [colors, setColors] = useState([
  //     "#ffcccb",
  //     "#d4edda",
  //     "#cce5ff",
  //     "#f3e6cc",
  //     "#e2e3e5",
  //   ]);

  return (
    <Card className="legend">
      {users.map((user, index) => (
        <div className="legend-item" key={index}>
          <div className="square" style={{ backgroundColor: colors[index] }} />
          <span>{user}</span>
        </div>
      ))}
    </Card>
  );
}

export default CalendarLegend;
