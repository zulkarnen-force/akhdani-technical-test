import { getCityByIdAction } from "@/actions/city.action";
import EditCityForm from "@/components/features/city/edit-city-form";
import { getIslands } from "@/server/repositories/island.repository";
import { getProvinces } from "@/server/repositories/province.repository";

export default async function EditCityPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const city = await getCityByIdAction((await params).id);
  const provinces = await getProvinces();
  const islands = await getIslands();
  if (!city) return <div>City not found</div>;
  return <EditCityForm city={city} provinces={provinces.data} islands={islands.data} />;
}
