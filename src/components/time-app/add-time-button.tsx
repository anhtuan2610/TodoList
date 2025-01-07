import { PlusIcon } from "../../assets/icons";

export const AddTimeButton = () => {
  const handleAddTime = () => {};

  return (
    <div
      className="flex items-center gap-2 cursor-pointer"
      onClick={handleAddTime}
    >
      <PlusIcon />
      <p>Add Time</p>
    </div>
  );
};
