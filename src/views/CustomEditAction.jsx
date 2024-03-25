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
      // icon="plus"
      // iconPosition="left"
      el="link"
      to="/admin/collections/products/create"
      buttonStyle="transparent"
      size="small"
    >
      Create New
    </Button>
  );
};
