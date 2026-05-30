import { getCityNames } from "@/app/repositories/city.repository";
import TravelRequestForm from "./travel-form";

export default async function NewPage() {
  const cities = await getCityNames();
  return <TravelRequestForm cities={cities} />;
}
