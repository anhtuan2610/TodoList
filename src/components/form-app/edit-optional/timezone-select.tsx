import { Label } from "../../ui/label";
import InputForm from "../common/input-form";
// import moment from "moment-timezone";

const TimezoneSelect = () => {
  //   const getTimezonesWithOffset = () => {
  //     return moment.tz.names().map((tz) => {
  //       const offset = moment.tz(tz).utcOffset(); // Lấy offset theo phút
  //       const hours = Math.floor(offset / 60);
  //       const minutes = offset % 60;
  //       const gmt = `GMT${hours >= 0 ? "+" : ""}${hours}:${
  //         minutes === 0 ? "00" : minutes
  //       }`;
  //       return { value: tz, label: `(${gmt}) ${tz}` };
  //     });
  //   };

  //   const timezones = getTimezonesWithOffset();
  //   console.log(timezones);
  return (
    <div className="flex flex-col gap-3">
      <Label>Timezone *</Label>
      <InputForm />
    </div>
  );
};

export default TimezoneSelect;
