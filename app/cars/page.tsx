import { Suspense } from "react";
import type { Metadata } from "next";
import { getAllCars } from "@/lib/cars";
import CarsClient from "./CarsClient";

export const metadata: Metadata = {
  title: "Cars for Sale — Vahanlok Mumbai",
  description:
    "Browse our full inventory of new and certified pre-owned cars. Filter by brand, fuel type, and budget.",
};

interface PageProps {
  searchParams: Promise<{ type?: string; brand?: string; fuel?: string; budget?: string }>;
}

export default async function CarsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const allCars = getAllCars();

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#1A1A1A]">Cars for Sale</h1>
          <p className="text-gray-500 mt-1">
            {allCars.length} cars available — new and pre-owned
          </p>
        </div>

        <Suspense fallback={<div className="text-gray-400 text-sm">Loading filters…</div>}>
          <CarsClient initialCars={allCars} initialType={params.type} />
        </Suspense>
      </div>
    </main>
  );
}
