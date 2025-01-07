import { Input } from "./input";

export const TimeFromTo = () => {
  return (
    <div className="flex gap-8 w-full items-center">
      <div className="space-y-2 w-full">
        <p>From: *</p>
        <div className="flex items-center gap-2">
          <Input />
          <div>:</div>
          <Input />
        </div>
      </div>
      <div className="space-y-2 w-full">
        <p>To: *</p>
        <div className="flex items-center gap-2">
          <Input />
          <div>:</div>
          <Input />
        </div>
      </div>
    </div>
  );
};
