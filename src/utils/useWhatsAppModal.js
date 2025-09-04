"use client";
import { useComponentStore } from "@/store/componentStore";

/**
 * Hook for opening WhatsApp modal with optional booking functionality
 *
 * Usage examples:
 *
 * // Simple WhatsApp contact (no booking)
 * const { openWhatsAppModal } = useWhatsAppModal();
 * openWhatsAppModal("https://wa.me/+971585787558");
 *
 * // With booking context
 * const { openWhatsAppModal } = useWhatsAppModal();
 * openWhatsAppModal("https://wa.me/+971585787558", {
 *   productName: "Luxury Yacht Experience",
 *   productSlug: "luxury-yacht-dubai",
 *   productPrice: 2500,
 *   affiliateId: "partner123"
 * });
 */
export const useWhatsAppModal = () => {
  const { setOpenWhatsAppModal, setWhatsAppLink, setWhatsAppBookingContext } =
    useComponentStore((state) => ({
      setOpenWhatsAppModal: state.setOpenWhatsAppModal,
      setWhatsAppLink: state.setWhatsAppLink,
      setWhatsAppBookingContext: state.setWhatsAppBookingContext,
    }));

  const openWhatsAppModal = (link, bookingContext = null) => {
    // Set the WhatsApp link and open the modal
    setWhatsAppLink(link || "https://wa.me/+971585787558");

    // Set booking context if provided
    if (bookingContext) {
      setWhatsAppBookingContext(bookingContext);
    }

    setOpenWhatsAppModal(true);
  };

  return {
    openWhatsAppModal,
  };
};
