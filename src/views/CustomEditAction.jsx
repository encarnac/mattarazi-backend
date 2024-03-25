import React from "react";
import { Button } from "payload/components";
import { useLocation } from "react-router-dom";

export const CustomEditAction = ({ props }) => {
  let { pathname } = useLocation();
  console.log(pathname);

  if (pathname == "/admin/collections/products/create") {
    return null;
  }

  return (
    <Button
      id="action-create-button"
      el="link"
      to="/admin/collections/products/create"
      buttonStyle="primary"
      size="medium"
    >
      Create New
    </Button>
  );
};
