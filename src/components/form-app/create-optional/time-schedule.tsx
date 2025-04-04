import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { Label } from "../../ui/label";
import InputForm from "../common/input-form";
import { FormType } from "../../../pages/form/create-optional";
import clsx from "clsx";

const TimeSchedule = ({
  timeIndex,
  scheduleIndex,
}: {
  timeIndex: number;
  scheduleIndex: number;
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<FormType>();
  const timeMethods = useFieldArray({
    control,
    name: `workingSchedules.${scheduleIndex}.times`,
  });

  const handleRemoveTime = () => {
    timeMethods.remove(timeIndex);
  };

  return (
    <div className="flex gap-4 items-center">
      <div className="flex flex-col gap-3">
        <Label>From: *</Label>
        <div className="flex items-center gap-4">
          <Controller
            control={control}
            name={`workingSchedules.${scheduleIndex}.times.${timeIndex}.fromHour`}
            render={({ field }) => {
              return (
                <InputForm
                  className={clsx(
                    "border",
                    errors.workingSchedules?.[scheduleIndex]?.times?.[timeIndex]
                      ?.fromHour?.message
                      ? "border-red-400"
                      : "border-transparent"
                  )}
                  {...field}
                />
              );
            }}
          />
          <span>:</span>
          <Controller
            control={control}
            name={`workingSchedules.${scheduleIndex}.times.${timeIndex}.fromMinute`}
            render={({ field }) => {
              return (
                <InputForm
                  className={clsx(
                    "border",
                    errors.workingSchedules?.[scheduleIndex]?.times?.[timeIndex]
                      ?.fromMinute?.message
                      ? "border-red-400"
                      : "border-transparent"
                  )}
                  {...field}
                />
              );
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
              return (
                <InputForm
                  className={clsx(
                    "border",
                    errors.workingSchedules?.[scheduleIndex]?.times?.[timeIndex]
                      ?.toHour?.message
                      ? "border-red-400"
                      : "border-transparent"
                  )}
                  {...field}
                />
              );
            }}
          />
          <span>:</span>
          <Controller
            control={control}
            name={`workingSchedules.${scheduleIndex}.times.${timeIndex}.toMinute`}
            render={({ field }) => {
              return (
                <InputForm
                  className={clsx(
                    "border",
                    errors.workingSchedules?.[scheduleIndex]?.times?.[timeIndex]
                      ?.toMinute?.message
                      ? "border-red-400"
                      : "border-transparent"
                  )}
                  {...field}
                />
              );
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
