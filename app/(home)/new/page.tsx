import { getCities } from "@/app/repositories/city.repository";
import TravelRequestForm from "./travel-form";

export default async function NewPage() {
  const cities = await getCities();

  return <TravelRequestForm cities={cities} />;
}
