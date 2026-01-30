import { redirect } from "next/navigation";

export default function Home() {
  // This forces the site to jump past the boilerplate
  // and load your actual HOA content.
  redirect("/client/payments");
}