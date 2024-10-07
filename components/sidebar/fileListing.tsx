import { sideBarStates } from "@store/pageStore";
import { useProductStore } from "@store/produtsStore";
import clsx from "clsx";
import { useParams } from "next/navigation";
import React from "react";

const FileComponet = ({ fileUrl }: { fileUrl: string }) => {
  const fileName = fileUrl.slice(fileUrl.lastIndexOf("/") + 1);
  return (
    <>
      <a
        href={fileUrl}
        className={clsx(
          "rounded-lg cursor-pointer w-full p-2 bg-white/20 hover:bg-white/10 font-bold overflow-hidden whitespace-nowrap text-ellipsis"
        )}
      >
        {fileName}
      </a>
    </>
  );
};

export const FilesListing = ({ fileType }: { fileType: sideBarStates }) => {
  const { productId } = useParams();
  const { products } = useProductStore();
  const selectedProduct = products[productId as string];
  const fileUrls =
    fileType === "Transcripts"
      ? selectedProduct.interviewTranscripts
      : selectedProduct.fileUris;
  console.log(fileUrls);
  return (
    <div className="flex flex-col gap-2">
      {fileUrls &&
        fileUrls.length &&
        fileUrls.map((fileUrl) => (
          <FileComponet fileUrl={fileUrl} key={fileUrl} />
        ))}
    </div>
  );
};
