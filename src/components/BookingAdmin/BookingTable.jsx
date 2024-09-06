import StatusDiv from "./StatusDiv";
import { MdModeEdit } from "react-icons/md";

function BookingTable({ bookings, toggleModal, setTargetBooking }) {
  return (
    <div className="flex flex-col flex-grow overflow-x-auto text-sm justify-between">
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
                  <a
                    className="text-blue-600"
                    href={`${window.location.protocol}//${window.location.host}/events/${booking.productSlug}`}
                    target="_blank"
                  >
                    {booking.productName}
                  </a>
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

      {/* <div className="px-20 border-t-[1px] bo">
        <span>PAGE 1 OF 24</span>
      </div> */}
    </div>
  );
}

export default BookingTable;
