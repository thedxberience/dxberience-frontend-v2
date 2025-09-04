"use client";
import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookingFormSchema } from "@/schemas/bookingFormSchema";
import FormInput from "./FormInput";
import { useComponentStore } from "@/store/componentStore";
import { FaWhatsapp } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";
import { makeRequest } from "@/utils/axios";

const WhatsAppModal = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showBookingStatus, setShowBookingStatus] = useState(false);

  const {
    openWhatsAppModal,
    setOpenWhatsAppModal,
    whatsAppLink,
    whatsAppBookingContext,
    setWhatsAppBookingContext,
  } = useComponentStore((state) => ({
    openWhatsAppModal: state.openWhatsAppModal,
    setOpenWhatsAppModal: state.setOpenWhatsAppModal,
    whatsAppLink: state.whatsAppLink,
    whatsAppBookingContext: state.whatsAppBookingContext,
    setWhatsAppBookingContext: state.setWhatsAppBookingContext,
  }));

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const watchedFields = watch();

  // Booking mutation for when booking context is provided
  const {
    mutateAsync: submitBooking,
    isPending: isBookingPending,
    isError: isBookingError,
    error: bookingError,
    isSuccess: isBookingSuccess,
  } = useMutation({
    mutationKey: ["create-whatsapp-booking"],
    mutationFn: async (data) => {
      const request = await makeRequest("/booking", {
        method: "POST",
        data: data,
      });
      setShowBookingStatus(true);
      return request;
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      // If booking context is provided, submit booking first
      if (whatsAppBookingContext) {
        // Get the referral code from the cookie
        const referralCode = document.cookie
          .split("; ")
          .find((row) => row.startsWith("referral="))
          ?.split("=")[1];

        const bookingPayload = {
          customerName: data.name,
          customerEmail: data.email,
          customerPhone: data.phone,
          productName: whatsAppBookingContext.productName,
          productSlug: window.location.href,
          productPrice: whatsAppBookingContext.productPrice ?? 0,
          partnerId: whatsAppBookingContext.affiliateId
            ? whatsAppBookingContext.affiliateId
            : "",
          referralCode: referralCode ? referralCode : "",
        };

        // Submit booking
        await submitBooking(bookingPayload);
      }

      // Close the modal
      setOpenWhatsAppModal(false);

      // Clear booking context
      setWhatsAppBookingContext(null);
      setShowBookingStatus(false);

      // Reset form
      reset();

      // Open WhatsApp link
      if (whatsAppLink) {
        window.open(whatsAppLink, "_blank");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setOpenWhatsAppModal(false);
    setWhatsAppBookingContext(null);
    setShowBookingStatus(false);
    reset();
  };

  return (
    <AlertDialog
      open={openWhatsAppModal}
      onOpenChange={(open) => {
        if (!open) {
          handleClose();
        }
      }}
    >
      <AlertDialogContent className="max-w-md">
        <div className="flex items-center justify-end">
          <AlertDialogCancel
            className="rounded-[50%] border-dotted p-2 w-auto h-auto"
            onClick={handleClose}
          >
            <Image src="/close.svg" alt="close_btn" width={12} height={12} />
          </AlertDialogCancel>
        </div>

        <AlertDialogHeader>
          <AlertDialogTitle className="font-IvyPresto text-2xl lg:text-3xl mb-4 text-center">
            Connect with Us
          </AlertDialogTitle>
          <AlertDialogDescription>
            <div className="flex flex-col items-center mb-6">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4">
                <FaWhatsapp className="text-white w-6 h-6" />
              </div>
              <p className="text-center text-gray-600 text-sm">
                Please provide your details so we can assist you better on
                WhatsApp
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {isBookingError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-red-600 text-sm text-center">
                    {bookingError?.message ||
                      "Failed to create booking. Please try again."}
                  </p>
                </div>
              )}

              <div className="space-y-4">
                <FormInput
                  name="name"
                  placeholder="Full Name"
                  inputType="text"
                  register={register}
                  errors={errors}
                  value={watchedFields.name || ""}
                  invertText={true}
                />

                <FormInput
                  name="email"
                  placeholder="Email Address"
                  inputType="text"
                  register={register}
                  errors={errors}
                  value={watchedFields.email || ""}
                  invertText={true}
                />

                <FormInput
                  name="phone"
                  placeholder="Phone Number"
                  inputType="tel"
                  register={register}
                  setValue={setValue}
                  errors={errors}
                  value={watchedFields.phone || ""}
                  invertText={true}
                />
              </div>

              <div className="flex flex-col gap-3 pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting || isBookingPending}
                  className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-md font-medium transition-colors"
                >
                  {isSubmitting || isBookingPending ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      {whatsAppBookingContext
                        ? "Creating Booking..."
                        : "Processing..."}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <FaWhatsapp className="text-white w-6 h-6" />
                      {whatsAppBookingContext
                        ? "Book & Continue to WhatsApp"
                        : "Continue to WhatsApp"}
                    </div>
                  )}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  className="w-full py-3 rounded-md font-medium"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default WhatsAppModal;
