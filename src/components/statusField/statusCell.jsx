import React from "react";
// import { Props } from "payload/components/views/Cell";
import "./styles.css";

export const statusCell = (props) => {
  const { cellData, rowData } = props;

  if (!rowData) return null;

  const status = rowData._status;

  return (
    <div
      className={`status-indicator__${
        status === "published" ? "published" : "draft"
      } status-indicator`}
    ></div>
  );
};
