import React, { useState, useEffect } from "react";
import { Calendar } from "primereact/calendar";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import axios from "axios";
import "./CalendarWithRanges.css"; // Import CSS for custom styling
import CalendarLegend from "./CalendarLegend";

export default function CalendarWithRanges() {
  console.log("Jestem kalendarzem");
  const [ranges, setRanges] = useState([
    { start_date: "2025-01-01", end_date: "2025-01-12" },
    { start_date: "2025-01-10", end_date: "2025-01-15" },
    { start_date: "2025-01-12", end_date: "2025-01-20" },
  ]); //useState([]); // Stores ranges from the database
  const [selectedRange, setSelectedRange] = useState(null); // Currently selected range
  const [users, setUers] = useState(["Miki", "Krzysiu", "Kuba"]);
  const colors = ["#ffcccb", "#d4edda", "#cce5ff", "#f3e6cc", "#e2e3e5"]; // Example colors

  // Fetch ranges from the Django API
  // useEffect(() => {
  //   const fetchRanges = async () => {
  //     try {
  //       const response = await axios.get("/api/date-ranges/"); // Replace with your Django API endpoint
  //       setRanges(response.data);
  //     } catch (error) {
  //       console.error("Error fetching date ranges:", error);
  //     }
  //   };
  //   fetchRanges();
  // }, []);

  // Generate dynamic styles for highlighted ranges
  function generateRangeStyles() {
    const rangeStyles = {};

    ranges.forEach((range, index) => {
      const color = colors[index % colors.length];
      const start = new Date(range.start_date);
      const end = new Date(range.end_date);

      let current = new Date(start);
      while (current <= end) {
        const dateKey = current.toISOString().split("T")[0]; // Format date as YYYY-MM-DD
        console.log("Date key", dateKey);
        if (rangeStyles[dateKey]) {
          // Combine colors if date is already styled
          rangeStyles[dateKey].colors.push(color);
        } else {
          rangeStyles[dateKey] = { colors: [color] };
        }
        current.setDate(current.getDate() + 1);
      }
    });

    return rangeStyles;
  }

  const rangeStyles = generateRangeStyles();

  // Customize the day template for the calendar
  //!! Due to the Calendar component is iterated from 0, it has to add 1 to currently open card
  const dateTemplate = (date) => {
    const dateKey = `${date.year}-${String(date.month + 1).padStart(
      2,
      "0"
    )}-${String(date.day).padStart(2, "0")}`;
    console.log("Date key", dateKey);
    const styles = rangeStyles[dateKey]?.colors || [];
    const gradient =
      styles.length > 1
        ? `linear-gradient(90deg, ${styles.join(", ")})`
        : styles[0] || "transparent";

    return (
      <div className="custom-date" style={{ background: gradient }}>
        {date.day}
      </div>
    );
  };
  console.log("Date template", dateTemplate);
  return (
    <>
      <h2>Calendar with Date Ranges</h2>
      <div className="calendar-container">
        <Calendar
          value={selectedRange}
          onChange={(e) => setSelectedRange(e.value)}
          selectionMode="range"
          inline
          dateTemplate={dateTemplate}
          showButtonBar
        />
        <CalendarLegend users={users} colors={colors} />
      </div>
    </>
  );
}
