export const StoreRegistered = ({
  listScheduleSave,
}: {
  listScheduleSave: TSchedule[];
}) => {
  return (
    <div className="flex gap-4 bg-[#1B1B1F] p-4 rounded-2xl">
      {listScheduleSave?.map((schedule) => (
        <div className="w-fit p-4 border border-gray-700 rounded-md space-y-6 ">
          <div className="flex justify-center gap-4">
            {schedule.workingDays.map((day) => (
              <div className="border border-gray-700 rounded-md px-3 py-1 text-[#26BE87] font-semibold bg-[#022C22]">
                {day.toUpperCase()}
              </div>
            ))}
          </div>
          {schedule.times?.map((time) => (
            <div className="flex gap-1">
              <p>
                {time.fromHour}:{time.fromMinute}
              </p>
              <p>to</p>
              <p>
                {time.toHour}:{time.toMinute}
              </p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
