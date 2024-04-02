import React from "react";
import { useDocumentInfo } from "payload/components/utilities";

export const CustomTabCreate = ({}) => {
  const { collection } = useDocumentInfo();
  console.log(collection);

  const collectionName = collection.slug;

  return (
    <li className="doc-tab">
      <a
        className="doc-tab__link"
        href={`/admin/collections/${collectionName}/create`}
      >
        <span className="doc-tab__label">Create</span>
      </a>
    </li>
  );
};
