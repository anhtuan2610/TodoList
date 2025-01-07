import { CreateModal } from "../components/todo-app/create-modal";
import { TaskTable } from "../components/todo-app/task-table";
import { DEFAULT_TASK, TASK_STATUS } from "../utils/constants";
import { useState } from "react";

export const TodoApp = () => {
  const [isShowCreate, setIsShowCreate] = useState(false);
  const [listTask, setListTask] = useState<TTask[]>(DEFAULT_TASK);

  return (
    <>
      <div className="bg-[#212121] min-h-screen text-white px-10 py-6 space-y-4">
        <div className="flex justify-end">
          <button
            className="border border-gray-300 p-3 rounded-xl"
            onClick={() => {
              setIsShowCreate(true);
            }}
          >
            Create Task
          </button>
        </div>
        <div className="grid grid-cols-4 gap-10 text-center">
          {TASK_STATUS.map((taskStatus) => (
            <TaskTable
              listTask={listTask}
              setListTask={setListTask}
              taskStatus={taskStatus}
            />
          ))}
        </div>
        {isShowCreate && (
          <CreateModal
            setIsShowCreate={setIsShowCreate}
            setListTask={setListTask}
          />
        )}
      </div>
    </>
  );
};
