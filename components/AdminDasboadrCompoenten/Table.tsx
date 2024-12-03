import { BRAND } from "@/types/brand";
import Image from "next/image";

const brandData: BRAND[] = [
  {
    logo: "/images/brand/brand-01.svg",
    name: "Google",
    visitors: 3.5,
    revenues: "5,768",
    sales: 590,
    conversion: 4.8,
  },
  {
    logo: "/images/brand/brand-02.svg",
    name: "X.com",
    visitors: 2.2,
    revenues: "4,635",
    sales: 467,
    conversion: 4.3,
  },
  {
    logo: "/images/brand/brand-03.svg",
    name: "Github",
    visitors: 2.1,
    revenues: "4,290",
    sales: 420,
    conversion: 3.7,
  },
  {
    logo: "/images/brand/brand-04.svg",
    name: "Vimeo",
    visitors: 1.5,
    revenues: "3,580",
    sales: 389,
    conversion: 2.5,
  },
  {
    logo: "/images/brand/brand-05.svg",
    name: "Facebook",
    visitors: 1.2,
    revenues: "2,740",
    sales: 230,
    conversion: 1.9,
  },
];

const TableOne = () => {
  return (
    <div className="rounded-[10px] bg-white px-7.5 pb-4 pt-7.5 shadow-2xl dark:bg-gray-dark dark:shadow-xl p-6">
      <h4 className="mb-6 text-2xl font-bold text-dark ">Top Channels</h4>

      <div className="flex flex-col">
        {/* Header row */}
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 mb-4 px-2">
          <div className="text-sm font-semibold uppercase text-gray-600 dark:text-gray-400">
            Source
          </div>
          <div className="text-sm font-semibold uppercase text-center text-gray-600 dark:text-gray-400">
            Visitors
          </div>
          <div className="text-sm font-semibold uppercase text-center text-gray-600 dark:text-gray-400">
            Revenues
          </div>
          <div className="hidden text-sm font-semibold uppercase text-center text-gray-600 dark:text-gray-400 sm:block">
            Sales
          </div>
          <div className="hidden text-sm font-semibold uppercase text-center text-gray-600 dark:text-gray-400 sm:block">
            Conversion
          </div>
        </div>

        {/* Data rows */}
        {brandData.map((brand, key) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-5 gap-4 px-2 py-4 transition-transform duration-200 hover:scale-105 ${
              key === brandData.length - 1
                ? ""
                : "border-b border-gray-200 dark:border-dark-3"
            }`}
            key={key}
          >
            {/* Brand Logo and Name */}
            <div className="flex items-center gap-3.5">
              <div className="flex-shrink-0">
                <Image src={brand.logo} alt="Brand" width={48} height={48} />
              </div>
              <p className="font-medium text-dark  sm:block">{brand.name}</p>
            </div>

            {/* Visitors */}
            <div className="flex items-center justify-center">
              <p className="font-medium text-dark ">{brand.visitors}K</p>
            </div>

            {/* Revenues */}
            <div className="flex items-center justify-center">
              <p className="font-medium text-green-500">${brand.revenues}</p>
            </div>

            {/* Sales */}
            <div className="hidden sm:flex items-center justify-center">
              <p className="font-medium text-dark ">{brand.sales}</p>
            </div>

            {/* Conversion Rate */}
            <div className="hidden sm:flex items-center justify-center">
              <p className="font-medium text-dark ">{brand.conversion}%</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableOne;
