import { IoIosClose } from "react-icons/io";
import { useState } from "react";
function UpdateModal({ toggleModal, booking, bookingMutation }) {
  const [paymentStatus, setPaymentStatus] = useState(booking.paymentStatus);
  const [confirmationStatus, setConfirmationStatus] = useState(
    booking.confirmationStatus
  );

  function applyChanges() {
    bookingMutation.mutate({
      id: booking._id,
      data: { confirmationStatus, paymentStatus },
    });
    toggleModal(false);
  }

  return (
    <>
      <div className="absolute flex flex-col top-0 justify-center items-center w-[100vw] h-screen  z-10">
        <div className="relative flex flex-col bg-[#212121] p-10 gap-4 rounded-sm">
          <IoIosClose
            size={30}
            className="absolute top-4 right-4"
            onClick={() => toggleModal(false)}
          />
          <div className="flex flex-col">
            <span>ID: {booking._id}</span>
            <span>Product Name: {booking.productName}</span>
            <span>Customer Name: {booking.customerName}</span>
            <span>Phone: {booking.customerPhone}</span>
            <span>Price: {booking.productPrice}</span>
            <span>No Of Tickets: {booking.noOfTickets}</span>
          </div>
          <div className="text-gray-400 max-w-96">
            Booking for {booking.noOfTickets}{" "}
            {booking.noOfTickets > 1 ? "tickets" : "ticket"} for{" "}
            {booking.productName}, was made on{" "}
            {new Date(booking.date).toDateString()}{" "}
            {booking.time && `with a reservation by ${booking.time}`}
          </div>

          <div className="flex gap-2 justify-between">
            <label htmlFor="confirmationStatus"> ConfirmationStatus</label>
            <select
              value={confirmationStatus}
              onChange={(e) => {
                setConfirmationStatus(e.target.value);
              }}
              className="bg-[#2A2A2A] border border-[#424242] rounded-[4px] p-2"
            >
              <option value="PENDING">Pending</option>
              <option value="CONFIRMED">Confirmed</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>
          <div className="flex gap-2 justify-between">
            <label htmlFor="paymentStatus"> PaymentStatus</label>
            <select
              value={paymentStatus}
              onChange={(e) => {
                setPaymentStatus(e.target.value);
              }}
              className="bg-[#2A2A2A] border border-[#424242] rounded-[4px] p-2"
            >
              <option value="UNPAID">Unpaid</option>
              <option value="PAID">Paid</option>
              <option value="REFUND">Refund</option>
            </select>
          </div>

          <button
            className="bg-green-600 w-full p-2 rounded-sm"
            onClick={applyChanges}
          >
            Apply Changes
          </button>
          <span className="text-xs text-center text-gray-400">
            **Note applying changes will send an email to the customer
          </span>
        </div>
      </div>
      <div className="absolute top-0 bg-[#000000c0] w-[100vw] h-screen z-5"></div>
    </>
  );
}
export default UpdateModal;
