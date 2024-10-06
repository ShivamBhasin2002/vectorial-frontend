import Chatbox from "@components/chat";
import { Heading } from "@components/indexPageHeading";
import Navbar from "@components/navbar";

export default function Home() {
  return (
    <div className="w-screen h-screen font-[family-name:var(--font-geist-sans)]">
      <Navbar />
      <main className="w-[672px] mx-auto h-screen pt-[80px]">
        <Heading />
        <Chatbox suggestionsPosition="below" />
      </main>
    </div>
  );
}
