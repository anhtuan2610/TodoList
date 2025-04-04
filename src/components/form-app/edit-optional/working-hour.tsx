import { useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "../../ui/button";
import TimezoneSelect from "./timezone-select";
import WorkingSchedule from "./working-schedule";
import { FormType } from "../../../pages/form/edit-optional";
import { generateId } from "../../../utils/helper";

const WorkingHour = () => {
  const {
    watch,
    control,
    formState: { errors },
  } = useFormContext<FormType>();
  const { append } = useFieldArray({
    control,
    name: "workingSchedules",
  });

  const handleAddSchedule = () => {
    const newWorkingSchedule = {
      id: generateId(),
      days: [],
      times: [
        {
          id: generateId(),
          fromHour: "",
          fromMinute: "",
          toHour: "",
          toMinute: "",
        },
      ],
    };
    append(newWorkingSchedule);
  };

  return (
    <div className="bg-[#1B1B1F] min-h-screen p-4 flex flex-col gap-8">
      <p className="text-2xl font-semibold">Working Hour</p>
      <TimezoneSelect />
      {(watch("workingSchedules") ?? []).map((schedule, index) => (
        <WorkingSchedule key={schedule?.id} scheduleIndex={index} />
      ))}
      {errors.workingSchedules?.root?.message && (
        <span className="text-red-400">
          {errors.workingSchedules.root.message}
        </span>
      )}
      <Button
        type="button"
        className="flex justify-center items-center w-fit bg-[#2C2D32] hover:bg-[#3F4246]"
        onClick={handleAddSchedule}
      >
        <span>+</span>Add schedule
      </Button>
    </div>
  );
};

export default WorkingHour;
