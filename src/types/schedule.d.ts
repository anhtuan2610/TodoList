type TSchedule = {
  id: string;
  workingDays: string[];
  times: TTime[] | null; //same times: TTime[] | [];
};

type TTime = {
  id: string;
  fromHour: string;
  fromMinute: string;
  toHour: string;
  toMinute: string;
};
