import React from "react";
import { Gutter, Card, Button } from "payload/components/elements";
import { useHistory } from "react-router-dom";

const CustomDashboardView = () => {
  const baseClass = "dashboard";
  let history = useHistory();
  const handleClick = (e) => {
    history.push(`/admin/collections/${e}?limit=25`);
  };
  return (
    <div className={baseClass}>
      <Gutter className={`${baseClass}__wrap`}>
        <h2>Mattarazi Uomo's Dashboard</h2>
        <div className={`${baseClass}__group`}>
          <h2 className={`${baseClass}__label`}>Get Started</h2>
          <ul className={`${baseClass}__card-list`}>
            <li>
              <Card
                actions={
                  <Button
                    buttonStyle="icon-label"
                    el="link"
                    icon="plus"
                    iconStyle="with-border"
                    round
                    to={"/admin/collections/products/create"}
                  />
                }
                id={`card-projects`}
                onClick={() => handleClick("products")}
                title="Projects"
                titleAs="h3"
              />
            </li>
            <li>
              <Card
                actions={
                  <Button
                    buttonStyle="icon-label"
                    el="link"
                    icon="plus"
                    iconStyle="with-border"
                    round
                    to={"/admin/collections/photos/create"}
                  />
                }
                id={`card-projects`}
                onClick={() => handleClick("photos")}
                title="Photos"
                titleAs="h3"
              />
            </li>
          </ul>
        </div>
      </Gutter>
    </div>
  );
};

export default CustomDashboardView;
