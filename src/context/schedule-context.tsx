import { createContext } from "react";

export const ScheduleContext = createContext<{
  listSchedule: TSchedule[];
  setListSchedule: React.Dispatch<React.SetStateAction<TSchedule[]>>;
} | null>(null);
