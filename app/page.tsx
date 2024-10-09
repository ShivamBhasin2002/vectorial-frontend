import Chatbox from "@components/chatBox";
import HorizontalList from "@components/horizontalList";
import { Heading } from "@components/indexPageHeading";

export default function Home() {
  return (
    <main className="w-[672px] mx-auto h-screen pt-[80px]">
      <Heading />
      <Chatbox suggestionsPosition="below" />
      <HorizontalList type="chats" />
      <HorizontalList type="products"/>
    </main>
  );
}
