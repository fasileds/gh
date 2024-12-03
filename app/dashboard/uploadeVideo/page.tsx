"use client";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import React, { useState } from "react";
import Porture from "./porture";
import LandScape from "./landScape";
import { DatePicker, Button } from "antd";
import dayjs from "dayjs";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { useVideoContext } from "@/app/context/VideoContext";
import PaymentModal from "@/components/PaymentModal";
import { useAuth } from "@/app/context/AuthContext";

export default function Page() {
  const { user, logout } = useAuth();
  const { RangePicker } = DatePicker;
  const [isModalOpen, setModalOpen] = useState(false);

  const handleProceedToPayment = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const { formData, setFormData } = useVideoContext();
  const [timeRanges, setTimeRanges] = useState<
    Array<[dayjs.Dayjs | null, dayjs.Dayjs | null]>
  >(
    formData.businessHours.length > 0 ? formData.businessHours : [[null, null]]
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleRangeChange = (
    dates: [dayjs.Dayjs | null, dayjs.Dayjs | null] | null,
    index: number
  ) => {
    if (dates) {
      const newTimeRanges = [...timeRanges];
      newTimeRanges[index] = dates;
      setTimeRanges(newTimeRanges);
      setFormData((prevData) => ({
        ...prevData,
        businessHours: newTimeRanges,
      }));
    }
  };
  const addTimeRange = () => {
    setTimeRanges([...timeRanges, [null, null]]);
  };
  const removeTimeRange = (index: number) => {
    const newTimeRanges = timeRanges.filter((_, i) => i !== index);
    setTimeRanges(newTimeRanges);
    setFormData((prevData) => ({ ...prevData, businessHours: newTimeRanges }));
  };
  console.log("the eimale is here", user);
  return (
    <main className="min-h-screen bg-gray-100">
      <Breadcrumbs
        breadcrumbs={[
          { label: "Upload Video", href: "/dashboard/uploadeVideo" },
          {
            label: "Create Video",
            href: "/dashboard/uploadeVideo",
            active: true,
          },
        ]}
      />
      <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg mt-6">
        <div className="flex md:space-x-6 mb-6">
          <Porture />
          <LandScape />
        </div>

        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Video Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
              placeholder="Enter price"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Color
            </label>
            <input
              type="color"
              name="color"
              value={formData.color}
              onChange={handleInputChange}
              className="mt-1 border-none w-full h-10 rounded-md cursor-pointer"
            />
          </div>
        </div>
        <div className="mb-6">
          <label
            htmlFor="restorant"
            className="block text-sm font-medium text-gray-700 mb-2 transition-colors duration-300"
          >
            Restaurant Name
          </label>
          <input
            type="text"
            name="restorant"
            id="restorant"
            value={formData.restorant}
            onChange={handleInputChange}
            placeholder="Enter your restaurant's name"
            className="w-full px-4 py-2 border border-gray-300 focus:border-blue-500 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300"
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
            placeholder="Enter description"
            rows={4}
          ></textarea>
        </div>
        <div className="border-t border-gray-300 mt-6 pt-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Location & Budget
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Street Address
              </label>
              <input
                type="text"
                name="streetAddress"
                value={formData.streetAddress}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                placeholder="Enter street address"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                City
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                placeholder="Enter city"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Country
              </label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                placeholder="Enter country"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Zip Code
              </label>
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                placeholder="Enter zip code"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Search Radius
              </label>
              <input
                type="text"
                name="searchRadius"
                value={formData.searchRadius}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                placeholder="Enter search radius"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Budget
              </label>
              <input
                type="number"
                name="budget"
                value={formData.budget}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                placeholder="Enter budget"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Duration
              </label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                placeholder="Enter duration"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6 p-6 bg-gray-50 rounded-lg shadow-md mt-6">
          <div className="flex flex-col">
            <label className="text-lg font-semibold text-gray-700 mb-2">
              Advertisement Hours:
            </label>
            {timeRanges.map((timeRange, index) => (
              <div key={index} className="flex items-center gap-2 mb-4">
                <RangePicker
                  use12Hours
                  placeholder={["Open Time", "Close Time"]}
                  picker="time"
                  showTime={{ format: "hh:mm a" }}
                  format="hh:mm a"
                  onChange={(dates) => handleRangeChange(dates, index)}
                  value={timeRange}
                  className="mt-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  style={{
                    width: "300px",
                    height: "40px",
                    fontSize: "14px",
                  }}
                />
                <Button
                  type="primary"
                  danger
                  onClick={() => removeTimeRange(index)}
                  className="ml-2"
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button type="dashed" onClick={addTimeRange} className="mt-2">
              Add Time Slot
            </Button>
          </div>

          <div>
            {formData.businessHours.length > 0 ? (
              formData.businessHours.map((time, index) => {
                const startTime = time[0];
                const endTime = time[1];

                const startHour = startTime ? startTime.hour() : 0;
                const endHour = endTime ? endTime.hour() : 0;

                const startPercentage = (startHour / 24) * 100;
                const endPercentage = (endHour / 24) * 100;

                return (
                  <div key={index} className="text-gray-600 mb-4">
                    <div className="flex items-center mb-1">
                      <span>
                        Starts: {startTime ? startTime.format("HH:mm") : "N/A"}
                      </span>
                      <span className="mx-2">|</span>
                      <span>
                        Ends: {endTime ? endTime.format("HH:mm") : "N/A"}
                      </span>
                    </div>
                    <div className="relative w-full h-2 bg-gray-200 rounded-full">
                      {startTime && endTime ? (
                        <div
                          className="absolute h-2 bg-blue-500 rounded-full"
                          style={{
                            left: `${startPercentage}%`,
                            width: `${endPercentage - startPercentage}%`,
                          }}
                        />
                      ) : null}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-gray-500">No time slots added yet.</div>
            )}
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <Button type="primary" onClick={handleProceedToPayment}>
            Proceed to Payment <ArrowRightIcon className="h-5 w-5 inline" />
          </Button>
        </div>
      </div>
      <PaymentModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        buget={formData.budget ? Number(formData.budget) : 0}
      />
    </main>
  );
}
