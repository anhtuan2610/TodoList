import { useQuery } from "@tanstack/react-query";
import { Label } from "../../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { getAllRegion } from "../../../services/form";
import Loading from "../common/loading";

const RegionSelect = ({
  handleRegionChange,
}: {
  handleRegionChange: (e: string) => void;
}) => {
  const { data, isLoading } = useQuery({
    queryKey: ["getAllRegion"],
    queryFn: getAllRegion,
  });

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-3">
        <Label>Region *</Label>
        <Select onValueChange={handleRegionChange}>
          <SelectTrigger className="w-full bg-[#27282D]">
            <SelectValue placeholder="Select Region" />
          </SelectTrigger>
          <SelectContent>
            {isLoading ? (
              <Loading />
            ) : (
              data?.map((region) => (
                <SelectItem key={region.id} value={region.id}>
                  {region.nameEn}
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default RegionSelect;
