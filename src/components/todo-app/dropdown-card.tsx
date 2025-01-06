import { TASK_STATUS } from "../../utils/constants";
import { EditIcon } from "../../assets/icons/index";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

const DropdownCard = ({
  isShowEdit,
  setIsShowEdit,
  task,
  listTask,
  setListTask,
}: {
  isShowEdit: boolean;
  setIsShowEdit: React.Dispatch<React.SetStateAction<boolean>>;
  task: TTask;
  listTask: TTask[];
  setListTask: React.Dispatch<React.SetStateAction<TTask[]>>;
}) => {
  const handleChangeStatus = (newTaskStatus: string) => {
    const newList = listTask.map((item) => {
      if (item.id === task.id) {
        return {
          ...item,
          status: newTaskStatus,
        };
      }
      return item;
    });
    setListTask(newList);
  };
  const taskStatusAvailable = TASK_STATUS.filter((taskStatus) => {
    return taskStatus.value != task.status;
  });

  return (
    <DropdownMenu.Root open={isShowEdit} onOpenChange={setIsShowEdit}>
      <DropdownMenu.Trigger asChild>
        <button
          className="flex items-center"
          aria-label="Customise options"
          onClick={() => setIsShowEdit(true)}
        >
          <EditIcon />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="min-w-[220px] rounded-md bg-white p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade"
          sideOffset={5}
        >
          {taskStatusAvailable.map((status) => (
            <DropdownMenu.Item onClick={() => handleChangeStatus(status.value)}>
              {status.name}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default DropdownCard;
