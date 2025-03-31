import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { Label } from "../../ui/label";
import InputForm from "../common/input-form";
import { FormType } from "../../../pages/form/create-require";

const TimeSchedule = ({
  timeIndex,
  scheduleIndex,
}: {
  timeIndex: number;
  scheduleIndex: number;
}) => {
  const { control } = useFormContext<FormType>();
  const timeMethods = useFieldArray({
    control,
    name: `workingSchedules.${scheduleIndex}.times`,
  });

  const handleRemoveTime = () => {
    console.log("🚀 ~ handleRemoveTime ~ timeIndex:", timeIndex);
    timeMethods.remove(timeIndex);
  };

  return (
    <div className="flex justify-around items-center">
      <div className="flex flex-col gap-3">
        <Label>From: *</Label>
        <div className="flex items-center gap-4">
          <Controller
            control={control}
            name={`workingSchedules.${scheduleIndex}.times.${timeIndex}.fromHour`}
            render={({ field }) => {
              return <InputForm {...field} />;
            }}
          />
          <span>:</span>
          <Controller
            control={control}
            name={`workingSchedules.${scheduleIndex}.times.${timeIndex}.fromMinute`}
            render={({ field }) => {
              return <InputForm {...field} />;
            }}
          />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <Label>To: *</Label>
        <div className="flex items-center gap-4">
          <Controller
            control={control}
            name={`workingSchedules.${scheduleIndex}.times.${timeIndex}.toHour`}
            render={({ field }) => {
              return <InputForm {...field} />;
            }}
          />
          <span>:</span>
          <Controller
            control={control}
            name={`workingSchedules.${scheduleIndex}.times.${timeIndex}.toMinute`}
            render={({ field }) => {
              return <InputForm {...field} />;
            }}
          />
          <button
            className="flex items-center"
            type="button"
            onClick={handleRemoveTime}
          >
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
      </div>
    </div>
  );
};

export default TimeSchedule;
