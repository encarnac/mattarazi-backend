// @ts-nocheck
import React, { Fragment, useEffect } from "react";
import { Redirect } from "react-router-dom";

import { AdminViewComponent } from "payload/dist/config/types";

import { useStepNav } from "payload/dist/admin/components/elements/StepNav";
import { useConfig } from "payload/dist/admin/components/utilities/Config";

const CustomEditView = ({
  canAccessAdmin,
  //  collection,
  //  global,
  user,
}) => {
  const {
    routes: { admin: adminRoute },
  } = useConfig();

  const { setStepNav } = useStepNav();

  // This effect will only run one time and will allow us
  // to set the step nav to display our custom route name

  useEffect(() => {
    setStepNav([
      {
        label: "Custom Edit View",
      },
    ]);
  }, [setStepNav]);

  // If an unauthorized user tries to navigate straight to this page,
  // Boot 'em out
  if (!user || (user && !canAccessAdmin)) {
    return <Redirect to={`${adminRoute}/unauthorized`} />;
  }

  return (
    <Fragment>
      <div
        style={{
          marginTop: "calc(var(--base) * 2)",
          paddingLeft: "var(--gutter-h)",
          paddingRight: "var(--gutter-h)",
        }}
      >
        <h1>Custom Default View</h1>
        <p>
          This custom Default view was added through one of the following
          Payload configs:
        </p>
        <ul>
          <li>
            <code>components.views.Edit.Default</code>
            <p>
              {
                "This allows you to override only the default edit view specifically, but "
              }
              <b>
                <em>not</em>
              </b>
              {
                " any nested views like versions, etc. The document header will render above this component."
              }
            </p>
          </li>
          <li>
            <code>components.views.Edit.Default.Component</code>
            <p>
              This is the most granular override, allowing you to override only
              the Default component, or any of its other properties like path
              and label.
            </p>
          </li>
        </ul>
      </div>
    </Fragment>
  );
};

export default CustomEditView;

import React from "react";

// this is how we'll interface with Payload itself
import { useFieldType } from "payload/components/forms";

// we'll re-use the built in Label component directly from Payload
import { Label } from "payload/components/forms";

// we can use existing Payload types easily
import { Props } from "payload/components/fields/Text";

// we'll import and reuse our existing validator function on the frontend, too
import { validateHexColor } from "./config";

// Import the SCSS stylesheet
import "./styles.scss";

// keep a list of default colors to choose from
const defaultColors = [
  "#0F0F0F",
  "#9A9A9A",
  "#F3F3F3",
  "#FF6F76",
  "#FDFFA4",
  "#B2FFD6",
  "#F3DDF3",
];

const baseClass = "custom-color-picker";

const InputField = (props) => {
  const { path, label, required } = props;

  const { value = "", setValue } = useFieldType({
    path,
    validate: validateHexColor,
  });

  return (
    <div className={baseClass}>
      <Label htmlFor={path} label={label} required={required} />
      <ul className={`${baseClass}__colors`}>
        {defaultColors.map((color, i) => (
          <li key={i}>
            <button
              type="button"
              key={color}
              className={`chip ${
                color === value ? "chip--selected" : ""
              } chip--clickable`}
              style={{ backgroundColor: color }}
              aria-label={color}
              onClick={() => setValue(color)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InputField;
