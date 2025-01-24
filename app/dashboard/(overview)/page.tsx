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
  const embedUrl = "https://www.youtube.com/embed/xjUw6_LyHT8";
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="flex flex-col items-center justify-center p-4 bg-gray-100 rounded-lg shadow-lg">
        <span className="mb-4 text-lg font-semibold text-gray-700">
          Example Ad
        </span>
        <iframe
          className="w-full h-64 rounded-lg shadow-md transition-transform duration-300 transform hover:scale-105 hover:shadow-xl"
          src={embedUrl}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      <div className="mt-6 grid  max-w-3xl  grid-cols-1 gap-6 lg:grid-cols-8">
        <div className="col-span-6 space-y-6">
          <Suspense fallback={<RevenueChartSkeleton />}>
            <RevenueChart invoiceId={selectedInvoiceId} />
          </Suspense>
          <div className="rounded-xl bg-white p-6 shadow-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Conversion & Performance
            </h2>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-100 p-5 rounded-xl mb-6 shadow-md">
              <div className="space-y-2">
                <p className="text-gray-800">
                  <span className="font-bold text-indigo-800">
                    Views on ad:
                  </span>{" "}
                  0
                </p>
                <p className="text-gray-800">
                  <span className="font-bold text-indigo-800">
                    Clicks on ad:
                  </span>{" "}
                  0
                </p>
                <p className="text-gray-800">
                  <span className="font-bold text-indigo-800">
                    Orders for pick up:
                  </span>{" "}
                  0
                </p>
                <p className="text-gray-800">
                  <span className="font-bold text-indigo-800">
                    Opened in Google Maps:
                  </span>{" "}
                  0 users
                </p>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <button className="bg-indigo-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-indigo-700 hover:shadow-lg transition-all">
                View Detailed Report
              </button>
              <button className="bg-gray-100 text-gray-800 px-5 py-2 rounded-lg shadow-md hover:bg-gray-200 hover:shadow-lg transition-all">
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
