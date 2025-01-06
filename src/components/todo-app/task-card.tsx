import { useEffect, useRef, useState } from "react";
import remove from "../../assets/icons/delete.svg";
import DropdownCard from "./dropdown-card";

const TaskCard = ({
  item,
  handleDelete,
  listTask,
  setListTask,
}: {
  item: TTask;
  handleDelete: (id: number | string) => void;
  listTask: TTask[];
  setListTask: React.Dispatch<React.SetStateAction<TTask[]>>;
}) => {
  const [isShowEdit, setIsShowEdit] = useState(false);
  const [isShowInputTaskName, setIsShowInputTaskName] = useState(false);
  const [newTaskName, setNewTaskName] = useState(item.taskName);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleOnBlur = () => {
    const newList = listTask.map((task) => {
      if (task.id === item.id) {
        return {
          ...task,
          taskName: newTaskName,
        };
      }
      return task;
    });
    setListTask(newList);
    setIsShowInputTaskName(false);
  };
  useEffect(() => {
    inputRef.current?.focus();
  }, [item.id, isShowInputTaskName]);
  return (
    <div className="relative bg-[#212121] w-full h-16 px-6 pb-4 rounded-xl flex flex-col justify-end">
      <div className="flex items-center gap-4">
        <div className="w-full">
          <div
            className="relative cursor-default"
            onDoubleClick={() => {
              setIsShowInputTaskName(true);
              // inputRef.current?.focus();
            }}
          >
            {item.taskName}
            <input
              className={`bg-[#212121] w-full absolute left-0 ${
                isShowInputTaskName ? "" : "invisible"
              }`}
              type="text"
              value={newTaskName}
              onChange={(e) => setNewTaskName(e.target.value)}
              onBlur={handleOnBlur}
              ref={inputRef}
            />
          </div>
        </div>
        <div className="flex gap-2">
          <div>
            <img
              className="w-8 h-8 cursor-pointer"
              src={remove}
              alt=""
              onClick={() => handleDelete(item.id)}
            />
          </div>
          <div className="relative">
            <DropdownCard
              isShowEdit={isShowEdit}
              setIsShowEdit={setIsShowEdit}
              taskId={item.id}
              listTask={listTask}
              setListTask={setListTask}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
