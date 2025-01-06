import ListTask from "./list-task";

type TProps = {
  listTask: TTask[];
  setListTask: React.Dispatch<React.SetStateAction<TTask[]>>;
  taskStatus: {
    id: number;
    name: string;
    value: string;
  };
};

export const TaskTable = ({ listTask, setListTask, taskStatus }: TProps) => {
  return (
    <div className="bg-[#383838] rounded-lg p-5 h-fit">
      <div className="flex justify-start font-bold text-lg">
        {taskStatus.name}
      </div>
      <div className="pt-4 space-y-5">
        <ListTask
          listTask={listTask}
          setListTask={setListTask}
          taskStatus={taskStatus}
        />
      </div>
    </div>
  );
};
