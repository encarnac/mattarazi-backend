import React, { Fragment } from "react";
import { useTranslation } from "react-i18next";

import type { FieldTypes } from "payload/dist/admin/components/forms/field-types";
import type { CollectionEditViewProps } from "payload/dist/admin/components/views/types";

import { getTranslation } from "payload/dist/utilities/getTranslation";
import { DocumentControls } from "payload/dist/admin/components/elements/DocumentControls";
import { DocumentFields } from "payload/dist/admin/components/elements/DocumentFields";
import { LeaveWithoutSaving } from "payload/dist/admin/components/modals/LeaveWithoutSaving";
import Meta from "payload/dist/admin/components/utilities/Meta";
import Auth from "payload/dist/admin/components/views/collections/Edit/Auth";
import { SetStepNav } from "payload/dist/admin/components/views/collections/Edit/SetStepNav";
import { Upload } from "payload/dist/admin/components/views/collections/Edit/Upload";
// import "./index.scss";

const baseClass = "collection-default-edit";

const CustomEditView: React.FC<
  CollectionEditViewProps & {
    fieldTypes: FieldTypes;
  }
> = (props) => {
  const { i18n, t } = useTranslation("general");

  const {
    id,
    apiURL,
    collection,
    data,
    disableActions,
    disableLeaveWithoutSaving,
    fieldTypes,
    hasSavePermission,
    internalState,
    isEditing,
    permissions,
  } = props;

  const { auth, fields, upload } = collection;

  const operation = isEditing ? "update" : "create";

  return (
    <Fragment>
      <Meta
        description={`${
          isEditing ? t("editing") : t("creating")
        } - ${getTranslation(collection.labels.singular, i18n)}`}
        keywords={`${getTranslation(
          collection.labels.singular,
          i18n
        )}, Payload, CMS`}
        title={`${isEditing ? t("editing") : t("creating")} - ${getTranslation(
          collection.labels.singular,
          i18n
        )}`}
      />
      {!(
        collection.versions?.drafts && collection.versions?.drafts?.autosave
      ) &&
        !disableLeaveWithoutSaving && <LeaveWithoutSaving />}
      <SetStepNav collection={collection} id={id} isEditing={isEditing} />
      <DocumentControls
        apiURL={apiURL}
        collection={collection}
        data={data}
        disableActions={true}
        hasSavePermission={hasSavePermission}
        id={id}
        isEditing={isEditing}
        permissions={permissions}
      />
      <DocumentFields
        BeforeFields={
          <Fragment>
            {auth && (
              <Auth
                className={`${baseClass}__auth`}
                collection={collection}
                email={data?.email}
                operation={operation}
                readOnly={!hasSavePermission}
                requirePassword={!isEditing}
                useAPIKey={auth.useAPIKey}
                verify={auth.verify}
              />
            )}
            {upload && (
              <Upload collection={collection} internalState={internalState} />
            )}
          </Fragment>
        }
        fieldTypes={fieldTypes}
        fields={fields}
        hasSavePermission={hasSavePermission}
        permissions={permissions}
      />
    </Fragment>
  );
};

export default CustomEditView;

// import React, { useCallback, useEffect } from "react";
// import { useTranslation } from "react-i18next";
// import { useLocation } from "react-router-dom";

// import type { FieldTypes } from "payload/dist/admin/components/forms/field-types";
// import type { CollectionEditViewProps } from "payload/dist/admin/components/views/types";

// import { getTranslation } from "payload/dist/utilities/getTranslation";
// import { DocumentHeader } from "payload/dist/admin/components/elements/DocumentHeader";
// import { FormLoadingOverlayToggle } from "payload/dist/admin/components/elements/Loading";
// import Form from "payload/dist/admin/components/forms/Form";
// import { useActions } from "payload/dist/admin/components/utilities/ActionsProvider";
// import { useAuth } from "payload/dist/admin/components/utilities/Auth";
// import { useDocumentEvents } from "payload/dist/admin/components/utilities/DocumentEvents";
// import { OperationContext } from "payload/dist/admin/components/utilities/OperationProvider";
// import { CollectionRoutes } from "payload/dist/admin/components/views/collections/Edit/Routes";
// import { CustomCollectionComponent } from "payload/dist/admin/components/views/collections/Edit/Routes/CustomComponent";
// // import "./index.scss";

// const baseClass = "collection-edit";

// export type DefaultEditViewProps = CollectionEditViewProps & {
//   customHeader?: React.ReactNode;
//   disableRoutes?: boolean;
//   fieldTypes: FieldTypes;
// };

// const DefaultEditView: React.FC<DefaultEditViewProps> = (props) => {
//   const { i18n } = useTranslation("general");
//   const { refreshCookieAsync, user } = useAuth();

//   const {
//     id,
//     action,
//     apiURL,
//     collection,
//     customHeader,
//     data,
//     disableRoutes,
//     fieldTypes,
//     hasSavePermission,
//     internalState,
//     isEditing,
//     isLoading,
//     onSave: onSaveFromProps,
//   } = props;

//   const { setViewActions } = useActions();

//   const { reportUpdate } = useDocumentEvents();

//   const { auth } = collection;

//   const classes = [baseClass, isEditing && `${baseClass}--is-editing`]
//     .filter(Boolean)
//     .join(" ");

//   const location = useLocation();

//   const onSave = useCallback(
//     async (json) => {
//       reportUpdate({
//         id,
//         entitySlug: collection.slug,
//         updatedAt: json?.result?.updatedAt || new Date().toISOString(),
//       });
//       if (auth && id === user.id) {
//         await refreshCookieAsync();
//       }

//       if (typeof onSaveFromProps === "function") {
//         onSaveFromProps({
//           ...json,
//           operation: id ? "update" : "create",
//         });
//       }
//     },
//     [
//       id,
//       onSaveFromProps,
//       auth,
//       user,
//       refreshCookieAsync,
//       collection,
//       reportUpdate,
//     ]
//   );

//   const operation = isEditing ? "update" : "create";

//   useEffect(() => {
//     const path = location.pathname;

//     if (!(path.endsWith(id) || path.endsWith("/create"))) {
//       return;
//     }
//     const editConfig = collection?.admin?.components?.views?.Edit;
//     const defaultActions =
//       editConfig && "Default" in editConfig && "actions" in editConfig.Default
//         ? editConfig.Default.actions
//         : [];

//     setViewActions(defaultActions);

//     return () => {
//       setViewActions([]);
//     };
//   }, [
//     id,
//     location.pathname,
//     collection?.admin?.components?.views?.Edit,
//     setViewActions,
//   ]);

//   return (
//     <main className={classes}>
//       <OperationContext.Provider value={operation}>
//         <Form
//           action={action}
//           className={`${baseClass}__form`}
//           disabled={!hasSavePermission}
//           initialState={internalState}
//           method={id ? "patch" : "post"}
//           onSuccess={onSave}
//         >
//           <FormLoadingOverlayToggle
//             action={isLoading ? "loading" : operation}
//             formIsLoading={isLoading}
//             loadingSuffix={getTranslation(collection.labels.singular, i18n)}
//             name={`collection-edit--${
//               typeof collection?.labels?.singular === "string"
//                 ? collection.labels.singular
//                 : "document"
//             }`}
//             type="withoutNav"
//           />
//           {!isLoading && (
//             <React.Fragment>
//               <DocumentHeader
//                 apiURL={apiURL}
//                 collection={collection}
//                 customHeader={customHeader}
//                 data={data}
//                 id={id}
//                 isEditing={isEditing}
//               />
//               {disableRoutes ? (
//                 <CustomCollectionComponent view="Default" {...props} />
//               ) : (
//                 <CollectionRoutes {...props} fieldTypes={fieldTypes} />
//               )}
//             </React.Fragment>
//           )}
//         </Form>
//       </OperationContext.Provider>
//     </main>
//   );
// };

// export default DefaultEditView;
