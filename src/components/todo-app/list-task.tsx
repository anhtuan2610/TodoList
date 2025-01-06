import TaskCard from "./task-card";

const ListTask = ({
  listTask,
  taskStatus,
  setListTask,
}: {
  listTask: TTask[];
  taskStatus: number;
  setListTask: React.Dispatch<React.SetStateAction<TTask[]>>;
}) => {
  const handleDelete = (id: number | string) => {
    const newList = listTask.filter((task) => task.id !== id);
    setListTask(newList);
  };
  return listTask.map(
    (item) =>
      item.status === taskStatus && (
        <TaskCard
          key={item.id}
          item={item}
          handleDelete={handleDelete}
          listTask={listTask}
          setListTask={setListTask}
        />
      )
  );
};

export default ListTask;
