"use client";
import React, { useState, useRef } from "react";
import { MdExpandMore, MdExpandLess } from "react-icons/md";

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
    <div
      className={`cursor-pointer flex gap-2 justify-center items-center px-4 py-2  ${
        isActive ? "border-b-[1px] border-[#5580b5]" : "border-[#333233]"
      }`}
      onClick={onClick}
    >
      <span className={`${isActive ? "text-[#5580b5]" : ""}`}>{name}</span>
      <div
        className={`${
          isActive ? "bg-[#0d4ce9]" : ""
        } px-2 py-[2px] rounded-[2px] text-xs`}
      >
        {count}
      </div>
    </div>
  );
}

function PaymentStatusItem({ status = "UNPAID" }) {
  const getStatusColor = () => {
    let colorString;
    switch (status) {
      case "UNPAID":
        colorString = "bg-[#4D5761]";
        break;
      case "PAID":
        colorString = "bg-[#0c7135]";
        break;
      case "REFUND":
        colorString = "bg-[#4D5761]";
        break;
      default:
        colorString = "bg-[#4D5761]";
        break;
    }
    return colorString;
  };
  return (
    <span className={`${getStatusColor()} px-2 py-1 rounded-md`}>
      {status.charAt(0).toUpperCase() +
        status.slice(1, status.length).toLowerCase()}
    </span>
  );
}

const BookingTable = ({ bookings, updateBookingStatus }) => {
  const handleStatusChange = (bookingId, newStatus) => {
    updateBookingStatus(bookingId, { status: newStatus });
  };
  const handlePaymentStatusChange = (bookingId, newStatus) => {
    updateBookingStatus(bookingId, { paymentStatus: newStatus });
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
            <th className="py-4 px-6 border-b border-[#333233]">Price</th>
            <th className="py-4 px-6 border-b border-[#333233]">
              PaymentStatus
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
                {booking.price}
              </td>
              <td className="border-b border-[#333233] py-3 px-6">
                <select
                  value={booking.paymentStatus.toLowerCase()}
                  onChange={(e) =>
                    handlePaymentStatusChange(booking.bookingId, e.target.value)
                  }
                  className="bg-[#2A2A2A] border border-[#424242] rounded-[4px] p-2"
                >
                  <option value="unpaid">Unpaid</option>
                  <option value="paid">Paid</option>
                  <option value="refund">Refund</option>
                </select>
              </td>

              <td className="border-b border-[#333233] py-3 px-6">
                <a
                  className="text-blue-600"
                  href={`${window.location.protocol}//${window.location.host}/events/${booking.productSlug}`}
                  target="_blank"
                >
                  {booking.productName}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

function BookingAdmin() {
  const bookings = [
    {
      bookingId: "A12345",
      createdAt: "2023-09-01T09:00:00Z",
      status: "Confirmed",
      price: "1000",
      customerName: "Alice Johnson",
      productName: "Luxury Villa Rental",
      paymentStatus: "PAID",
      productSlug: "nz-custom-164ft-or-jacuzzi",
    },
    {
      bookingId: "B67890",
      createdAt: "2023-09-02T14:30:00Z",
      status: "Pending",
      price: "1000",
      customerName: "Bob Smith",
      productName: "Private Jet Charter",
      paymentStatus: "unpaid",
      productslug: "nz-custom-164ft-or-jacuzzi",
    },
    {
      bookingId: "C13579",
      createdAt: "2023-09-03t16:00:00z",
      price: "2000",
      status: "cancelled",
      customerName: "charlie davis",
      productName: "yacht rental",
      paymentStatus: "refund",
      productslug: "nz-custom-164ft-or-jacuzzi",
    },
  ];
  const [filteredbookings, setFilteredBookings] = useState(bookings);
  const [activeFilter, setActiveFilter] = useState("All");
  const [productName, setProductName] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [endDate, setEndDate] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");

  const [advancedFilter, setAdvancedFilter] = useState(false);

  const updateBookingStatus = (bookingId, data) => {
    setBookings((prevBookings) =>
      prevBookings.map((booking) =>
        booking.bookingId === bookingId ? { ...booking, ...data } : booking
      )
    );
  };

  const handleFilter = (status) => {
    setActiveFilter(status);
    filterBookings({
      productName,
      paymentStatus,
      activeFilter,
      customerName,
      startDate,
      endDate,
      minAmount,
      maxAmount,
    });
  };

  const handleCustomerNameFilter = (event) => {
    const value = event.target.value.toLowerCase();
    setCustomerName(value);
    filterBookings({
      productName,
      activeFilter,
      customerName: value,
      startDate,
      endDate,
      minAmount,
      maxAmount,
    });
  };

  const handleProductNameFilter = (event) => {
    const value = event.target.value.toLowerCase();
    setProductName(value);
    filterBookings({
      productName: value,
      paymentStatus,
      activeFilter,
      customerName,
      startDate,
      endDate,
      minAmount,
      maxAmount,
    });
  };

  const handleDateFilter = () => {
    filterBookings({
      productName,
      paymentStatus,
      activeFilter,
      customerName,
      startDate,
      endDate,
      minAmount,
      maxAmount,
    });
  };

  const handleAmountFilter = () => {
    filterBookings({
      productName,
      activeFilter,
      customerName,
      startDate,
      endDate,
      minAmount,
      maxAmount,
    });
  };

  const filterBookings = ({
    productName,
    paymentStatus,
    activeFilter,
    customerName,
    startDate,
    endDate,
    minAmount,
    maxAmount,
  }) => {
    let filtered = bookings;

    if (activeFilter !== "All") {
      filtered = filtered.filter((booking) => booking.status === activeFilter);
    }

    if (customerName) {
      console.log("called", filtered);
      filtered = filtered.filter((booking) =>
        booking.customerName.toLowerCase().includes(customerName)
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

    if (paymentStatus) {
      filtered = filtered.filter((booking) =>
        booking.paymentStatus.toLowerCase().includes(paymentStatus)
      );
    }

    if (productName) {
      console.log(productName);
      filtered = filtered.filter((booking) => {
        console.log(booking.productName);
        return (
          booking.productName.toLowerCase().includes(productName) ||
          booking.productSlug.toLowerCase().includes(productName)
        );
      });
    }

    if (minAmount) {
      filtered = filtered.filter(
        (booking) => parseFloat(booking.price) >= parseFloat(minAmount)
      );
    }

    if (maxAmount) {
      filtered = filtered.filter(
        (booking) => parseFloat(booking.price) <= parseFloat(maxAmount)
      );
    }

    const newBookingsArray = filtered;

    setFilteredBookings(newBookingsArray);
  };

  return (
    <div className="bg-[#212121] min-h-[100vh] text-white">
      <div className="px-4 sm:px-20 py-5">
        <h1 className="text-lg font-extrabold py-5">Bookings</h1>
        <div className="flex gap-4 flex-wrap">
          <InfoCard title="Total Orders" amount={bookings.length.toString()} />
          <InfoCard
            title="Total Revenue"
            amount={`AED ${bookings.reduce((acc, booking) => {
              return acc + Number(booking.price);
            }, 0)}`}
          />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center px-4 sm:px-20 w-full gap-4 sm:gap-10 border-b-[1px] border-[#333233] text-sm">
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
          <FilterButton
            name="Paid"
            isActive={activeFilter === "Paid"}
            onClick={() => handleFilter("Paid")}
            count={bookings.filter((b) => b.status === "Paid").length}
          />

          <FilterButton
            name="Unpaid"
            isActive={activeFilter === "Unpaid"}
            onClick={() => handleFilter("Unpaid")}
            count={bookings.filter((b) => b.status === "Unpaid").length}
          />

          <FilterButton
            name="Refund"
            isActive={activeFilter === "Refund"}
            onClick={() => handleFilter("Refund")}
            count={bookings.filter((b) => b.status === "Unpaid").length}
          />
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
            onChange={handleProductNameFilter}
            className="bg-[#2A2A2A] border border-[#424242] rounded-[4px] p-2 w-full sm:w-[300px]"
          />
        </div>

        <div className="flex gap-4 items-center">
          <input
            type="text"
            placeholder="Search by Customer Name"
            value={customerName}
            onChange={handleCustomerNameFilter}
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
          bookings={filteredbookings}
          updateBookingStatus={updateBookingStatus}
        />
      </div>
    </div>
  );
}

export default BookingAdmin;
