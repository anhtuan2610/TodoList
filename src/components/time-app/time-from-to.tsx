import { useContext } from "react";
import { ScheduleContext } from "../../context/schedule-context";
import { Input } from "./input";

export const TimeFromTo = ({
  scheduleSelected,
  timeSelected,
}: {
  scheduleSelected: TSchedule;
  timeSelected: TTime;
}) => {
  const scheduleDataContext = useContext(ScheduleContext);
  const handleOnchangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const timeField = e.target.id;
    const newListSchedule = scheduleDataContext?.listSchedule.map(
      (schedule) => {
        if (scheduleSelected.id === schedule.id) {
          const newListTime = schedule.times?.map((time) => {
            if (timeSelected.id === time.id) {
              return { ...time, [timeField]: e.target.value };
            }
            return time;
          });
          return { ...schedule, times: newListTime ?? [] };
        }
        return schedule;
      }
    );

    if (newListSchedule) {
      scheduleDataContext?.setListSchedule(newListSchedule);
    }
  };

  return (
    <div className="flex gap-8 w-full items-center">
      <div className="space-y-2 w-full">
        <p>From: *</p>
        <div className="flex items-center gap-2">
          <Input id={"fromHour"} handleOnchangeInput={handleOnchangeInput} />
          <div>:</div>
          <Input id={"fromMinute"} handleOnchangeInput={handleOnchangeInput} />
        </div>
      </div>
      <div className="space-y-2 w-full">
        <p>To: *</p>
        <div className="flex items-center gap-2">
          <Input id={"toHour"} handleOnchangeInput={handleOnchangeInput} />
          <div>:</div>
          <Input id={"toMinute"} handleOnchangeInput={handleOnchangeInput} />
        </div>
      </div>
    </div>
  );
};
