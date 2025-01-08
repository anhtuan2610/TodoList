import { useContext, useEffect, useState } from "react";
import { CloseIcon } from "../../assets/icons";
import { SEVEN_DAY } from "../../utils/constants";
import { ScheduleContext } from "../../context/schedule-context";

export const WorkingSchedule = ({
  scheduleSelected,
}: {
  scheduleSelected: TSchedule;
}) => {
  const scheduleDataContext = useContext(ScheduleContext);
  const [disableWorkedDays, setDisableWorkedDays] = useState<string[]>([]);
  const handleOnClose = () => {
    const newListSchedule = scheduleDataContext?.listSchedule.filter(
      (schedule) => schedule.id !== scheduleSelected.id
    );
    if (newListSchedule) {
      scheduleDataContext?.setListSchedule(newListSchedule);
    }
  };
  const handleOnChangeChecked = (
    e: React.ChangeEvent<HTMLInputElement>,
    dayValue: string
  ) => {
    const checked = e.target.checked;
    if (checked) {
      const newListSchedule = scheduleDataContext?.listSchedule.map(
        (schedule) =>
          schedule.id === scheduleSelected.id
            ? { ...schedule, workingDays: [...schedule.workingDays, dayValue] }
            : schedule
      );
      if (newListSchedule) {
        scheduleDataContext?.setListSchedule(newListSchedule);
      }
    } else {
      const newListSchedule = scheduleDataContext?.listSchedule.map(
        (schedule) => {
          if (schedule.id === scheduleSelected.id) {
            const newScheduleListDayWorked = schedule.workingDays.filter(
              (day) => {
                return day !== dayValue;
              }
            );
            return { ...schedule, workingDays: newScheduleListDayWorked };
          } else {
            return schedule;
          }
        }
      );
      if (newListSchedule) {
        scheduleDataContext?.setListSchedule(newListSchedule);
      }
    }
  };

  useEffect(() => {
    const newListDisableWorkedDays = scheduleDataContext?.listSchedule.reduce<
      string[]
    >((total, current) => {
      if (scheduleSelected.id !== current.id) {
        total.push(...current.workingDays);
      }
      return total;
    }, []);
    if (newListDisableWorkedDays) {
      setDisableWorkedDays(newListDisableWorkedDays);
    }
  }, [scheduleDataContext?.listSchedule]);

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
              disabled={disableWorkedDays.includes(day.value)}
              checked={scheduleSelected.workingDays.includes(day.value)}
              onChange={(e) => handleOnChangeChecked(e, day.value)}
            />
            <label htmlFor={day.value}>{day.name}</label>
          </div>
        ))}
      </div>
    </div>
  );
};
