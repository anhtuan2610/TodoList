import ListTask from "./list-task";

type TProps = {
  listTask: TTask[];
  setListTask: React.Dispatch<React.SetStateAction<TTask[]>>;
  taskStatus: number;
};

export const TaskTable = ({ listTask, setListTask, taskStatus }: TProps) => {
  const handleTaskStatus = (taskStatus: number) => {
    switch (taskStatus) {
      case 1:
        return "To do";
      case 2:
        return "In progress";
      case 3:
        return "Pending";
      case 4:
        return "Complete";
      default:
        return;
    }
  };
  return (
    <div className="bg-[#383838] rounded-lg p-5">
      <div className="flex justify-start font-bold text-lg">
        {handleTaskStatus(taskStatus)}
      </div>
      <div className="pt-4 space-y-5">
        {/* <div className="relative bg-[#212121] w-full h-16 px-6 pb-4 rounded-xl flex flex-col justify-end">
                <div className="flex items-center gap-4">
                  <div className="w-full">
                    <input
                      className="bg-[#212121] outline-none w-full"
                      type="text"
                    />
                    <div className="bg-neutral-600 h-[1px] w-full my-[2px]"></div>
                  </div>
                  <div className="flex gap-2">
                    <img className="w-6 h-6" src={tick} alt="" />
                  </div>
                </div>
              </div> */}
        <ListTask
          listTask={listTask}
          setListTask={setListTask}
          taskStatus={taskStatus}
        />
      </div>
    </div>
  );
};
