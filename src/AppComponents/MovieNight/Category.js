import React from "react";
import "./Category.css";
function Category({ children }) {
  return (
    <div
      className="category"
      style={{ fontSize: children?.length > 16 ? "40px" : "70px" }}
    >
      {children}
    </div>
  );
}

export default Category;
