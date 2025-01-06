import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

const DropdownCard = ({
  isShowEdit,
  setIsShowEdit,
  taskId,
  listTask,
  setListTask,
}: {
  isShowEdit: boolean;
  setIsShowEdit: React.Dispatch<React.SetStateAction<boolean>>;
  taskId: number | string;
  listTask: TTask[];
  setListTask: React.Dispatch<React.SetStateAction<TTask[]>>;
}) => {
  const handleChangeStatus = (newTaskStatus: number) => {
    const newList = listTask.map((item) => {
      if (item.id === taskId) {
        return {
          ...item,
          status: newTaskStatus,
        };
      }
      return item;
    });
    setListTask(newList);
  };

  return (
    <DropdownMenu.Root open={isShowEdit} onOpenChange={setIsShowEdit}>
      <DropdownMenu.Trigger asChild>
        <button
          className=""
          aria-label="Customise options"
          onClick={() => setIsShowEdit(true)}
        >
          ...
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="min-w-[220px] rounded-md bg-white p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade"
          sideOffset={5}
        >
          <DropdownMenu.Item>
            <div
              className="border border-white px-6 py-2 rounded-md cursor-pointer hover:bg-blue-100 hover:text-black"
              onClick={() => handleChangeStatus(2)}
            >
              Inprogress
            </div>
          </DropdownMenu.Item>

          <DropdownMenu.Item>
            <div
              className="border border-white px-6 py-2 rounded-md cursor-pointer hover:bg-blue-100 hover:text-black"
              onClick={() => handleChangeStatus(3)}
            >
              Pending
            </div>
          </DropdownMenu.Item>

          <DropdownMenu.Item>
            <div
              className="border border-white px-6 py-2 rounded-md cursor-pointer hover:bg-blue-100 hover:text-black"
              onClick={() => handleChangeStatus(4)}
            >
              Complete
            </div>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default DropdownCard;
