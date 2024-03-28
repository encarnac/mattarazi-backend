// @ts-nocheck
import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

export const PhotoCell = (props) => {
  const { field, colIndex, collection, cellData, rowData } = props;

  return (
    <div className="product-cell">
      <Link to={`/admin/collections/products/${rowData.id}`}>
        <img src={cellData[0]?.thumbnail} />
      </Link>
    </div>
  );
};
