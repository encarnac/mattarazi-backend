// @ts-nocheck
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useListRelationships } from "payload/dist/admin/components/views/collections/List/RelationshipProvider";
import "./styles.css";

export const Cell = (props) => {
  const { field, colIndex, collection, cellData, rowData } = props;

  const { getRelationships, documents } = useListRelationships();

  useEffect(() => {
    getRelationships([
      {
        value: cellData,
        relationTo: field.relationTo,
      },
    ]);
  }, [getRelationships]);

  return (
    <div className="product-cell">
      {documents?.[field.relationTo]?.[cellData]?.url && (
        <Link to={`/admin/collections/products/${rowData.id}`}>
          <img src={documents[field.relationTo][cellData]?.url} />
        </Link>
      )}
    </div>
  );
};
