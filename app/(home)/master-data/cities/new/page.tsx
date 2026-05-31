import { getIslands } from "@/server/repositories/island.repository";
import { getProvinces } from "@/server/repositories/province.repository";
import CityForm from "@/components/features/city/city-form";

export default async function NewMasterDataPage() {
  const provinces = await getProvinces();
  const islands = await getIslands();
  return <CityForm islands={islands.data} provinces={provinces.data} />;
}
