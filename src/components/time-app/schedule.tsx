import { useContext, useEffect, useState } from "react";
import { AddTimeButton } from "./add-time-button";
import { TimeFromTo } from "./time-from-to";
import { WorkingSchedule } from "./working-schedule";
import { ScheduleContext } from "../../context/schedule-context";

export const Schedule = ({
  scheduleSelected,
}: {
  scheduleSelected: TSchedule;
}) => {
  const scheduleDataContext = useContext(ScheduleContext);
  const [listWorkedDay, setListWorkedDay] = useState<string[]>([]);

  useEffect(() => {
    if (scheduleDataContext?.listSchedule) {
      const newList: string[] = [];
      scheduleDataContext.listSchedule.forEach((schedule) => {
        if (schedule.id !== scheduleSelected.id)
          newList.push(...schedule.workingDays);
      });
      setListWorkedDay(newList);
    }
  }, []);

  return (
    <div className="p-4 border border-gray-700 rounded-md space-y-6">
      <WorkingSchedule
        scheduleSelected={scheduleSelected}
        listWorkedDay={listWorkedDay}
      />
      <TimeFromTo />
      <AddTimeButton />
    </div>
  );
};
