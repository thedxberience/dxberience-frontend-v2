import { redirect } from "next/navigation";

export default function DashboardPage() {
  // Redirect to home page since login functionality is disabled
  redirect("/");
}
