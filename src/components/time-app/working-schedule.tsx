import { useContext } from "react";
import { CloseIcon } from "../../assets/icons";
import { SEVEN_DAY } from "../../utils/constants";
import { ScheduleContext } from "../../context/schedule-context";

export const WorkingSchedule = ({
  scheduleSelected,
  listWorkedDay,
}: {
  scheduleSelected: TSchedule;
  listWorkedDay: string[];
}) => {
  const scheduleDataContext = useContext(ScheduleContext);
  const handleOnClose = () => {
    const newListSchedule = scheduleDataContext?.listSchedule.filter(
      (schedule) => schedule.id !== scheduleSelected.id
    );
    if (newListSchedule) {
      scheduleDataContext?.setListSchedule(newListSchedule);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <p>Working Schedule</p>
        <div className="cursor-pointer" onClick={handleOnClose}>
          <CloseIcon />
        </div>
      </div>
      <div className="flex gap-4">
        {SEVEN_DAY.map((day) => (
          <div key={day.id} className="flex gap-2">
            <input
              id={day.value}
              type="checkbox"
              checked={scheduleSelected.workingDays.includes(day.value)}
              disabled={listWorkedDay.includes(day.value)}
            />
            <label htmlFor={day.value}>{day.name}</label>
          </div>
        ))}
      </div>
    </div>
  );
};
