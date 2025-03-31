import { get } from "./axios-config"

interface Regions {
    id: string,
    nameAr: string,
    nameEn: string
}

export interface Cities {
    id: string,
    nameAr: string,
    nameEn: string
}

export const getAllRegion = async () => {
    return await get<Regions[]>({url: '/lookups/regions'})
}

export const getCityByRegionId = async ({regionId}: {regionId: string}) => {
    return await get<Cities[]>({url: '/lookups/cities', params: {regionId}})
}
