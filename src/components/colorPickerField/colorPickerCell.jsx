import React from "react";
import { Props } from "payload/components/views/Cell";
import "./styles.scss";

const colorPickerCell = (props) => {
  const { cellData } = props;

  if (!cellData) return null;

  return <div className={`chip`} style={{ backgroundColor: cellData }}></div>;
};

export default colorPickerCell;
