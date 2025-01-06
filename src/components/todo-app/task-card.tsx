import { useRef, useState } from "react";
import { DeleteIcon, TickIcon, CloseIcon } from "../../assets/icons/index";
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
  // const handleOnBlur = () => {
  //   const newList = listTask.map((task) => {
  //     if (task.id === item.id) {
  //       return {
  //         ...task,
  //         taskName: newTaskName,
  //       };
  //     }
  //     return task;
  //   });
  //   setListTask(newList);
  //   setIsShowInputTaskName(false);
  // };

  const handleDoubleClick = () => {
    setIsShowInputTaskName(true);
    inputRef.current?.focus();
  };

  const handleOnClose = () => {
    setNewTaskName(item.taskName);
    setIsShowInputTaskName(false);
  };

  const handleOnVerify = () => {
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

  return (
    <div className="relative bg-[#212121] w-full h-16 px-6 pb-4 rounded-xl flex flex-col justify-end">
      <div className="flex items-center gap-4">
        <div className="relative w-full">
          <div className="cursor-default">
            <p
              className={`text-left ${isShowInputTaskName ? "invisible" : ""}`}
              onDoubleClick={handleDoubleClick}
            >
              {item.taskName}
            </p>
            <input
              className={`absolute inset-0 bg-[#212121] ${
                isShowInputTaskName ? "w-full" : "w-0"
              }`}
              type="text"
              ref={inputRef}
              value={newTaskName}
              onChange={(e) => setNewTaskName(e.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-2 items-center">
          {isShowInputTaskName ? (
            <>
              <div className="cursor-pointer" onClick={handleOnVerify}>
                {<TickIcon />}
              </div>
              <div className="cursor-pointer" onClick={handleOnClose}>
                {<CloseIcon />}
              </div>
            </>
          ) : (
            <>
              <div
                className="cursor-pointer"
                onClick={() => handleDelete(item.id)}
              >
                {<DeleteIcon />}
              </div>
              <div className="relative cursor-pointer">
                <DropdownCard
                  isShowEdit={isShowEdit}
                  setIsShowEdit={setIsShowEdit}
                  task={item}
                  listTask={listTask}
                  setListTask={setListTask}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
