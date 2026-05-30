"use client";

import Card from "@/components/card";
import { useRouter } from "next/navigation";
import { PerdinRequest } from "@/lib/types";
import { setStatusAction } from "./action";

export default function TravelCardDetail({ id, data }: { id: string; data: PerdinRequest | null }) {
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

  return (
    <Card className="max-w-4xl mx-auto mt-10">
      <Card.Header>
        <Card.Title>Travel Detail Request Page</Card.Title>
        <Card.Header.Description>
          Travel ID: <span className="font-bold bg-brand-100 px-2 py-1 rounded-lg">{id}</span>
        </Card.Header.Description>
      </Card.Header>
      <Card.Content>
        <form className=" bg-surface-base p-6 rounded-lg border border-border my-2">
          <div className="mb-4 flex flex-row gap-2">
            <div className="w-full">
              <label htmlFor="travel-id" className="block text-sm font-medium text-foreground">
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
              <label htmlFor="travel-name" className="block text-sm font-medium text-foreground">
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
              <label htmlFor="travel-id" className="text-sm font-medium text-foreground">
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
              <label htmlFor="travel-id" className="text-sm font-medium text-foreground">
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
                  data?.arrivalDate ? new Date(data.arrivalDate).toISOString().split("T")[0] : ""
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
                  <td className="px-4 py-2 text-sm text-foreground">{data?.days || "-"}</td>
                  <td className="px-4 py-2 text-sm text-foreground">{data?.km || "-"}</td>
                  <td className="px-4 py-2 text-sm text-foreground">
                    {data?.currency && data?.currency === "IDR"
                      ? `Rp ${data.travelCost?.toLocaleString("id-ID")}`
                      : "$" + (data.travelCost?.toLocaleString("en-US") || "-")}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

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
        </form>
      </Card.Content>
    </Card>
  );
}
