import { useContext } from "react";
import { PlusIcon } from "../../assets/icons";
import { ScheduleContext } from "../../context/schedule-context";
import { generateId } from "../../utils/helper";

export const AddTimeButton = ({
  scheduleSelected,
}: {
  scheduleSelected: TSchedule;
}) => {
  const scheduleDataContext = useContext(ScheduleContext);
  const handleAddTime = () => {
    {
      const newListSchedule = scheduleDataContext?.listSchedule.map(
        (schedule) => {
          if (schedule.id === scheduleSelected.id) {
            return {
              ...schedule,
              times: schedule.times
                ? [
                    ...schedule.times,
                    {
                      id: generateId(),
                      fromHour: "00",
                      fromMinute: "00",
                      toHour: "23",
                      toMinute: "59",
                    },
                  ]
                : [],
            };
          }
          return schedule;
        }
      );
      if (newListSchedule) {
        scheduleDataContext?.setListSchedule(newListSchedule);
      }
    }
  };

  return (
    <div
      className="flex items-center gap-2 cursor-pointer w-fit"
      onClick={handleAddTime}
    >
      <PlusIcon />
      <p>Add Time</p>
    </div>
  );
};
