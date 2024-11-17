import Chatbox from "@components/chatBox";
import Navbar from "@components/navbar";
import { redirect, RedirectType } from "next/navigation";
import { cookies } from "next/headers";
import { ProductStories } from "@components/ProductStories";
// import axios from "axios";
// import { AUTH_API_ENDPOINT } from "@constants/restConstants";

export default async function Home() {
  const cookieStore = cookies();
  const authToken = cookieStore.get("authToken");
  if (!authToken) redirect("/auth/login", RedirectType.replace);

  return (
    <main className="w-[calc(100%-60px)] mx-[30px] h-screen pt-[32px]">
      <Navbar />
      <Chatbox suggestionsPosition="below" />
      <ProductStories />
    </main>
  );
}
