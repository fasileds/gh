"use client";
import CardWrapper from "@/app/ui/dashboard/cards";
import RevenueChart from "@/app/ui/dashboard/revenue-chart";
import LatestInvoices from "@/app/ui/dashboard/latest-invoices";
import PaymentSave from "../paymentSave/page";
import { lusitana } from "@/app/ui/fonts";

import { Suspense, useState } from "react";
import {
  RevenueChartSkeleton,
  LatestInvoicesSkeleton,
  CardsSkeleton,
} from "@/app/ui/skeletons";
import TheSesionOne from "./theSesionOne";
import { useSession } from "next-auth/react";

export default async function Page() {
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<string | null>(
    null
  );
  const { data: session } = useSession();
  console.log("the user from dashboard", session?.user);
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>
      <div className="mt-6 grid  max-w-3xl  grid-cols-1 gap-6 lg:grid-cols-8">
        <div className="col-span-6 space-y-6">
          <Suspense fallback={<RevenueChartSkeleton />}>
            <RevenueChart invoiceId={selectedInvoiceId} />
          </Suspense>
          <div className="rounded-xl bg-gray-50 p-4 shadow-md">
            <h2 className="text-lg font-semibold mb-2">
              Conversion & Performance
            </h2>
            <div className="bg-gradient-to-r from-blue-100 to-indigo-200 p-4 rounded-lg mb-4 shadow-sm">
              <h3 className="text-base font-medium text-blue-900">
                Conversion Performance
              </h3>
              <p className="text-gray-700 mt-2">
                <span className="font-semibold">Per Click:</span> $0
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Total Conversions:</span> 0
              </p>
            </div>
            <div className="bg-gradient-to-r from-green-100 to-teal-200 p-4 rounded-lg mb-4 shadow-sm">
              <h3 className="text-base font-medium text-green-900">
                Manual Performance
              </h3>
              <p className="text-gray-700 mt-2">
                <span className="font-semibold">Reach:</span> 0 users
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Impressions:</span> 0
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">CTR:</span> 0.0%
              </p>
            </div>
            <div className="flex justify-between items-center mt-4">
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all">
                View Detailed Report
              </button>
              <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-all">
                Refresh Data
              </button>
            </div>
          </div>
        </div>
        <div className="col-span-2">
          <Suspense fallback={<LatestInvoicesSkeleton />}>
            <LatestInvoices onInvoiceSelect={setSelectedInvoiceId} />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
