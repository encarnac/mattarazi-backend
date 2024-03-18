// @ts-nocheck
import React, { useEffect, useState } from "react";
import { useListRelationships } from "payload/dist/admin/components/views/collections/List/RelationshipProvider";
import "./components.css";

export const ImageCell = (props) => {
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
        <img src={documents[field.relationTo][cellData]?.url}></img>
      )}
    </div>
  );
};
