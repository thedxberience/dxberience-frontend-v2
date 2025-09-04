import { z } from "zod";
import {
  isPossiblePhoneNumber,
  isValidPhoneNumber,
} from "react-phone-number-input";

export const bookingFormSchema = z.object({
  name: z
    .string()
    .min(1, "Full name is required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .regex(
      /^[a-zA-Z\s'-]+$/,
      "Name can only contain letters, spaces, hyphens, and apostrophes"
    ),

  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .max(100, "Email must be less than 100 characters"),

  phone: z
    .string()
    .min(1, "Phone number is required")
    .refine((value) => {
      if (!value) return false;
      return isPossiblePhoneNumber(value);
    }, "Please enter a valid phone number")
    .refine((value) => {
      if (!value) return false;
      return isValidPhoneNumber(value);
    }, "Please enter a valid phone number"),
});
