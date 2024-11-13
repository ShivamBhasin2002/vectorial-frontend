import Chatbox from "@components/chatBox";
import HorizontalList from "@components/horizontalList";
import { Heading } from "@components/indexPageHeading";
import Navbar from "@components/navbar";
import { redirect, RedirectType } from "next/navigation";
import { cookies } from "next/headers";
// import axios from "axios";
// import { AUTH_API_ENDPOINT } from "@constants/restConstants";

export default async function Home() {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("authToken");
  if (!authToken) redirect("/auth/login", RedirectType.replace);

  return (
    <main className="w-[672px] mx-auto h-screen pt-[80px]">
      <Navbar />
      <Heading />
      <Chatbox suggestionsPosition="below" />
      <HorizontalList type="chats" />
      <HorizontalList type="products" />
    </main>
  );
}
