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

  const handleOnchangeInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    const timeField = type;
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

    scheduleDataContext?.setListSchedule(newListSchedule ?? []);
  };

  return (
    <div className="flex gap-8 w-full items-center">
      <div className="space-y-2 w-full">
        <p>From: *</p>
        <div className="flex items-center gap-2">
          <Input
            handleOnchangeInput={(e) => handleOnchangeInput(e, "fromHour")}
          />
          <div>:</div>
          <Input
            handleOnchangeInput={(e) => handleOnchangeInput(e, "fromMinute")}
          />
        </div>
      </div>
      <div className="space-y-2 w-full">
        <p>To: *</p>
        <div className="flex items-center gap-2">
          <Input
            handleOnchangeInput={(e) => handleOnchangeInput(e, "toHour")}
          />
          <div>:</div>
          <Input
            handleOnchangeInput={(e) => handleOnchangeInput(e, "toMinute")}
          />
        </div>
      </div>
    </div>
  );
};
