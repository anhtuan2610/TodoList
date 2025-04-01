import { useState } from "react";
import { Button } from "../../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import CitySelect from "./city-select";
import RegionSelect from "./region-select";
import { useFormContext } from "react-hook-form";
import { FormType } from "../../../pages/form/edit-require";
import { Cities } from "../../../types/response/form";

const CityDialog = ({
  isShow,
  handleCloseSelectCity,
}: {
  isShow: boolean;
  handleCloseSelectCity: () => void;
}) => {
  const { setValue } = useFormContext<FormType>();
  const [regionId, setRegionId] = useState<string | undefined>(undefined);
  const [citySelected, setCitySelected] = useState<Cities | undefined>(
    undefined
  );
  const handleRegionChange = (e: string) => {
    setRegionId(e);
  };
  const handleOnSave = () => {
    if (citySelected) {
      setValue("cityName", citySelected.nameEn);
      handleCloseSelectCity();
    }
  };

  return (
    <Dialog open={isShow} onOpenChange={handleCloseSelectCity}>
      <DialogContent className="bg-[#1B1B1F] text-white border-none min-w-[648px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Select City</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-8">
          <RegionSelect handleRegionChange={handleRegionChange} />
          <CitySelect regionId={regionId} setCitySelected={setCitySelected} />
        </div>
        <DialogFooter>
          <Button className="bg-[#292A2F]" onClick={handleCloseSelectCity}>
            Cancel
          </Button>
          <Button
            className="bg-[#E0E1E3] text-black"
            onClick={handleOnSave}
            disabled={!citySelected}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CityDialog;
