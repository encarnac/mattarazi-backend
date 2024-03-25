import React from "react";
import { Props } from "payload/components/views/Cell";
import "./styles.scss";

const Cell = (props) => {
  const { cellData } = props;

  if (!cellData) return null;

  return <div className={`chip`} style={{ backgroundColor: cellData }}></div>;
};

export default Cell;
