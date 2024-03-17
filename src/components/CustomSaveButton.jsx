export const CustomSaveButton = ({ DefaultButton, label, save }) => {
  const save = () => {
    console.log("CustomSaveButton save() called");
    save();
  };
  return <DefaultButton label={label} save={save} />;
};
