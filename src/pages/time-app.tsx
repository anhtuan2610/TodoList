import { useState } from "react";
import { PlusIcon, SearchIcon } from "../assets/icons";
import { Schedule } from "../components/time-app/schedule";
import { generateId } from "../utils/helper";
import { ScheduleContext } from "../context/schedule-context";

export const TimeApp = () => {
  const [listSchedule, setListSchedule] = useState<TSchedule[]>([
    {
      id: generateId(),
      workingDays: ["mon", "sat"],
    },
    {
      id: generateId(),
      workingDays: ["wed"],
    },
    {
      id: generateId(),
      workingDays: ["sun"],
    },
  ]);

  const handleAddSchedule = () => {
    setListSchedule((prev) => [...prev, { id: generateId(), workingDays: [] }]);
  };

  return (
    <ScheduleContext.Provider value={{ listSchedule, setListSchedule }}>
      <div className="bg-[#212121] min-h-screen text-white p-6">
        <div className="bg-[#1B1B1F] p-4 rounded-2xl">
          <div className="flex justify-between">
            <div className=" text-2xl  font-semibold">Working hour</div>
            <button className="bg-[#2C2D32] px-4 py-2 rounded-lg font-semibold shadow-lg">
              Save
            </button>
          </div>
          <div className="space-y-2 mt-10">
            <p>Store Name *</p>
            <div className="relative">
              <input
                className="w-full bg-[#27282D] p-2 pl-12 rounded-md"
                type="text"
              />
              <div className="absolute top-1/2 left-3 -translate-y-1/2">
                <SearchIcon />
              </div>
            </div>
          </div>
          <div className="my-6 space-y-6">
            {listSchedule.length > 0 ? (
              listSchedule.map((schedule) => (
                <Schedule key={schedule.id} scheduleSelected={schedule} />
              ))
            ) : (
              <div>No Schedule Available</div>
            )}
          </div>

          <button
            className="flex items-center gap-2 px-3 py-2 bg-[#2C2D32] rounded-xl font-semibold shadow-lg"
            onClick={handleAddSchedule}
          >
            <PlusIcon /> Add Schedule
          </button>
        </div>
      </div>
    </ScheduleContext.Provider>
  );
};
