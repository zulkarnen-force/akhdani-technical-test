import { getById } from "@/app/repositories/perdin-request.repository";
import TravelCardDetail from "./detail";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function TravelDetailRequestPage({
  params,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { id } = await params;
  const data = await getById(id);
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/sign-in");
  }
  return (
    <div>
      <TravelCardDetail id={id} data={data} role={session?.user.role} />
    </div>
  );
}
