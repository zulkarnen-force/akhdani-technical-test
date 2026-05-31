"use client";

import Card from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { PerdinRequest, Role } from "@/types";
import { setStatusAction } from "@/actions/travel.action";

const formatCostCurrency = (
  currency: string,
  cost: number | undefined,
): React.ReactNode => {
  {
    return currency && currency === "IDR"
      ? `Rp ${cost?.toLocaleString("id-ID")}`
      : "$" + (cost?.toLocaleString("en-US") || "-");
  }
};
export default function TravelCardDetail({
  id,
  data,
  role,
}: {
  id: string;
  data: PerdinRequest | null;
  role: Role;
}) {
  const router = useRouter();

  if (!data) {
    return <div>Loading...</div>;
  }

  const setTo = async (status: "APPROVED" | "REJECTED" | "PENDING") => {
    try {
      await setStatusAction(id, status);
      router.replace("/");
    } catch (error) {}
    router.refresh();
  };

  const MapLabelColorStatus: Record<
    "APPROVED" | "REJECTED" | "PENDING",
    string
  > = {
    APPROVED: "bg-brand-100 text-brand-700",
    REJECTED: "bg-red-100 text-red-800",
    PENDING: "bg-yellow-100 text-yellow-800",
  };

  const MapLabelStatusText: Record<
    "APPROVED" | "REJECTED" | "PENDING",
    string
  > = {
    APPROVED: "Disetujui",
    REJECTED: "Ditolak",
    PENDING: "Menunggu approval",
  };

  return (
    <Card className="max-w-4xl mx-auto mt-10">
      <Card.Header>
        <Card.Title>Detail Permohonaan Perjalanan Dinas</Card.Title>
        <Card.Header.Description>
          <span
            className={`font-bold bg-brand-100 px-2 py-1 rounded-lg ${MapLabelColorStatus[data.status]}`}
          >
            {MapLabelStatusText[data.status]}
          </span>
        </Card.Header.Description>
      </Card.Header>
      <Card.Content>
        <form className=" bg-surface-base p-6 rounded-lg border border-border my-2">
          <div className="mb-4 flex flex-row gap-2">
            <div className="w-full">
              <label
                htmlFor="travel-id"
                className="block text-sm font-medium text-foreground"
              >
                Travel ID:
              </label>
              <input
                type="text"
                id="travel-id"
                value={id}
                readOnly
                className="mt-1 block w-full border border-border rounded-md shadow-sm focus:ring-brand-500 focus:border-brand-500 px-3 py-2"
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="travel-name"
                className="block text-sm font-medium text-foreground"
              >
                Name
              </label>
              <input
                type="text"
                id="travel-name"
                value={data?.user?.username || ""}
                readOnly
                className="mt-1 block w-full border border-border rounded-md shadow-sm focus:ring-brand-500 focus:border-brand-500 px-3 py-2"
              />
            </div>
          </div>
          <div>
            <div className="flex flex-row gap-2">
              <label
                htmlFor="travel-id"
                className="text-sm font-medium text-foreground"
              >
                Tujuan
              </label>
            </div>
            <div className="mb-4 flex flex-row gap-2">
              <input
                type="text"
                id="travel-id"
                value={data?.originCity?.name || ""}
                readOnly
                className="mt-1 block w-full border border-border rounded-md shadow-sm focus:ring-brand-500 focus:border-brand-500 px-3 py-2"
              />
              <input
                type="text"
                id="travel-id"
                value={data?.destinationCity?.name || ""}
                readOnly
                className="mt-1 block w-full border border-border rounded-md shadow-sm focus:ring-brand-500 focus:border-brand-500 px-3 py-2"
              />
            </div>
          </div>

          <div>
            <div className="flex flex-row gap-2">
              <label
                htmlFor="travel-id"
                className="text-sm font-medium text-foreground"
              >
                Waktu Perjalanan
              </label>
            </div>
            <div className="mb-4 flex flex-row gap-2">
              <input
                type="date"
                id="travel-id"
                value={
                  data?.departureDate
                    ? new Date(data.departureDate).toISOString().split("T")[0]
                    : ""
                }
                readOnly
                className="mt-1 block w-full border border-border rounded-md shadow-sm focus:ring-brand-500 focus:border-brand-500 px-3 py-2"
              />
              <input
                type="date"
                id="travel-id"
                value={
                  data?.arrivalDate
                    ? new Date(data.arrivalDate).toISOString().split("T")[0]
                    : ""
                }
                readOnly
                className="mt-1 block w-full border border-border rounded-md shadow-sm focus:ring-brand-500 focus:border-brand-500 px-3 py-2"
              />
            </div>
          </div>

          <div className="mb-4 bg-brand-50 p-4 rounded-lg">
            <table className="w-full table-auto border-collapse">
              <thead className="bg-brand-100">
                <tr className="flex justify-between w-full border-b border-border">
                  <th className="px-4 py-2 text-left text-sm font-medium text-foreground">
                    Total hari
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-foreground">
                    Jarak tempuh (km)
                  </th>
                  <th>
                    <span className="px-4 py-2 text-left text-sm font-medium text-foreground">
                      Biaya
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="flex justify-between w-full border-b border-border">
                  <td className="px-4 py-2 text-sm text-foreground">
                    {data?.days || "-"}
                  </td>
                  <td className="px-4 py-2 text-sm text-foreground">
                    {data?.km || "-"}
                  </td>
                  <td className="px-4 py-2 text-sm text-foreground">
                    {data.status === "APPROVED" &&
                    data.currency &&
                    data.travelCost ? (
                      formatCostCurrency(data.currency, data.travelCost)
                    ) : role === "SDM_DIVISION" ? (
                      <span className="text-primary font-medium">
                        {formatCostCurrency(
                          data.currency || "IDR",
                          data.travelCost || 0,
                        )}
                      </span>
                    ) : (
                      <span className="text-text-muted italic">
                        {MapLabelStatusText[data.status]}
                      </span>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {role === "SDM_DIVISION" && (
            <div>
              <div className="flex justify-end mt-6">
                <button
                  type="button"
                  className="bg-danger hover:bg-color-danger text-white font-medium py-2 px-4 rounded-md"
                  onClick={() => setTo("REJECTED")}
                >
                  Reject
                </button>
                <button
                  type="button"
                  className="bg-success hover:bg-color-success text-white font-medium py-2 px-4 rounded-md ml-2"
                  onClick={() => setTo("APPROVED")}
                >
                  Approve
                </button>
              </div>
            </div>
          )}
        </form>
      </Card.Content>
    </Card>
  );
}
