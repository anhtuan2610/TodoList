import { useQuery } from "@tanstack/react-query";
import { Label } from "../../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import Loading from "../common/loading";
import { Cities, getCityByRegionId } from "../../../services/form";

const CitySelect = ({
  regionId,
  setCitySelected,
}: {
  regionId: string | undefined;
  setCitySelected: React.Dispatch<React.SetStateAction<Cities | undefined>>;
}) => {
  const { data, isLoading } = useQuery({
    queryKey: ["getAllRegion", regionId],
    queryFn: async () => {
      if (regionId) {
        return await getCityByRegionId({ regionId });
      }
    },
    enabled: !!regionId,
  });
  const handleCityChange = (id: string) => {
    const findCity = data?.find((city) => city.id === id);
    if (findCity) {
      setCitySelected(findCity);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-3">
        <Label>City *</Label>
        <Select onValueChange={handleCityChange} disabled={!regionId}>
          <SelectTrigger className="w-full bg-[#27282D]">
            <SelectValue placeholder="Select Region" />
          </SelectTrigger>
          <SelectContent>
            {isLoading ? (
              <Loading />
            ) : (
              data?.map((city) => (
                <SelectItem key={city.id} value={city.id}>
                  {city.nameEn}
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default CitySelect;
