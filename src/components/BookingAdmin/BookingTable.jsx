"use client";
import Link from "next/link";
import StatusDiv from "./StatusDiv";
import { MdModeEdit } from "react-icons/md";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { useState } from "react";

function BookingTable({
  bookings,
  toggleModal,
  setTargetBooking,
  paginationCount,
  pageNo,
  setPaginationCount,
  noOfPages,
}) {
  const [paginationInput, setPaginationInput] = useState(false);

  const handlePageinationInput = (e) => {
    e.preventDefault();

    const inputValue = e.target.value;
    let inputPageNo = parseInt(inputValue);
    // console.log(e);
    // console.log(`Input is ${inputPageNo}`);

    if (paginationCount < noOfPages && inputPageNo > 0) {
      if (inputPageNo !== NaN) {
        setPaginationCount(e.target.value);
      }
    }
    setPaginationInput(false);
  };

  return (
    <div className="flex flex-col flex-grow overflow-x-auto text-sm justify-around">
      <div className="flex flex-grow-0">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="py-4 px-6 border-b border-[#333233]">
                Booking ID
              </th>
              <th className="py-4 px-6 border-b border-[#333233]">
                Created At
              </th>
              <th className="py-4 px-6 border-b border-[#333233]">Status</th>
              <th className="py-4 px-6 border-b border-[#333233]">
                Customer Name
              </th>
              <th className="py-4 px-6 border-b border-[#333233]">Price</th>
              <th className="py-4 px-6 border-b border-[#333233]">
                PaymentStatus
              </th>

              <th className="py-4 px-6 border-b border-[#333233]">
                Product Name
              </th>
              <th className="py-4 px-6 border-b border-[#333233]"></th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.bookingId} className="text-center">
                <td className="border-b border-[#333233] py-3 px-6">
                  {booking._id}
                </td>
                <td className="border-b border-[#333233] py-3 px-6">
                  {new Date(booking.createdAt).toLocaleDateString()}
                </td>
                <td className="border-b border-[#333233] py-3 px-6">
                  <StatusDiv
                    data={booking.confirmationStatus}
                    mapping={{
                      pending: "bg-[#4d5761]",
                      confirmed: "bg-[#0c7135]",
                      cancelled: "bg-[#4d5761]",
                    }}
                  />
                </td>

                <td className="border-b border-[#333233] py-3 px-6">
                  {booking.customerName}
                </td>
                <td className="border-b border-[#333233] py-3 px-6">
                  {booking.productPrice}
                </td>
                <td className="border-b border-[#333233] py-3 px-6">
                  <StatusDiv
                    data={booking.paymentStatus}
                    mapping={{
                      unpaid: "bg-[#4d5761]",
                      paid: "bg-[#0c7135]",
                      refund: "bg-[#4d5761]",
                    }}
                  />
                </td>

                <td className="border-b border-[#333233] py-3 px-6">
                  <Link
                    className="text-blue-600"
                    href={`/events/${booking.productSlug}`}
                    target="_blank"
                  >
                    {booking.productName}
                  </Link>
                </td>

                <td className="border-b border-[#333233] py-3 px-6">
                  <MdModeEdit
                    onClick={() => {
                      setTargetBooking(booking);
                      toggleModal(true);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-20 w-full flex justify-center items-center gap-4">
        <IoChevronBack
          color={`${paginationCount == 1 ? "grey" : "white"}`}
          onClick={() => {
            if (paginationCount > 1) {
              setPaginationCount(paginationCount - 1);
            }
          }}
          className={`text-2xl ${
            paginationCount == 1 ? "cursor-not-allowed" : "cursor-pointer"
          }  `}
        />{" "}
        <span>
          PAGE{" "}
          <span onClick={() => setPaginationInput(true)}>
            {paginationInput ? (
              <input
                // value={paginationCount}
                onChange={handlePageinationInput}
                // placeholder="page no"
                className="bg-transparent border border-black px-1 mx-2 w-6 text-white"
              />
            ) : (
              <span className="border cursor-pointer border-black px-2 py-1 mx-2">
                {pageNo || paginationCount}
              </span>
            )}
          </span>{" "}
          OF
          <span className="mx-2">{noOfPages}</span>
        </span>{" "}
        <IoChevronForward
          color={`${paginationCount >= noOfPages ? "grey" : "white"}`}
          onClick={() => {
            if (paginationCount < noOfPages) {
              setPaginationCount(paginationCount + 1);
            }
          }}
          className={`text-2xl ${
            paginationCount >= noOfPages
              ? "cursor-not-allowed"
              : "cursor-pointer"
          }`}
        />
      </div>
    </div>
  );
}

export default BookingTable;
