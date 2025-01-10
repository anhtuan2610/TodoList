import { useState } from "react";
import { PlusIcon, SearchIcon } from "../assets/icons";
import { Schedule } from "../components/time-app/schedule";
import { generateId } from "../utils/helper";
import { ScheduleContext } from "../context/schedule-context";
import { StoreRegistered } from "../components/time-app/store-registered";

export const TimeApp = () => {
  const [listSchedule, setListSchedule] = useState<TSchedule[]>([]);
  const [listScheduleSave, setListScheduleSave] = useState<TSchedule[]>([]);
  console.log("🚀 ~ TimeApp ~ listScheduleSave:", listScheduleSave);

  const handleAddSchedule = () => {
    setListSchedule((prev) => [
      ...prev,
      { id: generateId(), workingDays: [], times: [] },
    ]);
  };

  const DEFAULT_SCHEDULE = [
    {
      id: "1",
      day: "mon",
      workingTime: [
        { start: 1, to: 10 },
        { start: 10, to: 12 },
        { start: 14, to: 24 },
      ],
    },
    {
      id: "2",
      day: "tue",
      workingTime: [
        { start: 1, to: 10 },
        { start: 10, to: 12 },
        { start: 14, to: 24 },
      ],
    },
    {
      id: "3",
      day: "wed",
      workingTime: [
        { start: 1, to: 10 },
        { start: 10, to: 12 },
      ],
    },
    {
      id: "4",
      day: "thu",
      workingTime: [],
    },
    {
      id: "5",
      day: "fri",
      workingTime: [],
    },
    {
      id: "6",
      day: "sat",
      workingTime: [],
    },
    {
      id: "7",
      day: "sun",
      workingTime: [],
    },
  ];

  return (
    <ScheduleContext.Provider value={{ listSchedule, setListSchedule }}>
      <div className="bg-[#212121] min-h-screen text-white p-6 space-y-5">
        <div className="bg-[#1B1B1F] p-4 rounded-2xl">
          <div className="flex justify-between">
            <div className=" text-2xl  font-semibold">Working hour</div>
            <button
              className="bg-[#2C2D32] px-4 py-2 rounded-lg font-semibold shadow-lg disabled:bg-gray-600 disabled:text-gray-400 disabled:shadow-none disabled:cursor-not-allowed"
              disabled={listSchedule.length == 0}
              onClick={() => setListScheduleSave(listSchedule)}
            >
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
            className="flex items-center gap-2 px-3 py-2 bg-[#2C2D32] rounded-xl font-semibold shadow-lg disabled:bg-gray-600 disabled:text-gray-400 disabled:shadow-none disabled:cursor-not-allowed"
            onClick={handleAddSchedule}
            disabled={listSchedule.length >= 7}
          >
            <PlusIcon /> Add Schedule
          </button>
        </div>
        {listScheduleSave.length > 0 && (
          <StoreRegistered listScheduleSave={listScheduleSave} />
        )}
      </div>
    </ScheduleContext.Provider>
  );
};
