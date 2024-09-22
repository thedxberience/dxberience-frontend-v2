"use client";
import React, { useEffect, useState } from "react";
import InfoCard from "@/components/BookingAdmin/InfoCard";
import FilterTabs from "@/components/BookingAdmin/FilterTab";
import BookingTable from "@/components/BookingAdmin/BookingTable";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import { getUrlQueryString } from "@/utils/utils";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import UpdateModal from "@/components/BookingAdmin/UpdateModal";
import axios from "axios";
import { makeRequest } from "@/utils/axios";
import { useRouter } from "next/navigation";

function BookingAdmin() {
  const router = useRouter();
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_ENVIRONMENT !== "local") {
      router.replace("/");
    }
  }, []);

  const queryClient = useQueryClient();

  const [activeFilter, setActiveFilter] = useState("All");
  const [advancedFilter, setAdvancedFilter] = useState(false);
  const [productName, setProductName] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [targetBooking, setTargetBooking] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [confirmationStatus, setConfirmationStatus] = useState(null);
  const [paginationCount, setPaginationCount] = useState(1);

  const { data: bookingQueryData, isFetching: bookingQueryFetching } = useQuery(
    {
      queryKey: [
        "booking-query",
        productName,
        paymentStatus,
        confirmationStatus,
        customerName,
        startDate,
        endDate,
        minAmount,
        maxAmount,
        paginationCount,
      ],

      queryFn: async () => {
        const queryString = getUrlQueryString({
          productName,
          customerName,
          paymentStatus,
          confirmationStatus,
          startDate,
          endDate,
          minAmount,
          maxAmount,
          page: paginationCount,
        });

        console.log(queryString);

        const response = await makeRequest(
          `/booking/dashboard-info?${queryString}`
        );

        console.log(response);
        return response;
      },
    }
  );

  const bookingMutation = useMutation({
    mutationFn: ({ id, data }) => {
      return makeRequest(`/booking/${id}`, {
        method: "PATCH",
        data: data,
      });
    },
    onSuccess: () => {
      // Invalidate the bookings query so it refetches the latest data
      queryClient.invalidateQueries({ queryKey: ["booking-query"] });
    },
  });
  const bookings = [];

  return (
    <div className="flex flex-col bg-[#212121] min-h-[100vh] text-white">
      <div className="px-4 sm:px-20 py-5">
        <h1 className="text-lg font-extrabold py-5">Bookings</h1>
        <div className="flex gap-4 flex-wrap">
          <InfoCard
            title="Total Orders"
            amount={`${bookingQueryData?.totalDocumentsMatchingQuery || 0}/${
              bookingQueryData?.totalDocumentsInCollection || 0
            }`}
          />
          <InfoCard
            title="Total Revenue"
            amount={`AED ${bookingQueryData?.totalRevenue || 0}`}
          />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center px-4 sm:px-20 w-full gap-4 sm:gap-10 border-b-[1px] border-[#333233] text-sm">
        <div className="flex items-center justify-between w-full">
          <div className="flex gap-4 ">
            <FilterTabs
              name="All Orders"
              isActive={activeFilter === "All"}
              onClick={() => {
                setActiveFilter("All");
                setConfirmationStatus(null), setPaymentStatus(null);
              }}
              count={bookingQueryData?.totalDocumentsInCollection || 0}
            />
            <FilterTabs
              name="Pending"
              isActive={activeFilter === "Pending"}
              onClick={() => {
                setActiveFilter("Pending");
                setConfirmationStatus("PENDING"), setPaymentStatus(null);
              }}
              count={bookingQueryData?.pendingCount || 0}
            />
            <FilterTabs
              name="Confirmed"
              isActive={activeFilter === "Confirmed"}
              onClick={() => {
                setActiveFilter("Confirmed");
                setConfirmationStatus("CONFIRMED"), setPaymentStatus(null);
              }}
              count={bookingQueryData?.confirmedCount || 0}
            />
            <FilterTabs
              name="Cancelled"
              isActive={activeFilter === "Cancelled"}
              onClick={() => {
                setActiveFilter("Cancelled");
                setConfirmationStatus("CANCELLED"), setPaymentStatus(null);
              }}
              count={bookingQueryData?.cancelledCount || 0}
            />
            <FilterTabs
              name="Paid"
              isActive={activeFilter === "Paid"}
              onClick={() => {
                setActiveFilter("Paid");
                setPaymentStatus("PAID"), setConfirmationStatus(null);
              }}
              count={bookingQueryData?.paidCount || 0}
            />
            <FilterTabs
              name="Unpaid"
              isActive={activeFilter === "Unpaid"}
              onClick={() => {
                setActiveFilter("Unpaid");
                setPaymentStatus("UNPAID"), setConfirmationStatus(null);
              }}
              count={bookingQueryData?.unpaidCount || 0}
            />
            <FilterTabs
              name="Refund"
              isActive={activeFilter === "Refund"}
              onClick={() => {
                setActiveFilter("Refund");
                setPaymentStatus("REFUND"), setConfirmationStatus(null);
              }}
              count={bookingQueryData?.refundCount || 0}
            />
          </div>
          <div>
            <button
              onClick={() => setAdvancedFilter(!advancedFilter)}
              title="Click to Show advanced Filters"
            >
              {advancedFilter ? (
                <MdExpandLess size={20} />
              ) : (
                <MdExpandMore size={20} />
              )}
            </button>
          </div>
        </div>
      </div>
      <div
        className={`flex flex-col  px-4 sm:px-20 py-3 w-full gap-4 sm:gap-10 border-b-[1px] border-[#333233] text-sm ${
          advancedFilter ? "flex" : "hidden"
        }`}
      >
        <div className="flex gap-4 items-center">
          <input
            type="text"
            placeholder="Search by Product Name/Slug"
            value={productName}
            onChange={(event) => {
              setProductName(event.target.value);
            }}
            className="bg-[#2A2A2A] border border-[#424242] rounded-[4px] p-2 w-full sm:w-[300px]"
          />
        </div>

        <div className="flex gap-4 items-center">
          <input
            type="text"
            placeholder="Search by Customer Name"
            value={customerName}
            onChange={(event) => {
              setCustomerName(event.target.value);
            }}
            className="bg-[#2A2A2A] border border-[#424242] rounded-[4px] p-2 w-full sm:w-[300px]"
          />
        </div>

        <div className="flex gap-4 items-center">
          <div className="flex flex-col">
            <label className="text-xs">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="bg-[#2A2A2A] border border-[#424242] rounded-[4px] p-2"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-xs">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="bg-[#2A2A2A] border border-[#424242] rounded-[4px] p-2"
            />
          </div>
          <button
            onClick={() => {}}
            className="bg-[#424242] px-4 py-2 rounded-[4px] mt-4"
          >
            Apply Date Filter
          </button>
        </div>
        <div className="flex gap-4">
          <div className="flex flex-col">
            <label className="text-xs">Min Amount</label>
            <input
              type="number"
              value={minAmount}
              onChange={(e) => setMinAmount(e.target.value)}
              className="bg-[#2A2A2A] border border-[#424242] rounded-[4px] p-2"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-xs">Max Amount</label>
            <input
              type="number"
              value={maxAmount}
              onChange={(e) => setMaxAmount(e.target.value)}
              className="bg-[#2A2A2A] border border-[#424242] rounded-[4px] p-2"
            />
          </div>
          <button
            onClick={() => {}}
            className="bg-[#424242] px-4 py-2 rounded-[4px] mt-4"
          >
            Apply Amount Filter
          </button>
        </div>
      </div>
      <div className="flex flex-col flex-grow">
        {bookingQueryFetching ? (
          <div className="flex w-full h-[60vh] justify-center items-center">
            <div className="flex flex-row gap-2">
              <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce [animation-delay:.7s]"></div>
              <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce [animation-delay:.3s]"></div>
              <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce [animation-delay:.7s]"></div>
            </div>
          </div>
        ) : (
          <BookingTable
            bookings={bookingQueryData?.documents || []}
            toggleModal={setModalIsOpen}
            setTargetBooking={setTargetBooking}
            paginationCount={paginationCount}
            setPaginationCount={setPaginationCount}
            pageNo={bookingQueryData?.pageNo || 1}
            noOfPages={bookingQueryData?.numberOfPages || 1}
          />
        )}
      </div>
      {modalIsOpen && (
        <UpdateModal
          toggleModal={setModalIsOpen}
          booking={targetBooking}
          bookingMutation={bookingMutation}
        />
      )}
    </div>
  );
}

export default BookingAdmin;
