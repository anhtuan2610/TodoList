import { Cities, Merchant, Regions } from "../types/response/form";
import { get } from "./axios-config";

export const getAllRegion = async () => {
  return await get<Regions[]>({
    url: "https://dev.go.locate.sa/api/admin/api/v1/lookups/regions",
  });
};

export const getCityByRegionId = async ({ regionId }: { regionId: string }) => {
  return await get<Cities[]>({
    url: "https://dev.go.locate.sa/api/admin/api/v1/lookups/cities",
    params: { regionId },
  });
};

export const getMerchantDetails = async ({
  merchantId,
}: {
  merchantId: string;
}) => {
  return await get<Merchant>({
    url: `https://dev.rails.merchant.locate.sa/api/v1/merchants/${merchantId}`,
  });
};
