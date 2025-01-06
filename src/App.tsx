import { useState } from "react";
import { CreateModal } from "./components/todo-app/create-modal";
import { TaskTable } from "./components/todo-app/task-table";

function App() {
  const [isShowCreate, setIsShowCreate] = useState(false);
  const defaultTask: TTask[] = [
    {
      id: 1,
      taskName: "task1",
      status: 1,
    },
    {
      id: 2,
      taskName: "task2",
      status: 1,
    },
    {
      id: 3,
      taskName: "task3",
      status: 2,
    },
    {
      id: 4,
      taskName: "task4",
      status: 3,
    },
    {
      id: 5,
      taskName: "task5",
      status: 4,
    },
  ];
  const [listTask, setListTask] = useState<TTask[]>(defaultTask);

  return (
    <>
      <div className="bg-[#212121] min-h-screen text-white px-10 py-6 space-y-4 relative">
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
          <TaskTable
            listTask={listTask}
            setListTask={setListTask}
            taskStatus={1}
          />
          <TaskTable
            listTask={listTask}
            setListTask={setListTask}
            taskStatus={2}
          />
          <TaskTable
            listTask={listTask}
            setListTask={setListTask}
            taskStatus={3}
          />
          <TaskTable
            listTask={listTask}
            setListTask={setListTask}
            taskStatus={4}
          />
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
}

export default App;
