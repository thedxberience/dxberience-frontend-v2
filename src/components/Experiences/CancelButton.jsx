"use client";
import Image from "next/image";
import React, { forwardRef, useState } from "react";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { makeRequest } from "@/utils/axios";
import { useUserStore } from "@/store/userStore";
import LoadingIcon from "../shared/LoadingIcon";
import { useComponentStore } from "@/store/componentStore";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import CustomButton from "../shared/CustomButton";

const CancelBookingButton = forwardRef(
  ({ isAuthenticated, pan, id, bookingState }, ref) => {
    const [openCancelModal, setOpenCancelModal] = useState(false);

    const user = useUserStore((state) => state.user);

    const filterData = useComponentStore((state) => state.filterData);

    const { mutateAsync, isPending, isError } = useMutation({
      mutationKey: ["cancel booking", id, user?._id],
      mutationFn: async (data) => {
        const cancelBookingReq = await makeRequest(`/booking/${id}`, {
          method: "PATCH",
          data,
        });

        return cancelBookingReq;
      },
    });

    const queryClient = useQueryClient();

    const showCancelBtnStates = ["pending", "confirmed"];

    const handleCancelBooking = async () => {
      const cancelBookingPayload = {
        confirmationStatus: "PENDING CANCELLATION",
      };

      await mutateAsync(cancelBookingPayload);
      await queryClient.refetchQueries({
        queryKey: [
          "bookings",
          user?._id,
          filterData.confirmationStatus,
          filterData.startDate,
          filterData.endDate,
          filterData.sortBy,
        ],
        type: "active",
      });
    };

    return (
      showCancelBtnStates.includes(bookingState.toLowerCase()) &&
      isAuthenticated &&
      pan && (
        <AlertDialog
          open={openCancelModal}
          onOpenChange={(open) => setOpenCancelModal(open)}
        >
          <AlertDialogTrigger>
            <div ref={ref} className="absolute bottom-8 right-3">
              {isPending ? (
                <LoadingIcon />
              ) : (
                <Image
                  src={"/cancel_booking.svg"}
                  alt="cancel booking"
                  width={100}
                  height={100}
                />
              )}
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-white text-black w-[300px] min-h-[300px] lg:w-[832px] lg:min-h-[495px]">
            <AlertDialogHeader className={"flex-center w-full flex-col gap-10"}>
              <div className="flex items-center justify-end w-full">
                <AlertDialogCancel className="rounded-[50%] border-dotted p-2 w-auto h-auto">
                  <Image
                    src="/add.svg"
                    alt="close_btn"
                    width={12}
                    height={12}
                  />
                </AlertDialogCancel>
              </div>
              <AlertDialogTitle className="text-2xl lg:text-5xl text-center font-IvyPresto">
                Cancel Booking
              </AlertDialogTitle>
              <AlertDialogDescription className="text-sm lg:text-lg flex-center-col gap-10 text-center">
                <div>
                  Are you sure you would like to cancel your booking? Our team
                  will reach out to finalize the cancellation.
                </div>
                <CustomButton
                  btnName="Cancel Booking"
                  onClick={handleCancelBooking}
                  invert
                  isPending={isPending}
                />
              </AlertDialogDescription>
            </AlertDialogHeader>
          </AlertDialogContent>
        </AlertDialog>
      )
    );
  }
);

export default CancelBookingButton;
