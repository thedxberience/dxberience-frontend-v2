import { redirect } from "next/navigation";

export default function ResetPasswordPage() {
  // Redirect to home page since login functionality is disabled
  redirect("/");
}
