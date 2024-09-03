"use client";
import React, { useState, useRef } from "react";

function InfoCard({ title = "none", amount = "112" }) {
  return (
    <div className="flex flex-col w-full sm:w-[200px] bg-[#2A2A2A] rounded-[4px] px-5 py-4">
      <span className="text-sm">{title}</span>
      <span className="text-lg font-semibold">{amount}</span>
    </div>
  );
}

function FilterButton({ name, count = 0, isActive, onClick }) {
  return (
    <button
      className={`flex gap-2 justify-center items-center px-4 py-2 rounded-[4px] ${
        isActive ? "bg-[#424242]" : "bg-[#333233]"
      }`}
      onClick={onClick}
    >
      <span>{name}</span>
      <div className="bg-[#2A2A2A] px-2 py-[2px] rounded-[2px] text-xs">
        {count}
      </div>
    </button>
  );
}

const BookingTable = ({ bookings, updateBookingStatus }) => {
  const handleStatusChange = (bookingId, newStatus) => {
    updateBookingStatus(bookingId, newStatus);
  };

  return (
    <div className="overflow-x-auto text-sm">
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="py-4 px-6 border-b border-[#333233]">Booking ID</th>
            <th className="py-4 px-6 border-b border-[#333233]">Created At</th>
            <th className="py-4 px-6 border-b border-[#333233]">Status</th>
            <th className="py-4 px-6 border-b border-[#333233]">
              Customer Name
            </th>
            <th className="py-4 px-6 border-b border-[#333233]">
              Product Name
            </th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.bookingId} className="text-center">
              <td className="border-b border-[#333233] py-3 px-6">
                {booking.bookingId}
              </td>
              <td className="border-b border-[#333233] py-3 px-6">
                {new Date(booking.createdAt).toLocaleDateString()}
              </td>
              <td className="border-b border-[#333233] py-3 px-6">
                <select
                  value={booking.status}
                  onChange={(e) =>
                    handleStatusChange(booking.bookingId, e.target.value)
                  }
                  className="bg-[#2A2A2A] border border-[#424242] rounded-[4px] p-2"
                >
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </td>
              <td className="border-b border-[#333233] py-3 px-6">
                {booking.customerName}
              </td>
              <td className="border-b border-[#333233] py-3 px-6">
                {booking.productName}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

function BookingAdmin() {
  const [bookings, setBookings] = useState([
    {
      bookingId: "A12345",
      createdAt: "2023-09-01T09:00:00Z",
      status: "Confirmed",
      customerName: "Alice Johnson",
      productName: "Luxury Villa Rental",
    },
    {
      bookingId: "B67890",
      createdAt: "2023-09-02T14:30:00Z",
      status: "Pending",
      customerName: "Bob Smith",
      productName: "Private Jet Charter",
    },
    {
      bookingId: "C13579",
      createdAt: "2023-09-03T16:00:00Z",
      status: "Cancelled",
      customerName: "Charlie Davis",
      productName: "Yacht Rental",
    },
  ]);
  const [filteredBookings, setFilteredBookings] = useState(bookings);
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");

  const [advancedFilter, setAdvancedFilter] = useState(false);

  const updateBookingStatus = (bookingId, newStatus) => {
    setBookings((prevBookings) =>
      prevBookings.map((booking) =>
        booking.bookingId === bookingId
          ? { ...booking, status: newStatus }
          : booking
      )
    );
  };

  const handleFilter = (status) => {
    setActiveFilter(status);
    filterBookings(
      status,
      searchTerm,
      startDate,
      endDate,
      minAmount,
      maxAmount
    );
  };

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    filterBookings(
      activeFilter,
      value,
      startDate,
      endDate,
      minAmount,
      maxAmount
    );
  };

  const handleDateFilter = () => {
    filterBookings(
      activeFilter,
      searchTerm,
      startDate,
      endDate,
      minAmount,
      maxAmount
    );
  };

  const handleAmountFilter = () => {
    filterBookings(
      activeFilter,
      searchTerm,
      startDate,
      endDate,
      minAmount,
      maxAmount
    );
  };

  const filterBookings = (
    status,
    searchTerm,
    startDate,
    endDate,
    minAmount,
    maxAmount
  ) => {
    let filtered = bookings;

    if (status !== "All") {
      filtered = filtered.filter((booking) => booking.status === status);
    }

    if (searchTerm) {
      filtered = filtered.filter((booking) =>
        booking.customerName.toLowerCase().includes(searchTerm)
      );
    }

    if (startDate) {
      filtered = filtered.filter(
        (booking) => new Date(booking.createdAt) >= new Date(startDate)
      );
    }

    if (endDate) {
      filtered = filtered.filter(
        (booking) => new Date(booking.createdAt) <= new Date(endDate)
      );
    }

    if (minAmount) {
      filtered = filtered.filter(
        (booking) => parseFloat(booking.amount) >= parseFloat(minAmount)
      );
    }

    if (maxAmount) {
      filtered = filtered.filter(
        (booking) => parseFloat(booking.amount) <= parseFloat(maxAmount)
      );
    }

    setFilteredBookings(filtered);
  };

  return (
    <div className="bg-[#212121] min-h-[100vh] text-white">
      <div className="px-4 sm:px-20 py-5">
        <h1 className="text-lg font-extrabold py-5">Bookings</h1>
        <div className="flex gap-4 flex-wrap">
          <InfoCard title="Total Orders" amount={bookings.length.toString()} />
          <InfoCard title="Total Revenue" amount="$2002.46" />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center px-4 sm:px-20 py-3 w-full gap-4 sm:gap-10 border-b-[1px] border-[#333233] text-sm">
        <div className="flex gap-4">
          <FilterButton
            name="All Orders"
            isActive={activeFilter === "All"}
            onClick={() => handleFilter("All")}
            count={bookings.length}
          />
          <FilterButton
            name="Pending"
            isActive={activeFilter === "Pending"}
            onClick={() => handleFilter("Pending")}
            count={bookings.filter((b) => b.status === "Pending").length}
          />
          <FilterButton
            name="Confirmed"
            isActive={activeFilter === "Confirmed"}
            onClick={() => handleFilter("Confirmed")}
            count={bookings.filter((b) => b.status === "Confirmed").length}
          />
          <FilterButton
            name="Cancelled"
            isActive={activeFilter === "Cancelled"}
            onClick={() => handleFilter("Cancelled")}
            count={bookings.filter((b) => b.status === "Cancelled").length}
          />

          <button onClick={() => setAdvancedFilter(!advancedFilter)}>
            {advancedFilter ? "Close " : " Open "}Advanced Filter
          </button>
        </div>
        <input
          type="text"
          placeholder="Search by Customer Name"
          value={searchTerm}
          onChange={handleSearch}
          className="bg-[#2A2A2A] border border-[#424242] rounded-[4px] p-2 w-full sm:w-[300px]"
        />
      </div>
      <div
        className={`flex-wrap justify-between items-center px-4 sm:px-20 py-3 w-full gap-4 sm:gap-10 border-b-[1px] border-[#333233] text-sm ${
          advancedFilter ? "flex" : "hidden"
        }`}
      >
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
            onClick={handleDateFilter}
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
            onClick={handleAmountFilter}
            className="bg-[#424242] px-4 py-2 rounded-[4px] mt-4"
          >
            Apply Amount Filter
          </button>
        </div>
      </div>
      <div className="px-4 sm:px-20 py-5">
        <BookingTable
          bookings={filteredBookings}
          updateBookingStatus={updateBookingStatus}
        />
      </div>
    </div>
  );
}

export default BookingAdmin;
