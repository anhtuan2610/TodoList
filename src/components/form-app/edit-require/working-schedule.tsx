import { useFieldArray, useFormContext } from "react-hook-form";
import { SEVEN_DAY } from "../../../utils/constants";
import { Checkbox } from "../../ui/checkbox";
import { Label } from "../../ui/label";
import { FormType } from "../../../pages/form/edit-require";
import TimeSchedule from "./time-schedule";
import { Button } from "../../ui/button";
import { CheckedState } from "@radix-ui/react-checkbox";
import { generateId } from "../../../utils/helper";

const WorkingSchedule = ({ scheduleIndex }: { scheduleIndex: number }) => {
  const { watch, control, setValue, getValues } = useFormContext<FormType>();
  const scheduleMethods = useFieldArray({
    control,
    name: "workingSchedules",
  });
  const timeMethods = useFieldArray({
    control,
    name: `workingSchedules.${scheduleIndex}.times`,
  });

  const handleRemoveSchedule = () => {
    scheduleMethods.remove(scheduleIndex);
  };

  const handleAddTime = () => {
    timeMethods.append({
      id: generateId(),
      fromHour: "",
      fromMinute: "",
      toHour: "",
      toMinute: "",
    });
  };

  const handleDayCheckedChange = (checked: CheckedState, dayValue: string) => {
    const currentDays =
      getValues(`workingSchedules.${scheduleIndex}.days`) || [];
    setValue(
      `workingSchedules.${scheduleIndex}.days`,
      checked
        ? [...currentDays, dayValue]
        : currentDays.filter((day) => day !== dayValue)
    );
  };

  const listDayUnavailable = watch("workingSchedules")
    .filter((_, index) => index != scheduleIndex)
    .flatMap((schedule) => schedule.days);

  return (
    <div className="border border-[#2E3035] p-3 rounded-xl space-y-5">
      <div className="flex justify-between">
        <Label>Working Schedule</Label>
        <button type="button" onClick={handleRemoveSchedule}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="white"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div className="flex items-center gap-4">
        {SEVEN_DAY.map((day) => (
          <div className="flex items-center space-x-2">
            <Checkbox
              className="border-[#2E3035] bg-[#1B1B1F] scale-125 disabled:bg-[#3f4049]"
              id={day.id.toString()}
              defaultChecked={watch(
                `workingSchedules.${scheduleIndex}.days`
              ).includes(day.value)}
              onCheckedChange={(checked) =>
                handleDayCheckedChange(checked, day.value)
              }
              disabled={listDayUnavailable.includes(day.value)}
            />
            <Label htmlFor={day.id.toString()}>{day.name}</Label>
          </div>
        ))}
      </div>
      {watch(`workingSchedules.${scheduleIndex}.times`).map((time, index) => (
        <TimeSchedule
          key={time.id}
          timeIndex={index}
          scheduleIndex={scheduleIndex}
        />
      ))}
      <span className="text-red-400"></span>
      <Button type="button" variant="ghost" onClick={handleAddTime}>
        <span>+</span>
        Add Time
      </Button>
    </div>
  );
};

export default WorkingSchedule;
