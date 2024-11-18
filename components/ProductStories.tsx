"use client"
import { LinkIcon } from "@assets/icons/linkIcon";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import React from "react";

type TProductStoryData = {
  heading: string;
  title: string;
  tag: "concern" | "win" | "insight" | "opportunity";
  sources: string[];
  productId: string;
  chatId: string;
};

const productStoryData: TProductStoryData[] = [
  {
    heading:
      "Suki's AI voice transcription speed is slowed by 30% in the last 3 months, and surveys indicate 60% of low satisfaction scores.",
    title: "Voice transcription",
    tag: "concern",
    sources: ["Amplitude", "Interview Transcripts"],
    productId: "323e7207-533b-4fe1-b161-2f68fe8334dc",
    chatId: "f6985d02-3801-4662-81eb-cc359cfd2293",
  },
  {
    heading:
      "EHR editor is getting a really positive response: 95% positive feedback.",
    title: "EHR editor",
    tag: "win",
    sources: ["Survey"],
    productId: "323e7207-533b-4fe1-b161-2f68fe8334dc",
    chatId: "b6437098-c4d2-4312-8b4e-93ea105bf5c8",
  },
  {
    heading:
      "Voice transcription is used on average 20 times a day by one physician.",
    title: "Voice transcription",
    tag: "insight",
    sources: ["Amplitude"],
    productId: "323e7207-533b-4fe1-b161-2f68fe8334dc",
    chatId: "f6985d02-3801-4662-81eb-cc359cfd2293",
  },
  {
    heading:
      "Potential to enhance transcription speed could increase user satisfaction by 40% based on recent feedback.",
    title: "Voice transcription",
    tag: "opportunity",
    sources: ["User Interviews", "Survey Data"],
    productId: "323e7207-533b-4fe1-b161-2f68fe8334dc",
    chatId: "28d808a5-38d6-4551-89af-a2ddebc48915",
  },
  {
    heading:
      "50% of users report issues with auto-save in patient notes, leading to data loss.",
    title: "Patient Notes",
    tag: "concern",
    sources: ["Amplitude", "Support Tickets"],
    productId: "323e7207-533b-4fe1-b161-2f68fe8334dc",
    chatId: "b0f8ef6e-7365-40da-ad41-ff11e7722a1f",
  },
  /*
    Commented out for now as insight is not available for these headlines
  */
  // {
  //   heading:
  //     "Recent update to the EHR interface has led to a 25% reduction in task completion time.",
  //   title: "EHR Interface",
  //   tag: "win",
  //   sources: ["Amplitude", "Survey"],
  //   productId: "p6",
  //   chatId: "c6",
  // },
  // {
  //   heading:
  //     "Average physician schedules over 30 appointments per week through the app, with minimal friction.",
  //   title: "Appointment Scheduling",
  //   tag: "insight",
  //   sources: ["Amplitude", "Interview Transcripts"],
  //   productId: "p7",
  //   chatId: "c7",
  // },
  // {
  //   heading:
  //     "40% of users report difficulty navigating the patient portal, resulting in decreased engagement.",
  //   title: "Patient Portal",
  //   tag: "concern",
  //   sources: ["Interview transcripts", "User Feedback"],
  //   productId: "p8",
  //   chatId: "c8",
  // },
  // {
  //   heading:
  //     "Medication reminder feature achieves a 90% adherence rate among users.",
  //   title: "Medication Reminder",
  //   tag: "win",
  //   sources: ["Survey", "User Interviews"],
  //   productId: "p9",
  //   chatId: "c9",
  // },
  // {
  //   heading:
  //     "Peak usage of voice transcription is during morning hours, showing high demand at the start of the workday",
  //   title: "Voice transcription",
  //   tag: "concern",
  //   sources: ["Amplitude"],
  //   productId: "p10",
  //   chatId: "c10",
  // },
];

export const ProductStoryComponent = ({
  heading,
  title,
  tag,
  sources,
  productId,
  chatId,
}: TProductStoryData) => {
  const router = useRouter();
  return (
    <div
      className="p-4 hover:bg-[#F5F0E5] cursor-pointer pb-4 border-b border-dashed border-brown"
      onClick={() => {
        router.push(`/dashboard/product/${productId}/chat/${chatId}`);
      }}
    >
      <div className="mb-1 text-sm">
        <span className="text-[#B88A1E] font-bold">{title}</span>
        <span className="text-brown"> - </span>
        <span
          className={clsx(
            tag === "concern" && "text-red",
            tag === "win" && "text-green",
            tag === "insight" && "text-blue",
            tag === "opportunity" && "text-purps"
          )}
        >
          {tag.slice(0, 1).toUpperCase() + tag.slice(1)}
        </span>
      </div>
      <div className="mb-4 font-bold">{heading}</div>
      <div className="flex gap-3 items-center">
        <div
          className={clsx(
            "w-[100px] h-2 rounded",
            tag === "concern" && "bg-red/60",
            tag === "win" && "bg-green/60",
            tag === "insight" && "bg-blue/60",
            tag === "opportunity" && "bg-purps/60"
          )}
        />
        <div className="text-xs text-brown">
          Source: <span className="font-semibold">{sources.join(", ")}</span>
        </div>
        <LinkIcon className="hover:bg-black/10 rounded" />
      </div>
    </div>
  );
};

export const ProductStories = () => {
  return (
    <div className="pt-6">
      <div className="text-2xl font-bold pb-3">Top Product Stories</div>
      {productStoryData.map((data, idx) => (
        <ProductStoryComponent key={`product-story-${idx}`} {...data} />
      ))}
    </div>
  );
};
