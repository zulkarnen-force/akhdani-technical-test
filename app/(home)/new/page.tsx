import TravelRequestForm from "@/components/features/travel/travel-form";
import { getCityNames } from "@/server/repositories/city.repository";

export default async function NewPage() {
  const cities = await getCityNames();
  return <TravelRequestForm cities={cities} />;
}
