import { AddTimeButton } from "./add-time-button";
import { TimeFromTo } from "./time-from-to";
import { WorkingSchedule } from "./working-schedule";

export const Schedule = ({
  scheduleSelected,
}: {
  scheduleSelected: TSchedule;
}) => {
  return (
    <div className="p-4 border border-gray-700 rounded-md space-y-6">
      <WorkingSchedule scheduleSelected={scheduleSelected} />
      {scheduleSelected.times?.map((time) => (
        <TimeFromTo
          key={time.id}
          scheduleSelected={scheduleSelected}
          timeSelected={time}
        />
      ))}
      <AddTimeButton scheduleSelected={scheduleSelected} />
    </div>
  );
};
