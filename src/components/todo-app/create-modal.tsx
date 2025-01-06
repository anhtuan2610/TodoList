import { generateId } from "../../utils/helper";
import { useState } from "react";

export const CreateModal = ({
  setIsShowCreate,
  setListTask,
}: {
  setIsShowCreate: React.Dispatch<React.SetStateAction<boolean>>;
  setListTask: React.Dispatch<React.SetStateAction<TTask[]>>;
}) => {
  const [taskName, setTaskName] = useState<string>("");
  const handleCreate = () => {
    const id = generateId();
    setListTask((prev) => [
      ...prev,
      {
        id,
        status: "toDo",
        taskName,
      },
    ]);
    setIsShowCreate(false);
  };

  return (
    <div className="w-1/3 p-5 bg-white absolute m-auto top-1/4 1/2 right-1/2 translate-x-1/2 rounded-2xl z-30 space-y-4">
      <input
        className="w-full p-3 text-black border border-black rounded-md"
        type="text"
        name=""
        id=""
        onChange={(e) => {
          setTaskName(e.target.value);
        }}
        value={taskName}
      />
      <div className="flex justify-end gap-4">
        <button
          className="bg-blue-600 p-2 rounded-md w-20"
          onClick={handleCreate}
        >
          Create
        </button>
        <button
          className="bg-red-600 p-2 rounded-md w-20"
          onClick={() => setIsShowCreate(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
};
