import { useState } from "react";
import { Button } from "../../ui/button";
import { Label } from "../../ui/label";
import InputForm from "../common/input-form";
import CityDialog from "./city-dialog";
import { Controller, useFormContext } from "react-hook-form";
import { FormType } from "../../../pages/form/edit-require";
import PhotoUpload from "./photo-upload";
import clsx from "clsx";
import { Switch } from "../../ui/switch";

const GeneralInformation = () => {
  const [showSelectCity, setShowSelectCity] = useState(false);
  const {
    watch,
    control,
    setValue,
    formState: { errors },
  } = useFormContext<FormType>();

  const handleCloseSelectCity = () => {
    setShowSelectCity(false);
  };

  const handleStatusWorkingChange = (statusWorking: boolean) => {
    setValue("statusWorking", statusWorking);
  };

  return (
    <div className="bg-[#1B1B1F] min-h-screen p-4 flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <p className="text-2xl font-semibold">
          General Information{" "}
          <span className="text-blue-400">(Edit Require)</span>
        </p>
        <Button type="submit" variant="destructive">
          Submit
        </Button>
      </div>
      <div className="flex flex-col gap-3">
        <Label>Name * (Input)</Label>
        <Controller
          control={control}
          name="name"
          render={({ field }) => {
            return (
              <InputForm
                className={clsx(
                  errors.name?.message ? "border-red-400" : "border-transparent"
                )}
                placeholder="Merchant name"
                {...field}
              />
            );
          }}
        />
        <span className="text-red-400">{errors.name?.message}</span>
      </div>
      <div className="flex flex-col gap-3">
        <Label>Phone Number * (Input - Number)</Label>
        <Controller
          control={control}
          name="phoneNumber"
          render={({ field }) => {
            return (
              <InputForm
                className={clsx(
                  errors.phoneNumber?.message
                    ? "border-red-400"
                    : "border-transparent"
                )}
                placeholder="Phone number"
                {...field}
              />
            );
          }}
        />
        <span className="text-red-400">{errors.phoneNumber?.message}</span>
      </div>
      <div className="flex flex-col gap-3">
        <Label>Email * (Input - email)</Label>
        <Controller
          control={control}
          name="email"
          render={({ field }) => {
            return (
              <InputForm
                className={clsx(
                  errors.email?.message
                    ? "border-red-400"
                    : "border-transparent"
                )}
                placeholder="Email Address"
                {...field}
              />
            );
          }}
        />
        <span className="text-red-400">{errors.email?.message}</span>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <Label>City * (Select)</Label>
          <Button
            type="button"
            variant="ghost"
            onClick={() => setShowSelectCity(true)}
          >
            Select City
          </Button>
        </div>
        <InputForm
          className={clsx(
            errors.cityName?.message ? "border-red-400" : "border-transparent"
          )}
          placeholder="City"
          value={watch("cityName")}
        />
        <span className="text-red-400">{errors.cityName?.message}</span>
      </div>
      <div className="flex flex-col gap-8">
        <PhotoUpload />
        {/* <DocumentUpload /> */}
      </div>
      <div className="flex flex-col gap-2">
        <Label>Status</Label>
        <div className="flex items-center gap-4">
          <Controller
            control={control}
            name="statusWorking"
            render={({ field: { value } }) => (
              <Switch
                id="statusWorking"
                checked={value}
                onCheckedChange={handleStatusWorkingChange}
                className="data-[state=checked]:bg-[#5D9FF1] data-[state=unchecked]:bg-[#34363B] scale-110"
              />
            )}
          />
          <Label htmlFor="statusWorking">Working</Label>
        </div>
      </div>
      {showSelectCity && (
        <CityDialog
          isShow={showSelectCity}
          handleCloseSelectCity={handleCloseSelectCity}
        />
      )}
    </div>
  );
};

export default GeneralInformation;
