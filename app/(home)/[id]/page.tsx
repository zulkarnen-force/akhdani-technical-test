import { getById } from "@/app/repositories/perdin-request.repository";
import { setStatusAction } from "./action";
import TravelCardDetail from "./detail";

export default async function TravelDetailRequestPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { id } = await params;
  const data = await getById(id);

  return (
    <div>
      <TravelCardDetail id={id} data={data} />
    </div>
  );
}
